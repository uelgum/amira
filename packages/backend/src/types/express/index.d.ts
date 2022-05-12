import "express";

declare module "express" {
    export type Locals = {
        id: string;
        name: string;
        key: string;
        admin?: boolean;
    };

    export interface Response {
        locals: Locals;
    }
}