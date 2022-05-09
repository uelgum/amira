import sockets from "@controller/sockets";
import type { Socket } from "socket.io";

// Services
import { presenceUpdate } from "@services/notification";

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

    presenceUpdate(id, "online");
};

export default onConnection;