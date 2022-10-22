import AmiraError from "@structs/error";
import logger from "@loaders/logger";

// Types
import type { Response } from "express";

/**
    Schickt Daten an den Nutzer zurück.
*/
const sendData = (res: Response, data?: Record<string, any>) => {
    res.status(200);
    res.json({
        status: "ok",
        data: (data || null)
    });
};

/**
    Schickt einen Fehler an den Nutzer zurück.
*/
const sendError = (res: Response, error: Error) => {
    const status = (error instanceof AmiraError) ? error.status : 500;
    const code = (error instanceof AmiraError) ? error.code : "INTERNAL_ERROR";

    if(status === 500) {
        logger.error(error);
    }

    res.status(status);
    res.json({
        status: "err",
        err: {
            code
        }
    });
};

export {
    sendData,
    sendError
};