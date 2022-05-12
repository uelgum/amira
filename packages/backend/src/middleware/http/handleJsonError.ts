import { Response } from "express";
import { sendError } from "@utils/response";
import AmiraError from "@structs/amiraError";

// #region Types
type Next = () => void;
// #endregion

/**
    Verarbeitet einen entstandenen JSON-Fehler aufgrund fehlerhafter Formatierung.
*/
const handleJsonError = (error: Error, _, res: Response, next: Next) => {
    if(error instanceof SyntaxError && error["body"]) {
        sendError(res, new AmiraError(400, "BAD_REQUEST", "MALFORMED_JSON"));
        return;
    }

    next();
};

export default handleJsonError;