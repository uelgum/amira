import jwt from "jwt-promisify";

// Config
import config from "@config";

// Types
import type { Socket } from "socket.io";

// #region Types
/**
    Funktion, welche die nächste Middleware aufruft.
*/
type Next = (...args: any[]) => void;
// #endregion

const isLoggedIn = async (socket: Socket, next: Next) => {
    const auth = socket.handshake.auth.token;

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