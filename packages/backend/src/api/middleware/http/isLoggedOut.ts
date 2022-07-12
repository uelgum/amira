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

const isLoggedOut = async (req: Request, res: Response, next: Next) => {
    const header = req.headers.authorization;

    if(header) {
        sendError(res, new AmiraError(401, "LOGOUT_REQUIRED"));
        return;
    }

    next();
};

export default isLoggedOut;