import api from "@internal/api";
import socket from "@internal/socket";
import notifications from "@stores/notifications";

// Types
import type { Notification } from "@stores/notifications";

// #region Types
type Response = {
    notifications: Notification[];
};
// #endregion

/**
    Wird ausgeführt, wenn die Socket-Verbindung scheitert.
*/
socket.on("notification", async () => {
    const res = await api.get<Response>("/notifications");

    if(res.status === "err") {
        return;
    }

    notifications.update((n) => [
        ...res.data.notifications,
        ...n
    ]);
}); 