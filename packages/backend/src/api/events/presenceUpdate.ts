import { PresenceType, sendPresenceUpdate } from "@services/notification";

// Types
import type { Socket } from "socket.io";
import type SocketManager from "@structs/socketManager";

// #region Types
type Data = {
    status: PresenceType;
};
// #endregion

const allowedStatusTypes = Object.values(PresenceType);

/**
    Handler für das `connect`-Event.
    Wird ausgeführt, sobald ein Socket eine Verbindung herstellt.
*/
const onPresenceUpdate = (socketManager: SocketManager, socket: Socket, data: Data) => {
    const socketId = socket.user.id;
    const status = data.status;

    if(!allowedStatusTypes.includes(status)) {
        return;
    }

    socketManager.presence.set(socketId, status);
    sendPresenceUpdate(socketId, status);
};

export default onPresenceUpdate;