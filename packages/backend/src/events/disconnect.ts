import sockets from "@controller/sockets";
import type { Socket } from "socket.io";

// Services
import { presenceUpdate } from "@services/notification";

/**
    Handler für das `disconnect`-Event.
    Wird ausgeführt, sobald ein Socket die Verbindung trennt.
*/
const onDisconnect = async (socket: Socket) => {
    const id = socket.data.id;
    
    sockets.remove(id);

    presenceUpdate(id, "offline");
};

export default onDisconnect;