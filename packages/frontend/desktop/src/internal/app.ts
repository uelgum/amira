import { dataDir, join } from "@tauri-apps/api/path";

/**
    Gibt den Pfad zu den App-Dateien zurück.
*/
const getAppDir = async () => {
    const dataDirPath = await dataDir();
    const appDir = await join(dataDirPath, "Amira");
    
    return appDir;
};

export {
    getAppDir
};