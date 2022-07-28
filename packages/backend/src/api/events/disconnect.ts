import { PresenceStatus, sendPresenceUpdate } from "@services/notification";

// Types
import type { Socket } from "socket.io";
import type SocketManager from "@structs/socketManager";

/**
    Länge eines Debounces. Entspricht 10 Sekunden.
*/
const DEBOUNCE_DURATION = 1000 * 10;

/**
    Handler für das `disconnect`-Event.
    Wird ausgeführt, sobald ein Socket die Verbindung trennt.
*/
const onDisconnect = (socketManager: SocketManager, socket: Socket) => {
    const socketId = socket.user.id;

    const handler = () => {
        sendPresenceUpdate(socketId, PresenceStatus.OFFLINE);
        socketManager.remove(socket);
    };

    const debounce = setTimeout(handler, DEBOUNCE_DURATION);

    socketManager.debounces.set(socket.user.id, debounce);
};

export default onDisconnect;