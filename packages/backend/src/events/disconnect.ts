import sockets from "@controller/sockets";
import type { Socket } from "socket.io";
import type User from "@models/user";

/**
    Handler für das `disconnect`-Event.
    Wird ausgeführt, sobald ein Socket die Verbindung trennt.
*/
const onDisconnect = async (socket: Socket) => {
    sockets.remove(socket.data.id);

    // TODO Presence Update
};

export default onDisconnect;