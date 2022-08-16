import { join, dataDir as getDataDir } from "@tauri-apps/api/path";

/**
    Gibt den App-Ordner zurück.
*/
const getAppDir = async () => {
    const dataDir = await getDataDir();
    const appDir = await join(dataDir, "Amira");
    
    return appDir;
};

export {
    getAppDir
};