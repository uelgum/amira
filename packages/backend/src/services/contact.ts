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
        throw new AmiraError(409, "CONTACT_ERROR", "INVALID_DATA");
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

export {
    sendContactRequest
};