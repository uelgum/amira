import { Op } from "sequelize";

// Intern
import AmiraError from "@structs/error";
import Contact, { ContactStatus } from "@models/contact";
import User from "@models/user";
import Block from "@models/block";
import { generateId } from "@services/id";
import exists from "@utils/exists";

// Types
import type { Request } from "express";

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
            status: ContactStatus.CONFIRMED
        }
    });

    const contacts = rawContacts.map((c) => {
        return {
            id: c.id,
            contactId: (c.userId1 === userId) ? c.userId2 : c.userId1
        };
    });

    return {
        contacts
    };
};

/**
    Ruft den Kontakt-Status zwischen zwei Nutzern ab.
*/
const getContactStatus = async (req: Request, contactId: string) => {
    const userId = req.user.id;

    const contact = await Contact.findOne({
        where: {
            [ Op.or ]: [
                { userId1: userId, userId2: contactId },
                { userId1: contactId, userId2: userId }
            ]
        }
    });

    if(!contact) {
        return ContactStatus.STRANGERS;
    }

    return contact.status;
};

/**
    Schickt eine Kontakt-Anfrage an einen Nutzer.
*/
const sendContactRequest = async (req: Request) => {
    const userId = req.user.id;
    const { contactId } = req.body;

    if(!contactId) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const userExists = await exists(User, { id: contactId });

    if(!userExists) {
        throw new AmiraError(404, "USER_NOT_FOUND");
    }

    const contactExists = await exists(Contact, {
        [ Op.or ]: [
            { userId1: userId, userId2: contactId },
            { userId1: contactId, userId2: userId }
        ]
    });

    if(contactExists) {
        throw new AmiraError(400, "CONTACT_ALREADY_EXISTS");
    }

    const blockExists = await exists(Block, {
        [ Op.or ]: [
            { userId: contactId, blockedUserId: userId },
            { userId: userId, blockedUserId: contactId }
        ]
    });

    if(blockExists) {
        throw new AmiraError(403, "USER_BLOCKED");
    }

    const contact = await Contact.create({
        id: generateId(),
        userId1: userId,
        userId2: contactId,
        status: ContactStatus.PENDING,
        createdAt: Date.now()
    });

    await contact.save();
};

/**
    Zieht eine versendete Kontakt-Anfrage zurück.
*/
const withdrawContactRequest = async (req: Request) => {
    const userId = req.user.id;
    const { contactId } = req.body;

    if(!contactId) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const contact = await Contact.findOne({
        where: {
            userId1: userId,
            userId2: contactId,
            status: ContactStatus.PENDING
        }
    });

    if(!contact) {
        throw new AmiraError(404, "CONTACT_NOT_FOUND");
    }

    await contact.destroy();
};

/**
    Bestätigt eine Kontakt-Anfrage eines anderen Nutzers.
*/
const acceptContactRequest = async (req: Request) => {
    const userId = req.user.id;
    const { contactId } = req.body;

    if(!contactId) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const contact = await Contact.findOne({
        where: {
            userId1: contactId,
            userId2: userId,
            status: ContactStatus.PENDING
        }
    });

    if(!contact) {
        throw new AmiraError(404, "CONTACT_NOT_FOUND");
    }

    contact.status = ContactStatus.CONFIRMED;
    contact.createdAt = Date.now();

    await contact.save();
};

/**
    Entfernt einen bestehenden Kontakt.
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
                { userId1: userId, userId2: contactId },
                { userId1: contactId, userId2: userId }
            ],
            status: ContactStatus.CONFIRMED
        }
    });

    if(!contact) {
        throw new AmiraError(404, "CONTACT_NOT_FOUND");
    }

    await contact.destroy();
};

export {
    getContacts,
    getContactStatus,
    sendContactRequest,
    withdrawContactRequest,
    acceptContactRequest,
    removeContact
};