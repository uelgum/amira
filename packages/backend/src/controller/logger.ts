import path from "path";
import Logger from "ape-logger";
import root from "@utils/root";

const LOGS_PATH = path.join(root, "logs");

const logger = new Logger({
    level: "INFO",
    path: LOGS_PATH
});

export default logger;