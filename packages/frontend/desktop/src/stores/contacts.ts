import { derived, writable } from "svelte/store";

// Intern
import api from "@internal/api";

// Types
import type { PresenceStatus } from "@stores/presenceStatus";

// #region Types
export type Contact = {
    id: string;
    contactId: string;
    fullName: string;
    presenceStatus: PresenceStatus;
};

type Response = {
    contacts: Contact[];
};
// #endregion

let isInit = false;

/**
    Store für alle Kontakte und deren Presence-Status.
*/
const contacts = writable<Contact[]>([]);

/**
    Store für alle Kontakte, die **online** sind.
*/
const onlineContacts = derived(
    contacts,
    ($contacts) => $contacts
        .filter((c) => c.presenceStatus !== "offline")
        .sort((a, b) => a.fullName.localeCompare(b.fullName))
);

/**
    Store für alle Kontakte, die **offline** sind.
*/
const offlineContacts = derived(
    contacts,
    ($contacts) => $contacts
        .filter((c) => c.presenceStatus === "offline")
        .sort((a, b) => a.fullName.localeCompare(b.fullName))
);

/**
    Initialisiert die Kontakt-Liste beim Start der App.
*/
const initContacts = async () => {
    if(isInit) return;

    const res = await api.get<Response>("/contacts");

    if(res.status === "err") {
        // TODO Etwas machen?
        return;
    }

    contacts.set(res.data.contacts);
};

export {
    initContacts,
    contacts,
    onlineContacts,
    offlineContacts
};