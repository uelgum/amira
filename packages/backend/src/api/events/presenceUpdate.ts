import { sendPresenceUpdate, PresenceStatusType } from "@services/presence";

// Types
import type { Socket } from "socket.io";
import type SocketManager from "@structs/socketManager";

// #region Types
/**
    Erhaltene Daten.
*/
type Data = {
    status: PresenceStatusType;
};
// #endregion

/**
    Handler für das `presenceUpdate`-Event.
    Wird ausgeführt, sobald ein Nutzer seinen Presence-Status ändert.
*/
const onPresenceUpdate = (socketManager: SocketManager, socket: Socket, data: Data) => {
    const socketId = socket.user.id;
    const { status } = data;

    if(!status) return;

    const isValidStatus = Object.values(PresenceStatusType).includes(status);

    if(!isValidStatus) return;

    socketManager.presence.set(socketId, status);
    sendPresenceUpdate(socketId, status);
};

export default onPresenceUpdate;