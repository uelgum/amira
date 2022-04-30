import fs from "fs";
import path from "path";
import yml from "js-yaml";
import configSchema from "@schemas/config";
import root from "@utils/root";

// #region Types
type Config = {
    port: number;
    jwtKey: string;
    mongo: {
        host: string;
        username: string;
        password: string;
        database: string;
    };
    email: {
        host: string;
        username: string;
        password: string;
    };
};
// #endregion

const CONFIG_PATH = path.join(root, "/config/config.yml");

const file = fs.readFileSync(CONFIG_PATH, "utf-8");
const config = yml.load(file) as Config;

/**
    Validiert die Config.
*/
const validateConfig = () => {
    const { error } = configSchema.validate(config);

    if(error) {
        const message = error.details[0].message;
        throw new Error(`Fehlerhafte Config: ${message}`);
    }
};

export { validateConfig };
export default config;