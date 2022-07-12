import jwt from "jwt-promisify";

// Intern
import AmiraError from "@structs/error";
import { sendError } from "@utils/response";

// Config
import config from "@config";

// Types
import { Request, Response } from "express";

// #region Types
/**
    Funktion, welche die nächste Middleware aufruft.
*/
type Next = () => void;
// #endregion

/**
    Überprüft, ob der Nutzer mit einem gültigen JWT angemeldet ist.
*/
const isLoggedIn = async (req: Request, res: Response, next: Next) => {
    const header = req.headers.authorization;

    if(!header) {
        sendError(res, new AmiraError(403, "UNAUTHORIZED"));
        return;
    }

    const [ schema, token ] = header.split(" ");

    if(!token || schema !== "Bearer") {
        sendError(res, new AmiraError(403, "INVALID_TOKEN"));
        return;
    }

    try {
        req.user = await jwt.verify(token, config.jwtKey);
    } catch(error) {
        sendError(res, new AmiraError(403, "INVALID_TOKEN"));
        return;
    }

    next();
};

export default isLoggedIn;