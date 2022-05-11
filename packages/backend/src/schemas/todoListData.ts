import Joi from "joi";

/**
    Schema für Todo-Listen-Daten.
*/
const todoListDataSchema = Joi.object({
    // Inhalt
    content: Joi.string()
        .max(280)
        .messages({
            "any.required": "CONTENT_REQUIRED",
            "string.max": "CONTENT_MAX_LENGTH"
        }),

    // Wichtigkeit
    important: Joi.boolean()
        .messages({
            "any.required": "IMPORTANT_REQUIRED",
        }),

    // Status
    done: Joi.boolean()
        .messages({
            "any.required": "DONE_REQUIRED",
        }),
});

export default todoListDataSchema;