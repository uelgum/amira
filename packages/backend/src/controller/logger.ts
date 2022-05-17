import path from "path";
import Logger from "ape-logger";
import ROOT from "@utils/root";

/**
    Pfad zum Logs-Ordner.
*/
const LOGS_PATH = path.resolve(ROOT, "logs");

/**
    Logger von Amira.
*/
const logger = new Logger({
    level: "INFO",
    path: LOGS_PATH
});

export default logger;