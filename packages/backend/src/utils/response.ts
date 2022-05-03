import AmiraError from "@structs/amiraError";
import { Response } from "express";

/**
    Sendet Daten an den Nutzer zurück.
*/
const sendData = (res: Response, data: Record<string, any>) => {
    res.status(200);
    res.json({
        status: "ok",
        data
    });
};

/**
    Sendet einen Fehler an den Nutzer zurück.
*/
const sendError = (res: Response, error: any) => {
    const status = (error instanceof AmiraError) ? error.status : 500;
    const code = (error instanceof AmiraError) ? error.code : "INTERNAL_ERROR";
    
    res.status(status);
    res.json({
        status: "err",
        err: {
            status,
            code
        }
    });
};

export {
    sendData,
    sendError
};