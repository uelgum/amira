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
        })
});

export default configSchema;