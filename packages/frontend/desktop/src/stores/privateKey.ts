import { writable } from "svelte/store";

// Types
import type { PrivateKey } from "openpgp";

/**
    Store für den Private Key des Nutzers.
*/
const privateKey = writable<PrivateKey>(null);

export default privateKey;