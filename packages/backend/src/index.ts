import path from "path";
import http from "http";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import { Server as SocketIO, Socket } from "socket.io";

// Intern
import logger from "@loaders/logger";
import sockets from "@loaders/sockets";
import { loadJobs } from "@loaders/bree";
import { loadSequelize } from "@loaders/sequelize";
import routes from "@api/routes";
import gracefulExit from "@utils/gracefulExit";

// Middleware
import isLoggedIn from "@api/middleware/socket/isLoggedIn";
import malformedJson from "@api/middleware/http/malformedJson";

// Config
import config, { validateConfig } from "@config";

const app = express();
const server = http.createServer(app);

const io = new SocketIO(server, {
    cors: {
        origin: "*" // FIXME Nur solange in Entwicklung
    }
});

io.use(isLoggedIn);

io.on("connection", (socket: Socket) => {
    sockets.add(socket);
});

app.use(cors({ origin: "*" })); // FIXME Nur solange in Entwicklung
app.use(express.json());
app.use(malformedJson);
app.use(fileUpload());

app.use("/media", express.static(path.join(__dirname, "../uploads")));
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

        // Job-Scheduler starten
        await loadJobs();
    } catch(error) {
        logger.error(error);
        process.exit(1);
    }

    server.listen(config.port, () => {
        logger.info(`Server online (Port ${config.port})`);
    });
};

start();