import { writable } from "svelte/store";
import jwtDecode from "jwt-decode";

// Intern
import { TOKEN_KEY } from "@internal/constants";

// #region Types
type Token = {
    id: string;
    firstName: string;
    username: string;
    key: string;
    admin: boolean;
};

type TokenStore = {
    token: string | null;
    decoded: Token | null;
};
// #endregion

const token = window.localStorage.getItem(TOKEN_KEY);

/**
    Store für Tokens.
*/
const tokenStore = writable<TokenStore>({
    token,
    decoded: (token) ? jwtDecode(token) : null
});

/**
    Aktualisiert das Token im Store und im `LocalStorage`.
*/
const set = (token: string) => {
    window.localStorage.setItem(TOKEN_KEY, token);
    
    tokenStore.set({
        token,
        decoded: jwtDecode(token)
    });
};

/**
    Setzt das Token im Store und im `LocalStorage` zurück.
*/
const reset = () => {
    window.localStorage.removeItem(TOKEN_KEY);
    tokenStore.set(null);
};

export type {
    Token
};

export default {
    subscribe: tokenStore.subscribe,
    set,
    reset
};