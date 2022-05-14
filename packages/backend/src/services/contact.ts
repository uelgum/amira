import User, { getFullName } from "@models/user";
import Contact from "@models/contact";
import Notification from "@models/notification";
import AmiraError from "@structs/amiraError";
import { Locals as Payload } from "express";

// Services
import { generateId } from "@services/id";
import { sendNotificationUpdate } from "@services/notification";

/**
    Ruft alle Kontakte ab.
*/
const fetchContacts = async (id: string) => {
    const contacts = await Contact.find({
        $or: [
            { contactId1: id },
            { contactId2: id }
        ],
        $where: function(this: Contact) {
            return !this.unconfirmed;
        }
    }).lean();

    const data = [];

    for(const { contactId1, contactId2 } of contacts) {
        // Kontakt-ID des anderen Nutzers finden
        const contactId = (contactId1 === id) ? contactId2 : contactId1;

        const user = await User.findOne({ id: contactId }).lean();

        data.push({
            id: user.id,
            name: getFullName(user)
        });
    }

    return data;
};

/**
    Schickt eine Kontakt-Anfrage an einen Nutzer.
*/
const sendContactRequest = async (payload: Payload, data: Record<string, any>) => {
    const senderId = payload.id;
    const { recipientId } = data;

    if(!recipientId || senderId === recipientId) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const contactExists = await Contact.exists({
        $or: [
            { contactId1: senderId, contactId2: recipientId },
            { contactId1: recipientId, contactId2: senderId }
        ]
    });

    if(contactExists) {
        throw new AmiraError(400, "CONTACT_ERROR", "CONTACT_ALREADY_EXISTS");
    }

    const recipientExists = await User.exists({ id: recipientId });

    if(!recipientExists) {
        throw new AmiraError(400, "INVALID_DATA", "INVALID_RECIPIENT_ID");
    }

    const contact = new Contact({
        id: generateId(),
        contactId1: senderId,
        contactId2: recipientId,
        unconfirmed: true
    });

    await contact.save();

    const sender = await User.findOne({ id: senderId });

    // Benachrichtungen an Empfänger schicken
    const notification = new Notification({
        id: generateId(),
        type: "CONTACT_REQUEST",
        recipientId,
        data: {
            id: senderId,
            name: getFullName(sender)
        },
        createdAt: Date.now()
    });

    await notification.save();

    // Benachrichtigungen des Empfängers in Echtzeit aktualisieren
    sendNotificationUpdate(recipientId);
};

/**
    Zieht eine verschickte Kontakt-Anfrage zurück.
*/
const withdrawContactRequest = async (payload: Payload, data: Record<string, any>) => {
    const senderId = payload.id;
    const { recipientId } = data;

    if(!recipientId) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const contact = await Contact.findOne({
        $or: [
            { contactId1: senderId, contactId2: recipientId },
            { contactId1: recipientId, contactId2: senderId }
        ],
        unconfirmed: true
    });

    if(!contact) {
        throw new AmiraError(400, "CONTACT_ERROR", "CONTACT_NOT_FOUND");
    }

    contact.delete();

    // Benachrichtung finden und entfernen
    const notification = await Notification.findOne({
        type: "CONTACT_REQUEST",
        recipientId,
        $where: function(this: Notification) {
            return this.data.id === senderId;
        }
    });

    if(notification) notification.delete();
};

/**
    Akzeptiert eine Kontakt-Anfrage.
*/
const acceptContactRequest = async (payload: Payload, data: Record<string, any>) => {
    const recipientId = payload.id;
    const { senderId } = data;

    if(!senderId) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const contact = await Contact.findOne({
        $or: [
            { contactId1: recipientId, contactId2: senderId },
            { contactId1: senderId, contactId2: recipientId }
        ],
        unconfirmed: true
    });

    if(!contact) {
        throw new AmiraError(400, "CONTACT_ERROR", "CONTACT_NOT_FOUND");
    }

    contact.unconfirmed = undefined;

    await contact.save();

    const recipient = await User.findOne({ id: recipientId });

    // Benachrichtung an Sender schicken
    const notification = new Notification({
        id: generateId(),
        recipientId: senderId,
        type: "CONTACT_REQUEST_ACCEPTED",
        data: {
            id: recipient,
            name: getFullName(recipient)
        },
        createdAt: Date.now()
    });

    await notification.save();

    // Benachrichtigungen des Senders in Echtzeit aktualisieren
    sendNotificationUpdate(senderId);
};

/**
    Lehnt eine Kontakt-Anfrage ab.
*/
const declineContactRequest = async (payload: Payload, data: Record<string, any>) => {
    const recipientId = payload.id;
    const { senderId } = data;

    if(!senderId) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const contact = await Contact.findOne({
        $or: [
            { contactId1: recipientId, contactId2: senderId },
            { contactId1: senderId, contactId2: recipientId }
        ],
        unconfirmed: true
    });

    if(!contact) {
        throw new AmiraError(400, "CONTACT_ERROR", "CONTACT_NOT_FOUND");
    }

    contact.delete();
};

/**
    Enfernt einen Kontakt.
*/
const deleteContact = async (payload: Payload, data: Record<string, any>) => {
    const id = payload.id;
    const { contactId } = data;

    if(!contactId) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const contact = await Contact.findOne({
        $or: [
            { contactId1: id, contactId2: contactId },
            { contactId1: contactId, contactId2: id }
        ],
        $where: function(this: Contact) {
            return !this.unconfirmed;
        }
    });

    if(!contact) {
        throw new AmiraError(400, "CONTACT_ERROR", "CONTACT_NOT_FOUND");
    }

    contact.delete();
};

export {
    fetchContacts,
    sendContactRequest,
    withdrawContactRequest,
    declineContactRequest,
    acceptContactRequest,
    deleteContact
};