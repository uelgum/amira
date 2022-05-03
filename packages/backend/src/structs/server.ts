import http from "http";
import express from "express";
import cors from "cors";
import { Server as SocketIO } from "socket.io";
import mongoose from "mongoose";
import logger from "@controller/logger";
import routes from "@routes/api";
import errorHandler from "@routes/error";
import getVersion from "@utils/getVersion";
import config, { validateConfig } from "@config";

class Server {
    // #region Attribute
    private app: express.Application;
    private server: http.Server;
    private io: SocketIO;

    public readonly port: number;
    public readonly version: string;
    // #endregion

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new SocketIO(this.server);

        this.port = config.port;
        this.version = getVersion();
        
        this.init();
    }

    private init() {
        this.app.use(cors());
        this.app.use(express.json());
        
        this.app.use("/api", routes);
        this.app.use(errorHandler);

        // TODO SocketIO
    }

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