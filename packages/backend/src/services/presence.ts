import { Op } from "sequelize";

// Intern
import sockets from "@loaders/sockets";
import Contact, { ContactStatus } from "@models/contact";

// #region Types
/**
    Art des Presence-Status.
*/
enum PresenceStatusType {
    ONLINE = "online",
    AWAY = "away",
    DND = "dnd",
    OFFLINE = "offline"
};
// #endregion

/**
    Ruft den Presence-Status eines Nutzers ab.
*/
const getPresenceStatus = (userId: string) => {
    return sockets.presence.get(userId) || PresenceStatusType.OFFLINE;
};

/**
    Schickt ein Presence-Update an alle Kontakte eines Nutzers.
*/
const sendPresenceUpdate = async (userId: string, presenceStatus: PresenceStatusType) => {
    const contacts = await Contact.findAll({
        where: {
            [ Op.or ]: [
                { userId1: userId },
                { userId2: userId }
            ],
            status: ContactStatus.CONFIRMED
        }
    });

    if(contacts.length === 0) return;

    for(const contact of contacts) {
        if(!sockets.has(contact.id)) continue;

        const socket = sockets.get(contact.id);

        socket.emit("presenceUpdate", {
            userId,
            status: presenceStatus
        });
    }
};

export {
    PresenceStatusType
};

export {
    getPresenceStatus,
    sendPresenceUpdate
};