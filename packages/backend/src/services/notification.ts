import sockets from "@controller/socket";
import Contact from "@models/contact";

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

    for(const { contactId1, contactId2 } of contacts) {
        // ID des Kontaktes finden
        const contactId = (contactId1 === id) ? contactId2 : contactId1;

        if(!sockets.has(contactId)) continue;

        const socket = sockets.get(contactId);

        socket.emit("presenceUpdate", {
            id,
            status
        });
    }
};

export {
    sendNotificationUpdate,
    sendPresenceUpdate
};