import { PresenceType, sendPresenceUpdate } from "@services/notification";

// Types
import type { Socket } from "socket.io";
import type SocketManager from "@structs/socketManager";

/**
    Länge eines Debounces. Entspricht `10s`.
*/
const DEBOUNCE_DURATION = 1000 * 10;

/**
    Handler für das `disconnect`-Event.
    Wird ausgeführt, sobald ein Socket die Verbindung trennt. Der Nutzer hat 10 Sekunden
    Zeit, bevor dieser als offline angezeigt wird.
*/
const onDisconnect = (socketManager: SocketManager, socket: Socket) => {
    const socketId = socket.user.id;

    // Handler, der nach 10 Sekunden ausgeführt wird
    const handler = () => {
        sendPresenceUpdate(socketId, PresenceType.OFFLINE);
        socketManager.remove(socket);
    };

    const debounce = setTimeout(handler, DEBOUNCE_DURATION);

    socketManager.debounces.set(socket.user.id, debounce);
};

export default onDisconnect;