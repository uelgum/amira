import { writable } from "svelte/store";

// #region Types
type Notification = {
    id: string;
    type: string;
    content: string;
    createdAt: number;
};
// #endregion

/**
    Store für Benachrichtigungen.
*/
const notifications = writable<Notification[]>([]);

export type {
    Notification
};

export default notifications;