import type { Socket } from "socket.io";

// #region Types
type Timeout = ReturnType<typeof setTimeout>;
// #endregion

/**
    Kollektion aller verbundenen Sockets.
*/
const sockets = new Map<string, Socket>();

/**
    Kollektion aller Timeouts für Presence-Updates.
*/
const timeouts = new Map<string, Timeout>();

export {
    timeouts
};

export default sockets;