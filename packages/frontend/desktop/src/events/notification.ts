import socket from "@internal/socket";
import notifications from "@stores/notifications";

// Types
import type { Notification } from "@stores/notifications";

/**
    Wird ausgeführt, wenn die Socket-Verbindung scheitert.
*/
socket.on("notification", (data: Notification) => {
    notifications.update((n) => [
        data,
        ...n
    ]);
}); 