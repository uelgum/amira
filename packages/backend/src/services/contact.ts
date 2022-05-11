import Contact from "@models/contact";
import User from "@models/user";
import Notification from "@models/notification";
import AmiraError from "@structs/amiraError";

// Services
import { generateId } from "@services/id";
import { sendNotificationUpdateCommand } from "@services/notification";

/**
    Sendet eine Kontakt-Anfrage an einen Nutzer.
*/
const sendContactRequest = async (senderId: string, recipientId: string) => {
    if(!senderId || !recipientId || senderId === recipientId) {
        throw new AmiraError(400, "CONTACT_ERROR", "INVALID_DATA");
    }

    const contactExists = await Contact.exists({
        $or: [
            { contactId1: senderId, contactId2: recipientId },
            { contactId1: recipientId, contactId2: senderId },
        ]
    });

    if(contactExists) {
        throw new AmiraError(409, "CONTACT_ERROR", "CONTACT_ALREADY_EXISTS");
    }

    const sender = await User.findOne({ id: senderId });

    const contact = new Contact({
        id: generateId(),
        contactId1: senderId,
        contactId2: recipientId,
        confirmed: false
    });
    
    const notification = new Notification({
        id: generateId(),
        type: "CONTACT_REQUEST",
        recipientId,
        data: {
            name: `${sender.firstName} ${sender.lastName}`
        },
        createdAt: Date.now()
    });

    await contact.save();
    await notification.save();

    sendNotificationUpdateCommand(recipientId);
};

/**
    Akzeptiert eine Kontakt-Anfrage.
*/
const acceptContactRequest = async (userId: string, senderId: string) => {
    if(!userId || !senderId) {
        throw new AmiraError(400, "CONTACT_ERROR", "INVALID_DATA");
    }

    const contact = await Contact.findOne({
        $or: [
            { contactId1: senderId, contactId2: userId },
            { contactId1: userId, contactId2: senderId },
        ]
    });

    if(!contact) {
        throw new AmiraError(400, "CONTACT_ERROR", "CONTACT_NOT_FOUND");
    }

    contact.confirmed = true;

    const recipient = await User.findOne({ id: userId });

    const notification = new Notification({
        id: generateId(),
        type: "CONTACT_REQUEST_ACCEPTED",
        recipientId: senderId,
        data: {
            name: `${recipient.firstName} ${recipient.lastName}`
        },
        createdAt: Date.now()
    });

    await contact.save();
    await notification.save();

    sendNotificationUpdateCommand(senderId);
};

/**
    Zieht eine verschickte Kontakt-Anfrage zurück.
*/
const withdrawContactRequest = async (senderId: string, recipientId: string) => {
    if(!senderId || !senderId) {
        throw new AmiraError(400, "CONTACT_ERROR", "INVALID_DATA");
    }

    const contact = await Contact.findOne({
        $or: [
            { contactId1: senderId, contactId2: recipientId },
            { contactId1: recipientId, contactId2: senderId },
        ],
        confirmed: false
    });

    if(!contact) {
        throw new AmiraError(400, "CONTACT_ERROR", "CONTACT_NOT_FOUND");
    }

    contact.delete();
};

/**
    Entfernt einen bestehenden Kontakt.
*/
const deleteContact = async (userId: string, contactId: string) => {
    if(!userId || !contactId) {
        throw new AmiraError(400, "CONTACT_ERROR", "INVALID_DATA");
    }

    const contact = await Contact.findOne({
        $or: [
            { contactId1: userId, contactId2: contactId },
            { contactId1: contactId, contactId2: userId },
        ],
        confirmed: true
    });

    if(!contact) {
        throw new AmiraError(400, "CONTACT_ERROR", "CONTACT_NOT_FOUND");
    }

    contact.delete();
};

export {
    sendContactRequest,
    acceptContactRequest,
    withdrawContactRequest,
    deleteContact
};