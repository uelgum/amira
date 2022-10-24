import { writable } from "svelte/store";

// Types
import type { PresenceStatus } from "@stores/presenceStatus";

/**
    Store für alle Kontakte und deren Presence-Status.
*/
const contacts = writable<Record<string, PresenceStatus>>({});

export default contacts;