import "express";

declare module "express" {
    export type Locals = {
        id: string;
        name: string;
        key: string;
        admin?: boolean;
        emailUnverified?: boolean;
    };

    export interface Response {
        locals: Locals;
    }
}