import path from "path";
import glob from "glob-promise";
import { Sequelize, Options as SequelizeOptions } from "sequelize";

// Intern
import logger from "@loaders/logger";

// Config
import config from "@config";

/**
    Glob-Pfad zu allen Models.
*/
const MODELS_PATH = path.join(__dirname, "../models/*.js");

const psql = config.psql;

/**
    Sequelize.
*/
const sequelize = new Sequelize({
    host: psql.host,
    username: psql.username,
    password: psql.password,
    database: psql.db,
    dialect: "postgres",
    logging: false,
    quoteIdentifiers: false,
    define: {
        timestamps: false
    }
});

/**
    Initialisiert Sequelize und stellt eine Verbindung zu PostgreSQL her.
*/
const loadSequelize = async () => {
    const start = performance.now();

    // Models importieren, sodass diese bei Sequelize definiert werden
    const models = await glob(MODELS_PATH);
    
    for (const model of models) {
        await import(model);
    }

    await sequelize.authenticate();
    await sequelize.sync();

    const end = performance.now();
    const duration = Math.round(end - start);

    logger.info(`Verbindung zu PostgreSQL hergestellt (${duration}ms)`);
};

export {
    loadSequelize
};

export default sequelize;