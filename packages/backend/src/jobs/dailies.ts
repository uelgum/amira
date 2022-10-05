import { parentPort } from "worker_threads";

// Intern
import logger from "@loaders/logger";
import Dailies from "@models/apps/dailies";

/**
    Entfernt alle Dailies jeden Tag um 00:00 Uhr.
*/
(async () => {
    try {
        const count = await Dailies.count();
        await Dailies.truncate();
    
        logger.info(`Dailies zurückgesetzt (insgesamt ${count})`);
    } catch(error) {
        logger.error("Dailies nicht zurückgesetzt");
        logger.error(error);
    }
    
    if(parentPort) {
        parentPort.postMessage("done");
    } else {
        process.exit(0);
    }
})();