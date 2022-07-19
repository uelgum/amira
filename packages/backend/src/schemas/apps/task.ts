import Joi from "joi";

/**
    Schema für Daten der Task-App.
*/
const taskSchema = Joi.object({
    // ID des Tasks
    taskId: Joi.string(),

    // Inhalt
    content: Joi.string()
        .min(1)
        .max(280),

    // Ob der Task abgeschlossen ist
    done: Joi.boolean()
});

export default taskSchema;