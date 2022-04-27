import { Request, Response } from "express";
import { sendError } from "@utils/response";
import AmiraError from "@structs/error";

// #region Types
type Next = () => void;
// #endregion

const isLoggedOut = (req: Request, res: Response, next: Next) => {
    const header = req.headers.authorization;

    if(header) {
        sendError(res, new AmiraError("LOGOUT_REQUIRED", 401));
        return;
    }

    next();
};

export default isLoggedOut;