import loginSchema from "@schemas/login";
import registerSchema from "@schemas/register";
import passwordResetSchema from "@schemas/passwordReset";

/**
    Validiert erhaltene Login-Daten.
*/
const validateLoginData = (data: Record<string, any>) => {
    const { error } = loginSchema.validate(data);
    return !error;
};

/**
    Validiert erhaltene Registrierungs-Daten.
*/
const validateRegisterData = (data: Record<string, any>) => {
    const { error } = registerSchema.validate(data);
    return !error;
};

/**
    Validiert erhaltene Passwort-Reset-Daten.
*/
const validatePasswordResetData = (data: Record<string, any>) => {
    const { error } = passwordResetSchema.validate(data);
    return !error;
};

export {
    validateLoginData,
    validateRegisterData,
    validatePasswordResetData
};