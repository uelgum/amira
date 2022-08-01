import { dataDir as getDataDir, join } from "@tauri-apps/api/path";

/**
    Gibt den App-Pfad von Amira zurück.
*/
const getAppPath = async () => {
    const dataDir = await getDataDir();
    return join(dataDir, "Amira");
};

export default getAppPath;