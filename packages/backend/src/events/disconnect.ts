import sockets from "@controller/socket";
import type { Socket } from "socket.io";

/**
    Handler für das `disconnect`-Event.
    Wird ausgeführt, sobald ein Socket eine Verbindung trennts.
*/
const onDisconnect = async (socket: Socket) => {
    sockets.remove(socket);
};

export default onDisconnect;