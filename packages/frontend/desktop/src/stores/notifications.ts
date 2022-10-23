import { writable } from "svelte/store";

// #region Types
type Notification = {
    id: string;
    type: string;
    data: Record<string, string | number>;
    link?: string;
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