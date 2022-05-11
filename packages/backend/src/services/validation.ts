import loginDataSchema from "@schemas/loginData";
import registerDataSchema from "@schemas/registerData";
import todoListDataSchema from "@schemas/todoListData";

const validateLoginData = (data: Record<string, any>) => {
    const { error } = loginDataSchema.validate(data, {
        presence: "required"
    });

    return {
        error: !!error,
        subcode: error?.details[0].message || null
    };
};

/**
    Validiert Registrierungs-Daten.
*/
const validateRegisterData = (data: Record<string, any>) => {
    const { error } = registerDataSchema.validate(data, {
        presence: "required"
    });

    return {
        error: !!error,
        subcode: error?.details[0].message || null
    };
};

/**
    Validiert Todo-Listen-Daten.
*/
const validateTodoListData = (data: Record<string, any>) => {
    const { error } = todoListDataSchema.validate(data, {
        presence: "required"
    });

    return {
        error: !!error,
        subcode: error?.details[0].message || null
    };
};

export {
    validateLoginData,
    validateRegisterData,
    validateTodoListData
};