import sockets, { timeouts } from "@controller/socket";
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

    // In Timeouts suchen
    if(timeouts.has(id)) {
        const timeout = timeouts.get(id);

        clearTimeout(timeout);
        timeouts.delete(id);
        
        return;
    }

    sendPresenceUpdate(id, "online");
};

export default onConnection;