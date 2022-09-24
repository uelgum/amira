import App from "./App.svelte";

import "./events";
import "./global.scss";

const app = new App({
    target: document.getElementById("root")
});

export default app;