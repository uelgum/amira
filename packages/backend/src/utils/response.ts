import { Response } from "express";
import AmiraError from "@structs/amiraError";

/**
    Sendet eine erfolgreiche Antwort zurück.
*/
const sendData = (res: Response, data?: Record<string, any>) => {
    res.status(200).json({
        status: "ok",
        success: true,
        ...(!!data && { data })
    });
};

/**
    Sendet einen Fehler zurück.
*/
const sendError = (res: Response, error: Error) => {
    const status = (error instanceof AmiraError) ? error.status : 500;
    const code = (error instanceof AmiraError) ? error.code : "INTERNAL_ERROR";
    const subcode = (error instanceof AmiraError) ? error.subcode : null;

    res.status(status).json({
        status: "err",
        success: false,
        err: {
            code,
            ...(!!subcode && { subcode })
        }
    });
};

export {
    sendData,
    sendError
};