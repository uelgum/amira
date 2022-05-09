import http from "http";
import express from "express";
import cors from "cors";
import { Server as SocketIO } from "socket.io";
import mongoose from "mongoose";
import logger from "@controller/logger";
import routes from "@routes/api";
import errorHandler from "@routes/error";
import getVersion from "@utils/getVersion";
import isLoggedIn from "@middleware/socket/isLoggedIn";
import handleSocketConnection from "@events/connection";
import config, { validateConfig } from "@config";

/**
    Server für Amira.
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
    private server: http.Server;

    /**
        Socket-Server.
    */
    private io: SocketIO;

    /**
        Port des Servers.
    */
    public readonly port: number;

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
        this.server = http.createServer(this.app);

        this.io = new SocketIO(this.server, {
            cors: {
                origin: "*"
            }
        });

        this.port = config.port;
        this.version = getVersion();
        
        this.init();
    }

    /**
        Initialisiert den Server.
    */
    private init() {
        this.app.use(cors());
        this.app.use(express.json());
        
        this.app.use("/api", routes);
        this.app.use(errorHandler);

        this.io.use(isLoggedIn);
        this.io.on("connection", handleSocketConnection);
    }

    /**
        Stellt eine Verbindung zu MongoDB her.
    */
    private connectMongo() {
        const { host, username, password, database } = config.mongo;
        const uri = `mongodb://${host}`;

        mongoose.connect(uri, {
            user: username,
            pass: password,
            dbName: database,
            authSource: "admin",
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
            this.connectMongo();

            this.server.listen(this.port, () => {
                logger.info(`Server online (Port ${this.port})`);
            });
        } catch(error) {
            logger.error(error);
            process.exit(1);
        }
    }
}

export default Server;