import { Op } from "sequelize";

// Intern
import AmiraError from "@structs/error";
import User from "@models/user";
import Mail from "@models/apps/mail";
import Block from "@models/block";
import exists from "@utils/exists";
import { generateId } from "@services/id";
import { sendMailNotification } from "@services/notification";

// Types
import type { Request } from "express";

/**
    Ruft alle Mails eines Nutzers ab.
*/
const getAllMails = async (req: Request) => {
    const userId = req.user.id;

    const userExists = await exists(User, {
        id: userId
    });

    if(!userExists) {
        throw new AmiraError(404, "USER_NOT_FOUND");
    }

    const rawMails = await Mail.findAll({
        where: {
            recipientId: userId
        }
    });

    const mails = rawMails.map((mail) => {
        return {
            id: mail.id,
            senderId: mail.senderId,
            subject: mail.subject,
            content: mail.content,
            createdAt: mail.createdAt
        };
    });

    return mails;
};

/**
    Ruft eine bestimmte Mail eines Nutzers ab.
*/
const getMail = async (req: Request) => {
    const userId = req.user.id;
    const { mailId } = req.params;

    if(!mailId) {
        throw new AmiraError(400, "INVALID_DATA");
    } 

    const userExists = await exists(User, {
        id: userId
    });

    if(!userExists) {
        throw new AmiraError(404, "USER_NOT_FOUND");
    }

    const mail = await Mail.findOne({
        where: {
            id: mailId
        }
    });

    if(!mail) {
        throw new AmiraError(404, "MAIL_NOT_FOUND");
    }

    const sender = await User.findOne({
        where: {
            id: mail.senderId
        }
    });

    if(!sender) {
        throw new AmiraError(404, "SENDER_NOT_FOUND");
    }

    return {
        id: mail.id,
        senderId: mail.senderId,
        sender: `${sender.firstName} ${sender.lastName}`,
        subject: mail.subject,
        content: mail.content,
        createdAt: mail.createdAt
    };
};

/**
    Verschickt eine Mail an einen Nutzer.
*/
const sendMail = async (req: Request) => {
    const { recipientId, subject, content } = req.body;

    if(!recipientId || !subject || subject.length > 80 || !content) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const senderId = req.user.id;

    const recipientExists = await exists(User, {
        id: recipientId
    });

    if(!recipientExists) {
        throw new AmiraError(404, "RECIPIENT_NOT_FOUND");
    }

    const sender = await User.findOne({
        where: {
            id: senderId
        }
    });

    if(!sender) {
        throw new AmiraError(404, "SENDER_NOT_FOUND");
    }

    const isBlocked = await exists(Block, {
        [ Op.or ]: [
            { userId: recipientId, blockedUserId: senderId },
            { userId: senderId, blockedUserId: recipientId }
        ]
    });

    if(isBlocked) {
        throw new AmiraError(403, "USER_BLOCKED");
    }

    const mail = await Mail.create({
        id: generateId(),
        senderId,
        recipientId,
        subject,
        content,
        createdAt: Date.now()
    });

    await mail.save();

    const fullName = `${sender.firstName} ${sender.lastName}`;

    await sendMailNotification(recipientId, fullName);
};

/**
    Entfernt eine Mail eines Nutzers.
*/
const deleteMail = async (req: Request) => {
    const { mailId } = req.params;

    if(!mailId) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const userId = req.user.id;

    const userExists = await exists(User, {
        id: userId
    });

    if(!userExists) {
        throw new AmiraError(404, "USER_NOT_FOUND");
    }

    const mail = await Mail.findOne({
        where: {
            id: mailId
        }
    });

    if(!mail) {
        throw new AmiraError(404, "MAIL_NOT_FOUND");
    }

    if(mail.recipientId !== userId) {
        throw new AmiraError(403, "FORBIDDEN");
    }

    await mail.destroy();

    return {
        id: mail.id
    };
};

export {
    getAllMails,
    getMail,
    sendMail,
    deleteMail
};