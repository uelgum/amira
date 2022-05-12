import http from "http";
import express from "express";
import cors from "cors";
import { Server as SocketIO } from "socket.io";
import logger from "@controller/logger";
import getVersion from "@utils/getVersion";
import config, { validateConfig } from "@config";

// Middleware
import handleJsonError from "@middleware/http/handleJsonError";

/**
    Server von Amira.
*/
class Server {
    // #region Attribute
    private app: express.Application;
    private http: http.Server;
    private io: SocketIO;
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
    }

    /**
        Startet den Server.
    */
    public async start() {
        logger.info(`Starte Amira BE (v${this.version})`);

        try {
            validateConfig();

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