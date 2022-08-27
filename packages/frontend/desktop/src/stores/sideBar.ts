import { writable } from "svelte/store";

// Intern
import { SIDEBAR_KEY } from "@internal/constants";

/**
    Ob die Side-Bar minimisiert ist.
*/
const sideBar = writable(
    window.localStorage.getItem(SIDEBAR_KEY) === "true"
);

const set = (minimized: boolean) => {
    sideBar.set(minimized);
    window.localStorage.setItem(SIDEBAR_KEY, `${minimized}`);
};

export default {
    subscribe: sideBar.subscribe,
    set
};