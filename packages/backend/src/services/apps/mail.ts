import AmiraError from "@structs/error";
import User from "@models/user";
import Mail from "@models/apps/mail";
import exists from "@utils/exists";
import { generateId } from "@services/id";
import { sendMailNotification } from "@services/notification";

// Types
import type { Request } from "express";

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
        where: {
            id: recipientId
        }
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
    sendMail
};