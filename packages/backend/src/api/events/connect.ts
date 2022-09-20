import { PresenceStatus, sendPresenceUpdate } from "@services/notification";

// Types
import type { Socket } from "socket.io";
import type SocketManager from "@structs/socketManager";

/**
    Handler für das `connect`-Event.
    Wird ausgeführt, sobald ein Socket eine Verbindung herstellt.
*/
const onConnect = (socketManager: SocketManager, socket: Socket) => {
    const socketId = socket.user.id;

    // Vorhandene Verbindung beibehalten, anstatt eine neue herzustellen
    if(socketManager.debounces.has(socketId)) {
        socketManager.debounces.delete(socketId);
        return;
    }

    socketManager.add(socket);

    sendPresenceUpdate(socketId, PresenceStatus.ONLINE);
};

export default onConnect;