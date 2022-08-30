import AmiraError from "@structs/error";
import User from "@models/user";
import Mail from "@models/apps/mail";
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
        content: mail.content,
        createdAt: mail.createdAt
    };
};

/**
    Verschickt eine Mail an einen Nutzer.
*/
const sendMail = async (req: Request) => {
    const { recipientId, content } = req.body;

    if(!recipientId || !content) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const senderId = req.user.id;

    const recipientExists = await exists(User, {
        id: recipientId
    });

    if(!recipientExists) {
        throw new AmiraError(404, "RECIPIENT_NOT_FOUND");
    }

    const mail = await Mail.create({
        id: generateId(),
        senderId,
        recipientId,
        content,
        createdAt: Date.now()
    });

    await mail.save();

    const sender = await User.findOne({
        where: {
            id: senderId
        }
    });

    if(!sender) {
        throw new AmiraError(404, "SENDER_NOT_FOUND");
    }

    const fullName = `${sender.firstName} ${sender.lastName}`;

    await sendMailNotification(recipientId, fullName);
};

export {
    getAllMails,
    getMail,
    sendMail
};