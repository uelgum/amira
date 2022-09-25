import socket from "@internal/socket";
import socketConnection from "@stores/socketConnection";

/**
    Wird ausgeführt, wenn die Socket-Verbindung scheitert.
*/
socket.on("connect_error", () => {
    socketConnection.set(false);
});