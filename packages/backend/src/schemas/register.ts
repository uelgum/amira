import Joi from "joi";

/**
    Regex für Passwörter.
*/
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

/**
    Regex für Public-Keys (OpenPGP).
*/
const PUBLIC_KEY_REGEX = /^-----BEGIN PGP PUBLIC KEY BLOCK-----[a-zA-Z0-9/+=\n]+-----END PGP PUBLIC KEY BLOCK-----$/;

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
        .max(32)
        .regex(PASSWORD_REGEX),
    
    // Public-Key (OpenPGP)
    publicKey: Joi.string()
        .regex(PUBLIC_KEY_REGEX)
});

export {
    PASSWORD_REGEX
};

export default registerSchema;