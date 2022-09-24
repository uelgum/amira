import { writable } from "svelte/store";

/**
    Zustand der Socket-Verbindung.
*/
const socketConnection = writable(false);

export default socketConnection;