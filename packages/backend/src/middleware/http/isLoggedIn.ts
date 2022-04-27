import jwt from "jwt-promisify";
import { Request, Response } from "express";
import { sendError } from "@utils/response";
import AmiraError from "@structs/error";
import config from "@config";

// #region Types
type Next = () => void;
// #endregion

const isLoggedOut = async (req: Request, res: Response, next: Next) => {
    const header = req.headers.authorization;

    if(!header) {
        sendError(res, new AmiraError("LOGIN_REQUIRED", 401));
        return;
    }

    const [ schema, token ] = header.split(" ");

    if(!token || schema !== "Bearer") {
        sendError(res, new AmiraError("INVALID_TOKEN", 400));
        return;
    }

    try {
        res.locals = await jwt.verify(token, config.jwtKey);
    } catch(error) {
        sendError(res, new AmiraError("INVALID_TOKEN", 400));
        return;
    }

    next();
};

export default isLoggedOut;