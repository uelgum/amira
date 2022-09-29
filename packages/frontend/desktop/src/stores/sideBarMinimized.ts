import { writable } from "svelte/store";

// Intern
import { SIDE_BAR_MINIMIZED_KEY } from "@internal/constants";

/**
    Ob die Sidebar minimiert ist.
*/
const sideBarMinimized = writable(
    (window.localStorage.getItem(SIDE_BAR_MINIMIZED_KEY) === "true")
);

/**
    Aktualisiert den Wert im Store.
*/
const set = (isMinimized: boolean) => {
    window.localStorage.setItem(SIDE_BAR_MINIMIZED_KEY, `${isMinimized}`);
    sideBarMinimized.set(isMinimized);
};

export default {
    subscribe: sideBarMinimized.subscribe,
    set
};