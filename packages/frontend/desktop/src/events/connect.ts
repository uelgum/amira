import { get } from "svelte/store";

// Intern
import socket from "@internal/socket";
import presenceStatus from "@stores/presenceStatus";
import socketConnection from "@stores/socketConnection";

/**
    Wird ausgeführt, sobald die Socket-Verbindung hergestellt ist.
*/
socket.on("connect", () => {
    socketConnection.set(true);

    const status = get(presenceStatus);

    socket.emit("presenceUpdate", {
        status
    });
});