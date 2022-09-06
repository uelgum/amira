import { readable } from "svelte/store";

/**
    Intervall, in dem das Datum und die Uhrzeit aktualsiert werden.
    Beträgt `10s`.
*/
const DATE_INTERVAL = 1000 * 10;

/**
    Readable Store für das aktuelle Datum und die Uhrzeit.
*/
const date = readable<Date>(new Date(), (set) => {
    const interval = setInterval(() => {
        set(new Date());
    }, DATE_INTERVAL);

    return () => {
        clearInterval(interval);
    };
});

export default date;