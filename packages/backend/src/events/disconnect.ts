import sockets from "@controller/socket";
import { sendPresenceUpdate } from "@services/notification";
import type { Socket } from "socket.io";

/**
    Handler für das `disconnect`-Event.
    Wird ausgeführt, sobald ein Socket eine Verbindung trennts.
*/
const onDisconnect = async (socket: Socket) => {
    const id = socket.user.id;

    sockets.delete(id);

    sendPresenceUpdate(id, "offline");
};

export default onDisconnect;