import { navigate } from "svelte-routing";
import { dataDir, join } from "@tauri-apps/api/path";

// Intern
import socket from "@internal/socket";
import token from "@stores/token";

/**
    Gibt den Pfad zu den App-Dateien zurück.
*/
const getAppDir = async () => {
    const dataDirPath = await dataDir();
    const appDir = await join(dataDirPath, "Amira");
    
    return appDir;
};

/**
    Meldet den Nutzer ab.
*/
const logout = () => {
    token.reset();
    socket.disconnect();
    navigate("/login");
};

export {
    getAppDir,
    logout
};