import onDisconnect from "@api/events/disconnect";

// Types
import type { Socket } from "socket.io";

/**
    Manager für Socket-Verbindungen.
*/
class SocketManager {
    // #region Attribute
    /**
        Kollektion aller verbundenen Sockets.
    */
    private sockets: Map<string, Socket>;

    /**
        Kollektion aller aktiven Debounces.
    */
    public debounces: Map<string, NodeJS.Timeout>;
    // #endregion

    /**
        Konstruktor von `SocketManager`.
    */
    constructor() {
        this.sockets = new Map();
        this.debounces = new Map();
    }

    /**
        Anzahl der verbundenen Sockets.
    */
    public get size() {
        return this.sockets.size;
    }

    /**
        Fügt einen Socket zum Manager hinzu.
    */
    public add(socket: Socket) {
        const socketId = socket.user.id;

        if(this.sockets.has(socketId)) {
            const oldSocket = this.sockets.get(socketId)!;

            oldSocket.emit("multipleConnections");
            oldSocket.disconnect();
        }

        // TODO Events hinzufügen
        socket.on("disconnect", onDisconnect.bind(null, this, socket));

        this.sockets.set(socketId, socket);
    }

    /**
        Entfernt einen Socket aus dem Manager.
    */
    public remove(socket: Socket) {
        if(socket.connected) {
            socket.disconnect();
        }

        this.sockets.delete(socket.user.id);
    }

    /**
        Schickt ein Event an alle verbundenen Sockets.
    */
    public broadcast(event: string, data: Record<string, any>) {
        this.sockets.forEach((socket) => socket.emit(event, data));
    }
}

export default SocketManager;