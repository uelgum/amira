import { io } from "socket.io-client";

// Intern
import config from "@internal/config";

/**
    Socket.
*/
const socket = io(config.url, {
    autoConnect: false,
    reconnection: true
});

export default socket;