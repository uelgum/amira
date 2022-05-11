import { Payload } from "jwt-promisify";
import TodoList from "@models/todoList";
import User from "@models/user";
import AmiraError from "@structs/amiraError";

// Services
import { generateId } from "@services/id";
import { encrypt, decrypt } from "@services/crypto";
import { validateTodoListData } from "@services/validation";

/**
    Fügt eine neue Aufgabe zur Todo-Liste hinzu.
*/
const addTask = async (payload: Payload, data: Record<string, any>) => {
    const { error, subcode } = validateTodoListData(data);

    if(error) {
        throw new AmiraError(400, "APP_ERROR", subcode);
    }

    const userId = payload.id;
    const passwordKey = payload.key;

    const todoListExists = await TodoList.exists({ userId });

    if(!todoListExists) {
        const todoList = new TodoList({
            id: generateId(),
            userId,
            tasks: []
        });

        await todoList.save();
    }

    const user = await User.findOne({ id: userId });
    const todoList = await TodoList.findOne({ userId });

    // User-Schlüssel entschlüsseln mit Passwort-Key aus Payload
    const userKey = decrypt(user.key, passwordKey);

    const task = {
        id: generateId(),
        content: encrypt(data.content, userKey),
        important: false,
        done: false,
        createdAt: Date.now()
    };

    todoList.tasks.unshift(task);
    await todoList.save();
};

/**
    Ruft alle Aufgaben der Todo-Liste ab.
*/
const getTasks = async (payload: Payload) => {
    const userId = payload.id;
    const passwordKey = payload.key;

    const user = await User.findOne({ id: userId });
    const todoList = await TodoList.findOne({ userId });

    if(!todoList) {
        throw new AmiraError(400, "APP_ERROR", "INVALID_DATA");
    }

    // User-Schlüssel entschlüsseln mit Passwort-Key aus Payload
    const userKey = decrypt(user.key, passwordKey);

    const tasks = todoList.tasks.map((task) => {
        return {
            id: task.id,
            content: decrypt(task.content, userKey),
            important: task.important,
            done: task.done
        };
    });

    return tasks;
};

export {
    addTask,
    getTasks
};