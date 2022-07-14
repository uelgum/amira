import Joi from "joi";

/**
    Schema für die Konfigurationsdatei.
*/
const configSchema = Joi.object({
    // Port
    port: Joi.number()
        .min(1000)
        .max(65535)
        .messages({
            "any.required": "'port' muss eine Zahl sein",
            "number.base": "'port' muss eine Zahl sein",
            "number.min": "'port' muss mindestens 1000 sein",
            "number.max": "'port' darf maximal 65535 sein"
        }),

    // JWT-Key
    jwtKey: Joi.string()
        .min(8)
        .max(32)
        .messages({
            "any.required": "'jwtKey' muss ein String sein",
            "string.base": "'jwtKey' muss ein String sein",
            "string.min": "'jwtKey' muss mindestens 8 Zeichen lang sein",
            "string.max": "'jwtKey' darf maximal 32 Zeichen lang sein"
        }),

    // PostgreSQL
    psql: Joi.object({
        // Host
        host: Joi.string()
            .messages({
                "any.required": "'psql.host' muss ein String sein",
                "string.base": "'psql.host' muss ein String sein",
            }),

        // Nutzername
        username: Joi.string()
            .messages({
                "any.required": "'psql.username' muss ein String sein",
                "string.base": "'psql.username' muss ein String sein",
            }),

        // Passwort
        password: Joi.string()
            .messages({
                "any.required": "'psql.password' muss ein String sein",
                "string.base": "'psql.password' muss ein String sein",
            }),

        // Datenbank
        db: Joi.string()
            .messages({
                "any.required": "'psql.db' muss ein String sein",
                "string.base": "'psql.db' muss ein String sein",
            })
    }),

    // E-Mail
    email: Joi.object({
        // Host
        host: Joi.string()
            .messages({
                "any.required": "'email.host' muss ein String sein",
                "string.base": "'email.host' muss ein String sein",
            }),

        // Port
        port: Joi.number()
            .min(1)
            .max(65535)
            .messages({
                "any.required": "'email.port' muss eine Nummer sein",
                "number.base": "'email.port' muss ein Nummer sein",
                "number.min": "'email.port' muss mindestens 1 sein",
                "number.max": "'email.port' darf maximal 65535 sein"
            }),

        // Nutzername
        username: Joi.string()
            .messages({
                "any.required": "'email.username' muss ein String sein",
                "string.base": "'email.username' muss ein String sein",
            }),

        // Passwort
        password: Joi.string()
            .messages({
                "any.required": "'email.password' muss ein String sein",
                "string.base": "'email.password' muss ein String sein",
            }),        
    })
});

export default configSchema;