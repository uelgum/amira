import AmiraError from "@structs/amiraError";
import { sendError } from "@utils/response";
import { Request, Response } from "express";

// #region Types
type Next = () => void;
// #endregion

/**
    Überprüft, ob ein Nutzer abgemeldet ist.
*/
const isLoggedOut = async (req: Request, res: Response, next: Next) => {
    const header = req.headers.authorization;

    if(header) {
        sendError(res, new AmiraError(401, "AUTHENTICATION_ERROR", "LOGOUT_REQUIRED"));
        return;
    }

    next();
};

export default isLoggedOut;