import { writable } from "svelte/store";

/**
    Private Key des Nutzers.
*/
const privateKeyStore = writable(null);

export default privateKeyStore;