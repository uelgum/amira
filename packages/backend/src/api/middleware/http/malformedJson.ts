import AmiraError from "@structs/error";
import { sendError } from "@utils/response";

// Types
import { Request, Response } from "express";

// #region Types
/**
    Funktion, welche die nächste Middleware aufruft.
*/
type Next = () => void;
// #endregion

/**
    Überprüft, ob die erhaltene JSON fehlerhaft formatiert ist.
*/
const malformedJson = (error: Error, req: Request, res: Response, next: Next) => {
    if(error instanceof SyntaxError) {
        sendError(res, new AmiraError(400, "MALFORMED_JSON"));
        return;
    }

    next();
};

export default malformedJson;