import sockets from "@controller/socket";
import Notification from "@models/notification";
import Contact from "@models/contact";
import User, { getFullName } from "@models/user";

/**
    Ruft die Benachrichtungen eines Nutzers ab.
*/
const fetchNotifications = async (id: string) => {
    const notifications = await Notification.find({ recipientId: id }).lean();
    
    return notifications.map((n) => {
        return {
            id: n.id,
            type: n.type,
            data: n.data,
            createdAt: n.createdAt
        };
    });
};

/**
    Sendet ein Update-Befehl für Benachrichtigungen an einen Nutzer.
*/
const sendNotificationUpdate = async (id: string) => {
    if(!sockets.has(id)) return;

    const socket = sockets.get(id);

    socket.emit("notificationUpdate");
};

/**
    Sendet ein Presence-Update an alle Kontakte eines Nutzers.
*/
const sendPresenceUpdate = async (id: string, status: string) => {
    const contacts = await Contact.find({
        $or: [
            { contactId1: id },
            { contactId2: id }
        ]
    });

    if(contacts.length === 0) return;

    const user = await User.findOne({ id });
    const name = getFullName(user);

    for(const { contactId1, contactId2 } of contacts) {
        // Kontakt-ID des anderen Nutzers finden
        const contactId = (contactId1 === id) ? contactId2 : contactId1;

        if(!sockets.has(contactId)) continue;

        const socket = sockets.get(contactId);

        socket.emit("presenceUpdate", {
            id,
            name,
            status
        });
    }
};

export {
    fetchNotifications,
    sendNotificationUpdate,
    sendPresenceUpdate
};