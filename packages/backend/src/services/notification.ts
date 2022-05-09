import sockets from "@controller/sockets";
import Contact from "@models/contact";
import User from "@models/user";
import getFirstName from "@utils/getFirstName";

/**
    Sendet einen Befehl zum Aktualisieren der Banachrichtigungen an den Nutzer.
    Die App aktualisiert anschließend die Benachrichtigungen automatisch.
*/
const sendNotificationUpdateCommand = (id: string) => {
    if(!sockets.has(id)) return;

    const socket = sockets.get(id);

    socket.emit("updateNotifications");
};

/**
    Schickt ein Presence-Update an alle verbundenen Kontakte.
    Echtzeit-Benachrichtung.
*/
const presenceUpdate = async (id: string, status: string) => {
    const user = await User.findOne({ id });

    const contacts = await Contact.find({
        $or: [
            { contactId1: id },
            { contactId2: id }
        ]
    });

    for(const contact of contacts) {
        if(!contact.confirmed) continue;

        // ID des Kontaktes finden
        const contactId = (user.id === contact.contactId1) ?
            contact.contactId2 :
            contact.contactId1;

        if(!sockets.has(contactId)) continue;

        const contactSocket = sockets.get(contactId);

        contactSocket.emit("presenceUpdate", {
            id: user.id,
            status,
            name: getFirstName(user.firstName)
        });
    }
};

export {
    sendNotificationUpdateCommand,
    presenceUpdate
};