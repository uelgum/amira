import sockets, { timeouts } from "@controller/socket";
import { sendPresenceUpdate } from "@services/notification";
import type { Socket } from "socket.io";

/**
    Zeit, nach der das Presence-Update gesendet wird.
*/
const PRESENCE_TIMEOUT = 1000 * 10;

/**
    Handler für das `disconnect`-Event.
    Wird ausgeführt, sobald ein Socket eine Verbindung trennts.
*/
const onDisconnect = async (socket: Socket) => {
    const id = socket.user.id;

    sockets.delete(id);

    // Presence-Update debouncen
    const timeout = setTimeout(() => {
        sendPresenceUpdate(id, "offline");
        timeouts.delete(id);
    }, PRESENCE_TIMEOUT);

    timeouts.set(id, timeout);
};

export default onDisconnect;