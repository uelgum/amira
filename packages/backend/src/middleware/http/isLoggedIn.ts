import { Request, Response } from "express";
import jwt from "jwt-promisify";
import AmiraError from "@structs/amiraError";
import { sendError } from "@utils/response";
import config from "@config";

// #region Types
type Next = () => void;
// #endregion

/**
    Überprüft, ob der Nutzer angemeldet ist.
*/
const isLoggedIn = async (req: Request, res: Response, next: Next) => {
    const header = req.headers.authorization;

    if(!header) {
        sendError(res, new AmiraError(401, "UNAUTHORIZED"));
        return;
    }

    const [ schema, token ] = header.split(" ");

    if(!token || schema !== "Bearer") {
        sendError(res, new AmiraError(401, "UNAUTHORIZED", "INVALID_TOKEN"));
        return;
    }

    try {
        res.locals = await jwt.verify(token, config.jwtKey);
    } catch(error) {
        sendError(res, new AmiraError(401, "UNAUTHORIZED", "INVALID_TOKEN"));
        return;
    }

    next();
};

export default isLoggedIn;