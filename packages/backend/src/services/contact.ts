import User, { getFullName } from "@models/user";
import Contact from "@models/contact";
import Notification from "@models/notification";
import AmiraError from "@structs/amiraError";
import { Locals as Payload } from "express";

// Services
import { generateId } from "@services/id";
import { sendNotificationUpdate } from "@services/notification";

/**
    Schickt eine Kontakt-Anfrage an einen Nutzer.
*/
const sendContactRequest = async (payload: Payload, data: Record<string, any>) => {
    const senderId = payload.id;
    const { recipientId } = data;

    if(!recipientId) {
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

    const sender = await User.findOne({ id: senderId });

    // Benachrichtung an Sender schicken
    const notification = new Notification({
        id: generateId(),
        recipientId: senderId,
        type: "CONTACT_REQUEST_ACCEPTED",
        data: {
            id: senderId,
            name: getFullName(sender)
        },
        createdAt: Date.now()
    });

    await notification.save();

    // Benachrichtigungen des Senders in Echtzeit aktualisieren
    sendNotificationUpdate(senderId);
};

export {
    sendContactRequest,
    withdrawContactRequest,
    acceptContactRequest
};