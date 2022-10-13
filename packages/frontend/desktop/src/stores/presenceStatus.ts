import { writable } from "svelte/store";

// Intern
import socket from "@internal/socket";
import { PRESENCE_STATUS_KEY } from "@internal/constants";

// #region Types
type PresenceStatus = "online" | "away" | "dnd" | "offline";
// #endregion

/**
    Presence-Status des Nutzers.
*/
const presenceStatus = writable<PresenceStatus>(
    window.localStorage.getItem(PRESENCE_STATUS_KEY) as PresenceStatus || "online"
);

/**
    Aktualisiert den Wert im Store.
*/
const set = (status: PresenceStatus) => {
    window.localStorage.setItem(PRESENCE_STATUS_KEY, status);

    if(socket.connected) {
        socket.emit("presenceUpdate", { status });
    }

    presenceStatus.set(status);
};

export type {
    PresenceStatus
};

export default {
    subscribe: presenceStatus.subscribe,
    set
};