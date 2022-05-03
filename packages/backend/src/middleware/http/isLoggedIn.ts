import jwt from "jwt-promisify";
import AmiraError from "@structs/amiraError";
import { sendError } from "@utils/response";
import config from "@config";
import { Request, Response } from "express";

// #region Types
type Next = () => void;
// #endregion

/**
    Überprüft, ob ein Nutzer angemeldet ist.
*/
const isLoggedIn = async (req: Request, res: Response, next: Next) => {
    const header = req.headers.authorization;

    if(!header) {
        sendError(res, new AmiraError(401, "AUTHENTICATION_ERROR", "LOGIN_REQUIRED"));
        return;
    }

    const [ schema, token ] = header.split(" ");

    if(!token || schema !== "Bearer") {
        sendError(res, new AmiraError(401, "AUTHENTICATION_ERROR", "INVALID_TOKEN"));
        return;
    }

    try {
        res.locals = await jwt.verify(token, config.jwtKey);
    } catch(error) {
        sendError(res, new AmiraError(401, "AUTHENTICATION_ERROR", "INVALID_TOKEN"));
        return;
    }

    next();
};

export default isLoggedIn;