import type { Socket } from "socket.io";

/**
    Kollektion aller verbundenen Sockets.
*/
const sockets = new Map<string, Socket>();

export default sockets;