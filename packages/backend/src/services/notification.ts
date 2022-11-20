import AmiraError from "@structs/error";
import sockets from "@loaders/sockets";
import Notification, { NotificationType } from "@models/notification";
import User from "@models/user";
import { generateId } from "@services/id";
import exists from "@utils/exists";

// Types
import type { Request } from "express";

// #region Types
/**
    Daten zur Erstellung einer Benachrichtigung.
*/
type NotificationData = {
    /**
        ID des Empfängers.
    */
    receiverId: string;

    /**
        Art der Benachrichtigung.
    */
    type: NotificationType;

    /**
        Zusätzliche Daten.
    */
    data?: Record<string, string | number>;

    /**
        Optionaler Link in der Benachrichtigung. Kann verwendet werden, um direkt auf
        das Ziel zu verweisen (z.B. **User** hat dir eine Nachricht geschickt).
    */
    link?: string;
};
// #endregion

/**
    Ruft alle Benachrichtigungen eines Nutzers ab.
*/
const getNotifications = async (req: Request) => {
    const userId = req.user.id;
    
    const userExists = await exists(User, { id: userId });

    if(!userExists) {
        throw new AmiraError(404, "USER_NOT_FOUND");
    }

    const rawNotifications = await Notification.findAll({
        where: {
            receiverId: userId
        }
    });

    const notifications = rawNotifications.map((n) => {
        return {
            id: n.id,
            type: n.type,
            data: n.data,
            link: n.link,
            createdAt: n.createdAt
        };
    });

    return {
        notifications
    };
};

/**
    Erstellt eine Benachrichtigung.
*/
const createNotification = async (notificationData: NotificationData) => {
    const { receiverId, type, data, link } = notificationData;

    const notification = await Notification.create({
        id: generateId(),
        receiverId,
        type,
        data,
        link,
        createdAt: Date.now()
    });

    await notification.save();

    sendRealtimeNotification(receiverId);
};

/**
    Löscht eine Benachrichtigung eines Nutzers.
*/
const deleteNotification = async (req: Request) => {
    const userId = req.user.id;
    const { notificationId } = req.params;

    if(!notificationId) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const userExists = await exists(User, { id: userId });

    if(!userExists) {
        throw new AmiraError(404, "USER_NPT_FOUND");
    }

    const notification = await Notification.findOne({
        where: {
            id: notificationId
        }
    });

    if(!notification) {
        throw new AmiraError(404, "NOTIFICATION_NOT_FOUND");
    }

    await notification.destroy();
};

/**
    Schickt eine Benachrichtigung an einen Nutzer in Echtzeit.
*/
const sendRealtimeNotification = (userId: string) => {
    if(!sockets.has(userId)) return;

    const socket = sockets.get(userId);

    socket.emit("notification");
};

export {
    getNotifications,
    createNotification,
    deleteNotification,
    sendRealtimeNotification
};