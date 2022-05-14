import { Socket } from "socket.io";
import jwt from "jwt-promisify";
import config from "@config";

// #region Types
type Next = (...args: any[]) => void;
// #endregion

/**
    Überprüft, ob der Nutzer angemeldet ist.
*/
const isLoggedIn = async (socket: Socket, next: Next) => {
    const auth = socket.handshake.auth.token;

    if(!auth) {
        next(new Error("AUTH_ERROR"));
        return;
    }

    const [ schema, token ] = auth.split(" ");

    if(!token || schema !== "Bearer") {
        next(new Error("AUTH_ERROR"));
        return;
    }

    try {
        socket.user = await jwt.verify(token, config.jwtKey);
    } catch(error) {
        next(new Error("AUTH_ERROR"));
        return;
    }

    next();
};

export default isLoggedIn;