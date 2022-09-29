import { writable } from "svelte/store";

// Intern
import { LOCKED_KEY } from "@internal/constants";

/**
    Ob der App gesperrt ist.
*/
const lock = writable(
    (window.localStorage.getItem(LOCKED_KEY) === "true")
);

/**
    Aktualisiert den Wert im Store.
*/
const set = (isLocked: boolean) => {
    window.localStorage.setItem(LOCKED_KEY, `${isLocked}`);
    lock.set(isLocked);
};

/**
    Setzt den Wert im Store zurück.
*/
const reset = () => {
    window.localStorage.removeItem(LOCKED_KEY);
    lock.set(false);
};

export default {
    subscribe: lock.subscribe,
    set,
    reset
};