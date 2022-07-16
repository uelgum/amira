import Joi from "joi";

// Intern
import { PASSWORD_REGEX } from "@schemas/register";

/**
    Schema für Passwort-Reset-Daten.
*/
const passwordResetSchema = Joi.object({
    // Action-ID
    actionId: Joi.string(),

    // Recovery-Code
    recoveryCode: Joi.string()
        .length(19),

    // Neues Passwort
    newPassword: Joi.string()
        .min(8)
        .max(32)
        .regex(PASSWORD_REGEX),

    // Bestätigung des neuen Passworts
    newPasswordConfirm: Joi.string()
        .min(8)
        .max(32)
        .regex(PASSWORD_REGEX)
});

export default passwordResetSchema;