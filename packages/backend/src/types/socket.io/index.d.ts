import "socket.io";
import { Locals as Payload } from "express";

declare module "socket.io" {
    export interface Socket {
        user: Payload;
    }
}