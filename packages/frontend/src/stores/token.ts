import { writable } from "svelte/store";

// Intern
import { TOKEN_KEY } from "@utils/constants";

/**
    JWT des Nutzers.
*/
const tokenStore = writable(window.localStorage.getItem(TOKEN_KEY));

export default tokenStore;