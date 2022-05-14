import Joi from "joi";

/**
    Schema für Login-Daten.
*/
const loginSchema = Joi.object({
    // E-Mail
    email: Joi.string()
        .email(),

    // Passwort
    password: Joi.string()
        .min(8)
        .max(32)
});

export default loginSchema;