import { writable } from "svelte/store";

// Intern
import socket from "@internal/socket";
import { PRESENCE_KEY } from "@internal/constants";

// Types
import type { PresenceStatusType } from "@amira/shared/components/PresenceStatus";

/**
    Presence-Status des Nutzers.
*/
const presence = writable<PresenceStatusType>(
    window.localStorage.getItem(PRESENCE_KEY) || "online"
);

/**
    Aktualisiert den Presence-Status des Nutzers und schickt diesen
    an das Backend.
*/
const set = (status: PresenceStatusType) => {
    presence.set(status);
    window.localStorage.setItem(PRESENCE_KEY, status);

    if(socket.connected) {
        socket.emit("presenceUpdate", status);
    }
};

export type {
    PresenceStatusType
};

export default {
    subscribe: presence.subscribe,
    set
};