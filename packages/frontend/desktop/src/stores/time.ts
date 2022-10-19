import { readable } from "svelte/store";

/**
    Intervall, in dem der Wert aktualisiert wird.
*/
const TIME_INTERVAL = 1000;

/**
    Store für die aktuelle Zeit.
*/
const time = readable(new Date(), (set) => {
    const interval = setInterval(() => {
        set(new Date())
    }, TIME_INTERVAL);

    return () => {
        clearInterval(interval);
    };
});

export default time;