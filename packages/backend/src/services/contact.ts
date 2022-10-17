import { Op } from "sequelize";

// Intern
import AmiraError from "@structs/error";
import sockets from "@loaders/sockets";
import Contact from "@models/contact";
import Block from "@models/block";
import User from "@models/user";
import {
    PresenceType,
    sendContactAcceptedNotification,
    sendContactRequestNotification
} from "@services/notification";
import exists from "@utils/exists";

// Types
import { Request } from "express";

/**
    Ruft alle Kontakte eines Nutzers ab.
*/
const getContacts = async (req: Request) => {
    const userId = req.user.id;

    const rawContacts = await Contact.findAll({
        where: {
            [ Op.or ]: [
                { id1: userId },
                { id2: userId }
            ],
            confirmed: true
        }
    });

    const contacts = rawContacts.map((contact) => {
        return {
            contactId: (contact.id1 === userId) ? contact.id2 : contact.id1
        };
    });

    return {
        contacts
    };
};

/**
    Ruft den Presence-Status eines Nutzers ab.
*/
const getPresenceStatus = async (req: Request) => {
    const { userId } = req.params;

    if(!userId) {
        throw new AmiraError(400, "INVALID_DATA");    
    }

    const status = sockets.has(userId) ?
        sockets.presence.get(userId) :
        PresenceType.OFFLINE;

    return {
        userId,
        status
    };
};

/**
    Sendet eine Kontakt-Anfrage an einen Nutzer.
*/
const sendContactRequest = async (req: Request) => {
    const userId = req.user.id;
    const { recipientId } = req.body;

    if(!recipientId || userId === recipientId) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const recipientExists = await exists(User, { id: recipientId });

    if(!recipientExists) {
        throw new AmiraError(404, "RECIPIENT_NOT_FOUND");
    }

    // Blockliste überprüfen
    const isBlocked = await exists(Block, {
        [ Op.or ]: [
            { userId: recipientId, blockedUserId: userId },
            { userId, blockedUserId: recipientId }
        ]
    });

    if(isBlocked) {
        throw new AmiraError(403, "USER_BLOCKED");
    }

    const contact = await Contact.create({
        id1: userId,
        id2: recipientId,
        confirmed: false
    });

    await contact.save();

    const sender = await User.findOne({
        where: {
            id: userId
        }
    });

    if(!sender) {
        throw new AmiraError(404, "SENDER_NOT_FOUND");
    }

    sendContactRequestNotification({
        recipientId,
        fullName: `${sender.firstName} ${sender.lastName}`
    });
};

/**
    Zieht eine Kontakt-Anfrage an einen Nutzer zurück.
*/
const withdrawContactRequest = async (req: Request) => {
    const userId = req.user.id;
    const { recipientId } = req.body;

    if(!recipientId) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const contact = await Contact.findOne({
        where: {
            [ Op.or ]: [
                { id1: userId, id2: recipientId },
                { id1: recipientId, id2: userId }
            ],
            confirmed: false
        }
    });

    if(!contact) {
        throw new AmiraError(404, "CONTACT_NOT_FOUND");
    }

    await contact.destroy();
};

/**
    Akzeptiert eine Kontakt-Anfrage eines Nutzers.
*/
const acceptContactRequest = async (req: Request) => {
    const userId = req.user.id;
    const { senderId } = req.body;

    if(!senderId) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const contact = await Contact.findOne({
        where: {
            [ Op.or ]: [
                { id1: userId, id2: senderId },
                { id1: senderId, id2: userId }
            ],
            confirmed: false
        }
    });

    if(!contact) {
        throw new AmiraError(404, "CONTACT_NOT_FOUND");
    }

    const senderExists = await exists(User, { id: senderId });

    if(!senderExists) {
        await contact.destroy();
        throw new AmiraError(404, "SENDER_NOT_FOUND");
    }

    contact.confirmed = true;
    await contact.save();

    const recipient = await User.findOne({
        where: {
            id: userId
        }
    });

    if(!recipient) {
        throw new AmiraError(404, "RECIPIENT_NOT_FOUND");
    }

    sendContactAcceptedNotification({
        recipientId: recipient.id,
        fullName: `${recipient.firstName} ${recipient.lastName}`
    });
};

/**
    Lehnt eine Kontakt-Anfrage eines Nutzers ab.
*/
const rejectContactRequest = async (req: Request) => {
    const userId = req.user.id;
    const { senderId } = req.body;

    if(!senderId) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const contact = await Contact.findOne({
        where: {
            [ Op.or ]: [
                { id1: userId, id2: senderId },
                { id1: senderId, id2: userId }
            ],
            confirmed: false
        }
    });

    if(!contact) {
        throw new AmiraError(404, "CONTACT_NOT_FOUND");
    }

    await contact.destroy();
};

/**
    Entfernt einen bestehenden Kontakt mit einem Nutzer.
*/
const removeContact = async (req: Request) => {
    const userId = req.user.id;
    const { contactId } = req.body;

    if(!contactId) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const contact = await Contact.findOne({
        where: {
            [ Op.or ]: [
                { id1: userId, id2: contactId },
                { id1: contactId, id2: userId }
            ],
            confirmed: true
        }
    });

    if(!contact) {
        throw new AmiraError(404, "CONTACT_NOT_FOUND");
    }

    await contact.destroy();
};

export {
    getContacts,
    getPresenceStatus,
    sendContactRequest,
    withdrawContactRequest,
    acceptContactRequest,
    rejectContactRequest,
    removeContact
};