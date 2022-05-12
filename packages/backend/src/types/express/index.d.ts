import "express";

declare module "express" {
    export type Locals = {
        /**
            ID des Nutzers.
        */
        id: string;

        /**
            Vorname des Nutzers.
        */
        name: string;

        /**
            Passwort-Schlüssel des Nutzers.
        */
        key: string;
    };

    export interface Response {
        /**
            Informationen über den Nutzer.
        */
        locals: Locals;
    }
}