import Joi from "joi";

/**
    Schema für Registrierungs-Daten.
*/
const registerSchema = Joi.object({
    // Vorname
    firstName: Joi.string()
        .min(1)
        .max(64),

    // Nachname
    lastName: Joi.string()
        .min(1)
        .max(64),

    // Nutzername
    username: Joi.string()
        .min(1)
        .max(16),

    // E-Mail
    email: Joi.string()
        .email(),

    // Passwort
    password: Joi.string()
        .min(8)
        .max(32),

    // Bestätigung des Passworts
    passwordConfirm: Joi.string()
        .min(8)
        .max(32)
});

export default registerSchema;