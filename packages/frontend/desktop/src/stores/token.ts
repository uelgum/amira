import { writable } from "svelte/store";
import jwtDecode from "jwt-decode";

// Intern
import { TOKEN_KEY } from "@internal/constants";

// #region Types
type TokenStore = {
    raw: string;
    data: {
        iat: number;
        id: string;
        firstName: string;
        username: string;
        key: string;
        admin: boolean;
    };
};
// #endregion

// Token aus dem LocalStorage laden
const token = window.localStorage.getItem(TOKEN_KEY);

/**
    Store für das Token.
*/
const store = writable<TokenStore>({
    raw: token,
    data: (token) ? jwtDecode(token) : null
});

/**
    Aktualisiert den Wert im Token-Store.
*/
const set = (token: string) => {
    window.localStorage.setItem(TOKEN_KEY, token);
    store.set({
        raw: token,
        data: jwtDecode(token)
    });
};

/**
    Entfernt den Wert aus dem Token-Store.
*/
const reset = () => {
    window.localStorage.removeItem(TOKEN_KEY);
    store.set({
        raw: null,
        data: null
    });
};

export default {
    subscribe: store.subscribe,
    reset,
    set
};