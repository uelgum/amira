import { navigate } from "svelte-routing";

// Intern
import socket from "@internal/socket";
import socketConnection from "@stores/socketConnection";

/**
    Wird ausgeführt, sobald die Socket-Verbindung getrennt wird.
*/
socket.on("disconnect", () => {
    socketConnection.set(false);
    navigate("/connecting");
});