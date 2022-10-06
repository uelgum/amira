import { writable } from "svelte/store";

// Intern
import { SIDE_BAR_EXPANDED_KEY } from "@internal/constants";

/**
    Ob die Sidebar minimiert ist.
*/
const sideBarExpanded = writable(
    (window.localStorage.getItem(SIDE_BAR_EXPANDED_KEY) === "true")
);

/**
    Aktualisiert den Wert im Store.
*/
const set = (isMinimized: boolean) => {
    window.localStorage.setItem(SIDE_BAR_EXPANDED_KEY, `${isMinimized}`);
    sideBarExpanded.set(isMinimized);
};

export default {
    subscribe: sideBarExpanded.subscribe,
    set
};