import { writable } from "svelte/store";

/**
    Umgebung der App, in der sie ausgeführt wird (entweder Browser oder Tauri).
*/
const envStore = writable(
    !!window.__TAURI_METADATA__ ? "tauri" : "web"
);

export default envStore;