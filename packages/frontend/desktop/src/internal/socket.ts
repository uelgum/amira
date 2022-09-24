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

// Leichteres Debuggen ermöglichen
if(config.env === "dev") {
    window["socket"] = socket;
}

export default socket;