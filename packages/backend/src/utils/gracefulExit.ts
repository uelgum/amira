import logger from "@loaders/logger";
import sequelize from "@loaders/sequelize";

// Types
import type { Server } from "http";

/**
    Fährt den Server ordnungsgemäß herunter.
*/
const gracefulExit = (server: Server) => {
    logger.warn("Fahre ordnungsgemäß herunter...");

    sequelize.close();
    server.close();

    process.exit(0);
};

export default gracefulExit;