import jwt from "jwt-promisify";
import config from "@config";
import type { Socket } from "socket.io";

// #region Types
type Next = (...args: any[]) => void;
// #endregion

/**
    Überprüft, ob der Nutzer angemeldet ist.
*/
const isLoggedIn = async (socket: Socket, next: Next) => {
    const auth = socket.handshake.auth;

    if(!auth) {
        next(new Error("AUTH_ERROR"));
        return;
    }

    try {
        const [ schema, token ] = auth.split(" ");

        if(!token || schema !== "Bearer") {
            next(new Error("AUTH_ERROR"));
            return;
        }

        socket.data = await jwt.verify(token, config.jwtKey);
    } catch(error) {
        next(new Error("AUTH_ERROR"));
        return;
    }

    next();
};

export default isLoggedIn;