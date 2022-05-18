import sockets from "@controller/socket";
import type { Socket } from "socket.io";

/**
    Handler für das `connection`-Event.
    Wird ausgeführt, sobald ein Socket eine Verbindung herstellt.
*/
const onConnection = async (socket: Socket) => {
    sockets.add(socket);
};

export default onConnection;