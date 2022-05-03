import Joi from "joi";

/**
    Schema für Login-Daten.
*/
const loginDataSchema = Joi.object({
    // E-Mail
    email: Joi.string()
        .email()
        .messages({
            "any.required": "EMAIL_REQUIRED",
            "string.email": "EMAIL_FORMAT"
        }),

    // Passwort
    password: Joi.string()
        .min(8)
        .max(32)
        .messages({
            "any.required": "PASSWORD_REQUIRED",
            "string.min": "PASSWORD_MIN_LENGTH",
            "string.max": "PASSWORD_MAX_LENGTH"
        }),
});

export default loginDataSchema;