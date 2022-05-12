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
        })
});

export default configSchema;