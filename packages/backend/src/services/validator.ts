import loginSchema from "@schemas/login";
import registerSchema from "@schemas/register";

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

export {
    validateLoginData,
    validateRegisterData
};