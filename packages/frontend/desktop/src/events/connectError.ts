import socket from "@internal/socket";
import socketConnection from "@stores/socketConnection";
import { navigate } from "svelte-routing";

/**
    Wird ausgeführt, wenn die Socket-Verbindung scheitert.
*/
socket.on("connect_error", () => {
    socketConnection.set(false);
    navigate("/connecting");
});