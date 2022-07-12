import Joi from "joi";

/**
    Schema für Login-Daten.
*/
const loginSchema = Joi.object({
    // Nutzername
    username: Joi.string()
        .min(1)
        .max(16),

    // Passwort
    password: Joi.string()
        .min(8)
        .max(32)
});

export default loginSchema;