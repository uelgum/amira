import fs from "fs";
import path from "path";
import yml from "js-yaml";
import Joi from "joi";
import root from "@utils/root";

// #region Types
type Config = {
    port: number;
    jwtKey: string;
};
// #endregion

const CONFIG_PATH = path.join(root, "config/config.yml");

const file = fs.readFileSync(CONFIG_PATH, "utf-8");
const data = yml.load(file);

const schema = Joi.object<Config>({
    port: Joi.number()
        .message("'port' muss definiert sein")
        .min(1000)
        .message("'port' muss größer oder gleich 1000 sein")
        .max(65535)
        .message("'port' muss kleiner oder gleich 65535 sein"),

    jwtKey: Joi.string()
        .message("'jwtKey' muss definiert sein")
        .min(12)
        .message("'jwtKey' muss mindestens 12 Zeichen lang sein")
        .max(32)
        .message("'jwtKey' darf maximal 32 Zeichen lang sein")
});

const { error, value } = schema.validate(data);

if(error) {
    console.log(`Fehler: ${error.message}`);
    process.exit(1);
}

const config = value!;

export default config;