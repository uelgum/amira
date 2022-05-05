import Joi from "joi";

/**
    Schema für die Config.
*/
const configSchema = Joi.object({
    // Port
    port: Joi.number()
        .min(1000)
        .max(65535)
        .messages({
            "number.empty": "'port' muss eine Nummer sein",
            "number.min": "'port' muss mindestens 1000 sein",
            "number.max": "'port' darf maximal 65535 sein"
        }),

    // JWT-Schlüssel
    jwtKey: Joi.string()
        .min(8)
        .max(32)
        .messages({
            "string.empty": "'jwtKey' muss ein String sein",
            "string.min": "'jwtKey' muss mindestens 8 Zeichen lang sein",
            "string.max": "'jwtKey' darf maximal 32 Zeichen lang sein"
        }),

    // MongoDB
    mongo: Joi.object({
        // Host
        host: Joi.string()
            .messages({
                "string.empty": "'mongo.host' muss ein String sein"
            }),
        
        // Nutzername
        username: Joi.string()
            .messages({
                "string.empty": "'mongo.username' muss ein String sein"
            }),

        // Passwort
        password: Joi.string()
            .messages({
                "string.empty": "'mongo.password' muss ein String sein"
            }),

        // Datenbank
        database: Joi.string()
            .messages({
                "string.empty": "'mongo.database' muss ein String sein"
            }),
    }),

    // E-Mail
    email: Joi.object({
        // Host
        host: Joi.string()
            .messages({
                "string.empty": "'email.host' muss ein String sein"
            }),

        // Nutzername
        username: Joi.string()
            .messages({
                "string.empty": "'email.username' muss ein String sein"
            }),

        // Passwort
        password: Joi.string()
            .messages({
                "string.empty": "'email.password' muss ein String sein"
            })
    })
});

export default configSchema;