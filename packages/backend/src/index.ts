import http from "http";
import cors from "cors";
import express from "express";

// Intern
import logger from "@loaders/logger";
import { loadSequelize } from "@loaders/sequelize";
import malformedJson from "@api/middleware/http/malformedJson";
import routes from "@api/routes";
import gracefulExit from "@utils/gracefulExit";

// Config
import config, { validateConfig } from "@config";

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "*" })); // FIXME Nur solange in Entwicklung
app.use(express.json());
app.use(malformedJson);

app.use("/api", routes);

/**
    Startet den Server.
*/
const start = async () => {
    logger.info("Starte Server...");

    process.on("SIGINT", () => gracefulExit(server));

    try {
        validateConfig();

        // Loader ausführen
        await loadSequelize();
    } catch(error) {
        logger.error(error);
        process.exit(1);
    }

    server.listen(config.port, () => {
        logger.info(`Server online (Port ${config.port})`);
    });
};

start();