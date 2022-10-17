import onDisconnect from "@api/events/disconnect";
import onPresenceUpdate from "@api/events/presenceUpdate";

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

    /**
        Kollektion aller aktuellen Presence-Status.
    */
    public presence: Map<string, string>;
    // #endregion

    /**
        Konstruktor von `SocketManager`.
    */
    constructor() {
        this.sockets = new Map();
        this.debounces = new Map();
        this.presence = new Map();
    }

    /**
        Anzahl der verbundenen Sockets.
    */
    public get size() {
        return this.sockets.size;
    }

    /**
        Überprüft, ob ein Socket im Manager vorhanden ist.
    */
    public has(id: string) {
        return this.sockets.has(id);
    }

    /**
        Gibt einen Socket aus dem Manager zurück.
    */
    public get(id: string) {
        if(!this.has(id)) {
            throw new Error("SOCKET_NOT_FOUND");
        }

        return this.sockets.get(id)!;
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

        socket.on("disconnect", onDisconnect.bind(null, this, socket));
        socket.on("presenceUpdate", onPresenceUpdate.bind(null, this, socket));

        this.sockets.set(socketId, socket);
    }

    /**
        Entfernt einen Socket aus dem Manager.
    */
    public remove(socket: Socket) {
        const socketId = socket.user.id;

        if(socket.connected) {
            socket.disconnect();
        }

        this.presence.delete(socketId);
        this.sockets.delete(socketId);
    }

    /**
        Schickt ein Event an alle verbundenen Sockets.
    */
    public broadcast(event: string, data: Record<string, any>) {
        this.sockets.forEach((socket) => socket.emit(event, data));
    }
}

export default SocketManager;