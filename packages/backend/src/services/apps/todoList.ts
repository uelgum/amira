import TodoList from "@models/todoList";
import User from "@models/user";
import AmiraError from "@structs/amiraError";

// Services
import { generateId } from "@services/id";
import { encrypt } from "@services/crypto";
import { validateTodoListData } from "@services/validation";

/**
    Fügt eine neue Aufgabe zur Todo-Liste hinzu.
*/
const addTask = async (userId: string, data: Record<string, any>) => {
    const { error, subcode } = validateTodoListData(data);

    if(error) {
        throw new AmiraError(400, "APP_ERROR", subcode);
    }

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

    const task = {
        id: generateId(),
        content: encrypt(data.content, user.key),
        important: false,
        done: false,
        createdAt: Date.now()
    };

    todoList.tasks.unshift(task);
    await todoList.save();
};

export {
    addTask
};