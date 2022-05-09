import sockets from "@controller/sockets";
import User from "@models/user";
import getFirstName from "@utils/getFirstName";

/**
    Schickt ein Presence-Update an alle verbundenen Kontakte.
    Echtzeit-Benachrichtung.
*/
const presenceUpdate = async (id: string, status: string) => {
    const user = await User.findOne({ id });

    if(user.contacts.length === 0) return;

    for(const contactId of user.contacts) {
        if(!sockets.has(contactId)) continue;

        const contact = sockets.get(contactId);

        contact.emit("presenceUpdate", {
            status,
            contact: {
                id: user.id,
                name: getFirstName(user.firstName)
            }
        });
    }
};

export {
    presenceUpdate
};