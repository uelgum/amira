import path from "path";
import Logger from "ape-logger";

/**
    Pfad zum Logs-Ordner.
*/
const LOGS_PATH = path.resolve(__dirname, "../../logs");

/**
    Logger von Amira.
*/
const logger = new Logger({
    level: "INFO",
    path: LOGS_PATH
});

export default logger;