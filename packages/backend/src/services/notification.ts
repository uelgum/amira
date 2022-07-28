import { Op } from "sequelize";

// Intern
import AmiraError from "@structs/error";
import sockets from "@loaders/sockets";
import Notification, { NotificationType } from "@models/notification";
import User from "@models/user";
import Contact from "@models/contact";
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

/**
    Presence-Status.
*/
enum PresenceStatus {
    ONLINE,
    DND,
    AWAY,
    OFFLINE
};
// #endregion

/**
    Entfernt eine Benachrichtung.
*/
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

/**
    Schickt ein Presence-Update an alle verbundenen Kontakte in Echtzeit.
*/
const sendPresenceUpdate = async (userId: string, status: PresenceStatus) => {
    const user = await User.findOne({
        where: {
            id: userId
        }
    });

    if(!user) return;

    const contacts = await Contact.findAll({
        where: {
            [ Op.or ]: [
                { id1: userId },
                { id2: userId }
            ],
            confirmed: true
        }
    });

    if(contacts.length === 0) return;

    for(const contact of contacts) {
        // ID des anderen Nutzers finden
        const contactId = (userId === contact.id1) ? contact.id2 : contact.id1;

        if(!sockets.has(contactId)) continue;

        const socket = sockets.get(contactId);

        socket.emit("presenceUpdate", {
            id: userId,
            status,
            fullName: `${user.firstName} ${user.lastName}`
        });
    }
};

export {
    PresenceStatus,
    deleteNotification,
    sendContactRequestNotification,
    sendContactAcceptedNotification,
    sendPresenceUpdate
};