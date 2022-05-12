import fs from "fs";
import path from "path";

/**
    Pfad zur `package.json`-Datei.
*/
const PACKAGE_JSON_PATH = path.resolve(__dirname, "../../package.json");

/**
    Liest die Version aus der `package.json`-Datei aus.
*/
const getVersion = () => {
    const packageJson = fs.readFileSync(PACKAGE_JSON_PATH, "utf-8");
    let { version } = JSON.parse(packageJson);

    if(process.env.NODE_ENV !== "production") {
        version += "-dev";
    }

    return version;
};

export default getVersion;