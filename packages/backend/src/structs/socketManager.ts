import { sendPresenceUpdate } from "@services/notification";
import type { Socket } from "socket.io";

// Events
import onDisconnect from "@events/disconnect";

// #region Types
type Timeout = ReturnType<typeof setTimeout>;
// #endregion

/**
    Zeit, nach der ein Presence-Update wegen dem Disconnect-Event
    an alle Kontakte gesendet wird.
*/
const PRESENCE_UPDATE_TIMEOUT = 1000 * 10;

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
        Kollektion aller Debounces für Presence-Updates wegen dem
        Disconnect-Event.
    */
    private debounces: Map<string, Timeout>;
    // #endregion

    /**
        Konstruktor von `SocketManager`.
    */
    constructor() {
        this.sockets = new Map();
        this.debounces = new Map();
    }

    /**
        Anzhal der verbundenen Sockets.
    */
    public get size() {
        return this.sockets.size;
    }

    /**
        Gibt einen verbundenen Socket zurück.
    */
    public get(id: string) {
        return this.sockets.get(id);
    }

    /**
        Fügt einen neuen Socket zum Manage hinzu.
    */
    public add(socket: Socket) {
        const id = socket.user.id;

        if(this.sockets.has(id)) {
            const oldSocket = this.sockets.get(id);

            oldSocket.emit("multipleConnections");
            oldSocket.disconnect();
        }

        // Events hinzufügen
        socket.on("disconnect", onDisconnect.bind(null, socket));

        this.sockets.set(id, socket);

        // Nach Debounce für Presence-Update suchen
        if(this.debounces.has(id)) {
            const presenceUpdateTimeout = this.debounces.get(id);

            clearTimeout(presenceUpdateTimeout);
            this.debounces.delete(id);

            return;
        }

        sendPresenceUpdate(id, "online");
    }

    /**
        Entfernt einen Socket aus dem Manager.
    */
    public remove(socket: Socket) {
        const id = socket.user.id;

        this.sockets.delete(id);

        // Debounce für Presence-Update erstellen
        const presenceUpdateTimeout = setTimeout(() => {
            sendPresenceUpdate(id, "offline");
            this.debounces.delete(id);
        }, PRESENCE_UPDATE_TIMEOUT);

        this.debounces.set(id, presenceUpdateTimeout);
    }
}

export default SocketManager;