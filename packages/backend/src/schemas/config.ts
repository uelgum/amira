import Joi from "joi";

/**
    Schema für die Konfigurations-Datei.
*/
const configSchema = Joi.object({
    // Port
    port: Joi.number()
        .min(1000)
        .max(65535)
        .messages({
            "any.required": "'port' muss eine Nummer sein",
            "number.min": "'port' muss mindestens 1000 betragen",
            "number.max": "'port' darf höchstens 65535 betragen"
        }),

    // JWT-Schlüssel
    jwtKey: Joi.string()
        .min(8)
        .max(32)
        .messages({
            "any.required": "'jwtKey' muss ein String sein",
            "string.min": "'jwtKey' muss mindestens 8 Zeichen lang sein betragen",
            "string.max": "'jwtKey' darf höchstens 32 Zeichen lang sein"
        }),

    // E-Mail
    email: Joi.object({
        // Host
        host: Joi.string()
            .messages({
                "any.required": "'email.host' muss ein String sein"
            }),

        // Nutzername
        username: Joi.string()
            .min(8)
            .max(32)
            .messages({
                "any.required": "'email.username' muss ein String sein",
                "string.min": "'email.username' muss mindestens 8 Zeichen lang sein betragen",
                "string.max": "'email.username' darf höchstens 32 Zeichen lang sein"
            }),

        // Passwort
        password: Joi.string()
            .min(8)
            .max(32)
            .messages({
                "any.required": "'email.password' muss ein String sein",
                "string.min": "'email.password' muss mindestens 8 Zeichen lang sein betragen",
                "string.max": "'email.password' darf höchstens 32 Zeichen lang sein"
            }),
    })
});

export default configSchema;