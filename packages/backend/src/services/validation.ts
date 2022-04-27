import Joi from "joi";

const NAME_REGEX = /^(([ ,.'-](?<!( {2}|[,.'-]{2})))*[A-Za-z])+[ ,.'-]?$/;

const USERNAME_REGEX = /^(?!_)([a-zA-Z0-9_.\/-]+)(?<!\_)$/;

// #region Schemas
const loginSchema = Joi.object({
    // Nutzername
    username: Joi.string()
        .min(2)
        .max(16)
        .regex(USERNAME_REGEX),
    
    // Passwort
    password: Joi.string()
        .min(6)
        .max(32)
});

const registerSchema = Joi.object({
    // Vorname
    firstName: Joi.string()
        .min(1)
        .max(18)
        .regex(NAME_REGEX),

    // Nachname
    lastName: Joi.ref("firstName"),

    // Nutzername
    username: Joi.string()
        .min(2)
        .max(16)
        .regex(USERNAME_REGEX),

    // E-Mail
    email: Joi.string()
        .email(),

    // Passwort
    password: Joi.string()
        .min(6)
        .max(32),

    // Passwort-Bestätigung
    passwordRetype: Joi.ref("password")
});
// #endregion

const validateLoginData = (data: Record<string, any>) => {
    const { error } = loginSchema.validate(data);
    return !!error;
};

const validateRegisterData = (data: Record<string, any>) => {
    const { error } = registerSchema.validate(data);
    return !!error;
};

export {
    validateLoginData,
    validateRegisterData
}