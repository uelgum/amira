import socket from "@internal/socket";
import { contacts } from "@stores/contacts";

// Types
import type { PresenceStatus } from "@stores/presenceStatus";

// #region Types
type Data = {
    userId: string;
    status: PresenceStatus;
};
// #endregion

/**
    Wird ausgeführt, sobald ein Presence-Update eines Kontaktes ankommt.
*/
socket.on("presenceUpdate", (data: Data) => {
    const { userId, status } = data;;

    contacts.update(($contacts) => {
        const contactIndex = $contacts.findIndex((contact) => contact.contactId === userId);
        $contacts[contactIndex].presenceStatus = status;
        return $contacts;
    });
}); 