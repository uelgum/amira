import sockets from "@controller/socket";
import { sendPresenceUpdate } from "@services/notification";
import type { Socket } from "socket.io";

// Events
import onDisconnect from "@events/disconnect";

/**
    Handler für das `connection`-Event.
    Wird ausgeführt, sobald ein Socket eine Verbindung herstellt.
*/
const onConnection = async (socket: Socket) => {
    const id = socket.user.id;

    if(sockets.has(id)) {
        const oldSocket = sockets.get(id);
        oldSocket.emit("multipleConnections");
        oldSocket.disconnect();
    }

    // Events hinzufügen
    socket.on("disconnect", onDisconnect.bind(null, socket));

    sockets.set(id, socket);

    sendPresenceUpdate(id, "online");
};

export default onConnection;