import type { Socket } from "socket.io";

/**
    Manager für Socket-Verbindungen.
*/
class SocketManager {
    // #region Attribute
    /**
        Kollektion aller verbundener Sockets.
    */
    private sockets: Map<string, Socket>;
    // #endregion
    
    /**
        Konstruktor von `SocketManager`.
    */
    constructor() {
        this.sockets = new Map();
    }

    /**
        Anzhal der verbundenen Sockets.
    */
    public get size() {
        return this.sockets.size;
    }

    /**
        Überprüft, ob ein Socket verbunden ist.
    */
    public has(id: string) {
        return this.sockets.has(id);
    }

    /**
        Gibt einen Socket zurück.
    */
    public get(id: string) {
        return this.sockets.get(id)!;
    }

    /**
        Fügt einen Socket zum Manager hinzu.
    */
    public add(socket: Socket) {
        const id = socket.data.id;

        if(this.has(id)) {
            const oldSocket = this.get(id);

            oldSocket.emit("multipleConnections");
            oldSocket.disconnect();
        }

        this.sockets.set(id, socket);
    }

    /**
        Entfernt einen Socket aus dem Manager.
    */
    public remove(id: string) {
        this.sockets.delete(id);
    }

    /**
        Schickt ein Event an alle verbundenen Sockets.
    */
    public broadcast(event: string, data: any) {
        this.sockets.forEach((socket) => socket.emit(event, data));
    }
}

export default SocketManager;