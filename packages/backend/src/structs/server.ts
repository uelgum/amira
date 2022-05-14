import http from "http";
import express from "express";
import cors from "cors";
import { Server as SocketIO } from "socket.io";
import mongoose from "mongoose";
import logger from "@controller/logger";
import getVersion from "@utils/getVersion";
import config, { validateConfig } from "@config";

// Middleware
import handleJsonError from "@middleware/http/handleJsonError";
import isLoggedIn from "@middleware/socket/isLoggedIn";

// Events
import handleSocketConnection from "@events/connection";

// Router
import apiRouter from "@routes/api";
import errorRouter from "@routes/error";

/**
    Server von Amira.
*/
class Server {
    // #region Attribute
    /**
        Express-App.
    */
    private app: express.Application;

    /**
        HTTP-Server.
    */
    private http: http.Server;

    /**
        SocketIO-Server.
    */
    private io: SocketIO;

    /**
        Version des Servers.
    */
    public readonly version: string;
    // #endregion

    /**
        Konstruktor von `Server`.
    */
    constructor() {
        this.app = express();
        this.http = http.createServer(this.app);

        this.io = new SocketIO(this.http, {
            cors: {
                origin: "*" // FIXME Nur solange in Entwicklung
            }
        });

        this.version = getVersion();

        this.init();
    }

    /**
        Initialisiert den Server.
    */
    private init() {
        this.app.use(cors());

        this.app.use(express.json());
        this.app.use(handleJsonError);

        this.app.use("/api", apiRouter);
        this.app.use(errorRouter);

        this.io.use(isLoggedIn);
        this.io.on("connection", handleSocketConnection);
    }

    /**
        Stellt eine Verbindung zu MongoDB her.
    */
    private connectMongoDB() {
        const { host, username, password, database } = config.mongodb;
        const url = `mongodb://${host}/${database}`;

        mongoose.connect(url, {
            auth: {
                username,
                password
            },
            authSource: "admin"
        });

        logger.info("MongoDB verbunden");
    }

    /**
        Startet den Server.
    */
    public async start() {
        logger.info(`Starte Amira BE (v${this.version})`);

        try {
            validateConfig();
            this.connectMongoDB();

            this.http.listen(config.port, () => {
                logger.info(`Server online (Port ${config.port})`);
            });
        } catch(error) {
            logger.error(error);
            process.exit(1);
        }
    }
}

export default Server;