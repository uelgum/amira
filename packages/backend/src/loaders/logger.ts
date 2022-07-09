import path from "path";
import { Logger } from "@uelgum/logger";

/**
    Pfad zu den Log-Dateien.
*/
const LOGS_PATH = path.join(__dirname, "../../logs");

/**
    Logger.
*/
const logger = new Logger({
    level: "INFO",
    logPath: LOGS_PATH,
    writeFile: (process.env.NODE_ENV === "production")
});

export default logger;