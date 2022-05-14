import sockets from "@controller/socket";
import Notification from "@models/notification";
import User from "@models/user";

/**
    Sendet ein Update-Befehl für Benachrichtigungen an einen Nutzer.
*/
const sendNotificationUpdate = async (id: string) => {
    if(!sockets.has(id)) return;

    const socket = sockets.get(id);

    socket.emit("notificationUpdate");
};

export {
    sendNotificationUpdate
};