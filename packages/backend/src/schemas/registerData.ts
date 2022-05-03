import Joi from "joi";

/**
    Regex für Vor- und Nachnamen.
*/
const NAME_REGEX = /^[A-Z][a-z]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\.?)$/;

/**
    Schema für Registrierungs-Daten.
*/
const registerDataSchema = Joi.object({
    // Vorname
    firstName: Joi.string()
        .min(1)
        .max(18)
        .pattern(NAME_REGEX)
        .messages({
            "any.required": "FIRST_NAME_REQUIRED",
            "string.min": "FIRST_NAME_MIN_LENGTH",
            "string.max": "FIRST_NAME_MAX_LENGTH",
            "string.pattern": "FIRST_NAME_PATTERN"
        }),

    // Nachname
    lastName: Joi.string()
        .min(1)
        .max(18)
        .pattern(NAME_REGEX)
        .messages({
            "any.required": "LAST_NAME_REQUIRED",
            "string.min": "LAST_NAME_MIN_LENGTH",
            "string.max": "LAST_NAME_MAX_LENGTH",
            "string.pattern": "LAST_NAME_PATTERN"
        }),

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

    // Bestätigung des Passworts
    passwordRetype: Joi.string()
        .min(8)
        .max(32)
        .messages({
            "any.required": "PASSWORD_RETYPE_REQUIRED"
        })
});

export default registerDataSchema;