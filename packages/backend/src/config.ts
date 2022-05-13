import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import configSchema from "@schemas/config";

// #region Types
type Config = {
    port: number;
    jwtKey: string;
    email: {
        host: string;
        username: string;
        password: string;
    };
};
// #endregion

/**
    Pfad zur Konfigurations-Datei.
*/
const CONFIG_PATH = path.resolve(__dirname, "../config/config.yml");

const data = yaml.load(fs.readFileSync(CONFIG_PATH, "utf-8"));
const config = data as Config;

/**
    Validiert die Konfigurations-Datei.
*/
const validateConfig = () => {
    const { error } = configSchema.validate(data, {
        presence: "required"
    });
    
    if(error) {
        const { message } = error.details[0];
        throw new Error(`Fehlerhafte Konfiguration: ${message}`);
    }
};

export {
    validateConfig
};

export default config;