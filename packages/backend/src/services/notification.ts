import AmiraError from "@structs/error";
import sockets from "@loaders/sockets";
import Notification, { NotificationType } from "@models/notification";
import { generateId } from "@services/id";

// #region Types
/**
    Daten für Benachrichtungen für Kontakt-Anfragen.
*/
type ContactNotificationData = {
    /**
        ID des Kontaktes.
    */
    recipientId: string;

    /**
        Voller Name des Kontaktes.
    */
    fullName: string;
};
// #endregion

const deleteNotification = async (id: string) => {
    const notification = await Notification.findOne({
        where: {
            id
        } 
    });

    if(!notification) {
        throw new AmiraError(404, "NOTIFICATION_NOT_FOUND");
    }

    await notification.destroy();
};

/**
    Erstellt eine Benachrichtung für eine Kontakt-Anfrage.
*/
const sendContactRequestNotification = async (data: ContactNotificationData) => {
    const { recipientId, fullName } = data;

    const createdAt = Date.now();
    const content = `${fullName} hat Dir eine Kontakt-Anfrage geschickt.`;

    const notification = await Notification.create({
        id: generateId(),
        type: NotificationType.CONTACT_REQUEST,
        recipientId,
        content,
        createdAt
    });

    await notification.save();

    if(sockets.has(recipientId)) {
        const socket = sockets.get(recipientId);
        
        socket.emit("notification", {
            type: NotificationType.CONTACT_REQUEST,
            content,
            createdAt
        });
    }
};

/**
    Erstellt eine Benachrichtung für eine Annahme einer Kontakt-Anfrage.
*/
const sendContactAcceptedNotification = async (data: ContactNotificationData) => {
    const { recipientId, fullName } = data;

    const createdAt = Date.now();
    const content = `${fullName} hat Deine Kontakt-Anfrage angenommen.`;

    const notification = await Notification.create({
        id: generateId(),
        type: NotificationType.CONTACT_ACCEPTED,
        recipientId,
        content,
        createdAt
    });

    await notification.save();

    if(sockets.has(recipientId)) {
        const socket = sockets.get(recipientId);
        
        socket.emit("notification", {
            type: NotificationType.CONTACT_REQUEST,
            content,
            createdAt
        });
    }
};

export {
    deleteNotification,
    sendContactRequestNotification,
    sendContactAcceptedNotification
};