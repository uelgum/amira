import sockets from "@controller/sockets";
import type { Socket } from "socket.io";
import type User from "@models/user";

// Events
import onDisconnect from "@events/disconnect";

/**
    Handler für das `connection`-Event.
    Wird ausgeführt, sobald ein Socket eine Verbindung herstellt.
*/
const onConnection = async (socket: Socket) => {
    const id = socket.data.id;

    socket.on("disconnect", onDisconnect.bind(null, socket));

    sockets.add(socket);
};

export default onConnection;