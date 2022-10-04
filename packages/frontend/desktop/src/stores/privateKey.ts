import { writable } from "svelte/store";

// Types
import type { PrivateKey } from "openpgp";

/**
    Store für den Private Key.
*/
const privateKey = writable<PrivateKey>(null);

export default privateKey;