import { Request, Response } from "express";
import AmiraError from "@structs/amiraError";
import { sendError } from "@utils/response";

// #region Types
type Next = () => void;
// #endregion

/**
    Überprüft, ob der Nutzer abgemeldet ist.
*/
const isLoggedOut = async (req: Request, res: Response, next: Next) => {
    const header = req.headers.authorization;

    if(header) {
        sendError(res, new AmiraError(403, "LOGOUT_REQUIRED"));
        return;
    }

    next();
};

export default isLoggedOut;