import fs from "fs";
import path from "path";
import root from "@utils/root";

const PACKAGE_JSON_PATH = path.join(root, "package.json");

const getVersion = () => {
    const file = fs.readFileSync(PACKAGE_JSON_PATH, "utf-8");
    let { version } = JSON.parse(file);

    if(process.env.NODE_ENV !== "production") {
        version += "-dev";
    }

    return version;
};

export default getVersion;