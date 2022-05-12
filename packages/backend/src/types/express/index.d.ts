import "express";

declare module "express" {
    export interface Response {
        locals: {
            id: string;
            name: string;
            key: string;
        };
    }
}