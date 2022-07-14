import fs from "fs";
import path from "path";
import yml from "js-yaml";

// Intern
import configSchema from "@schemas/config";

// #region Types
/**
    Konfiguration.
*/
type Config = {
    /**
        Port des Servers.
    */
    port: number;

    /**
        JWT-Schlüssel.
    */
    jwtKey: string;

    /**
        Anmeldedaten für PostgreSQL.
    */
    psql: {
        host: string;
        username: string;
        password: string;
        db: string;
    };

    /**
        Anmeldedaten für den E-Mail-Server.
    */
    email: {
        host: string;
        port: number;
        username: string;
        password: string;
    };
};
// #endregion

/**
    Pfad zur Konfigurationsdatei.
*/
const CONFIG_PATH = path.join(__dirname, "../config/config.yml");

const file = fs.readFileSync(CONFIG_PATH, "utf-8");
const config = yml.load(file) as Config;

/**
    Validiert die Konfigurationsdatei.
*/
const validateConfig = () => {
    const { error } = configSchema.validate(config);

    if(error) {
        const { message } = error.details[0];
        throw new Error(`Fehlerhafte Konfiguration: ${message}`);
    }
};

export {
    validateConfig
};

export default config;