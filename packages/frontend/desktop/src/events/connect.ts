import socket from "@internal/socket";
import socketConnection from "@stores/socketConnection";

/**
    Wird ausgeführt, sobald die Socket-Verbindung hergestellt ist.
*/
socket.on("connect", () => {
    socketConnection.set(true);
});