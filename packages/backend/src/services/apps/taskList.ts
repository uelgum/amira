import User from "@models/user";
import TaskList, { Task } from "@models/apps/taskList";
import AmiraError from "@structs/amiraError";
import { Locals as Payload } from "express";

// Services
import { generateId } from "@services/id";
import { decrypt, encrypt } from "@services/crypto";

/**
    Ruft alle Aufgaben ab.
*/
const fetchTasks = async (payload: Payload) => {
    const userId = payload.id;
    const passwordKey = payload.key;

    const user = await User.findOne({ id: userId });
    const taskList = await TaskList.findOne({ userId }).lean();

    if(!taskList) {
        throw new AmiraError(400, "APP_ERROR", "TASKLIST_NOT_FOUND");
    }

    const userKey = decrypt(user.userKey, passwordKey);
    
    const tasks = taskList.tasks.map((task) => {
        return {
            id: task.id,
            content: decrypt(task.content, userKey),
            done: task.done,
            createdAt: task.createdAt
        };
    });

    return tasks;
};

/**
    Fügt eine neue Aufgabe hinzu.
*/
const addTask = async (payload: Payload, data: Record<string, any>) => {
    const userId = payload.id;
    const passwordKey = payload.key;

    const { content } = data;

    if(!content) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const user = await User.findOne({ id: userId });
    const taskListExists = await TaskList.exists({ userId });

    if(!taskListExists) {
        const taskList = new TaskList({
            id: generateId(),
            userId,
            tasks: []
        });

        await taskList.save();
    }

    const taskList = await TaskList.findOne({ userId });
    
    if(taskList.tasks.length === 10) {
        throw new AmiraError(400, "APP_ERROR", "TASKLIST_MAX_LENGTH");
    }

    const userKey = decrypt(user.userKey, passwordKey);

    const task: Task = {
        id: generateId(),
        content: encrypt(content, userKey) ,
        done: false,
        createdAt: Date.now()
    };

    taskList.tasks.push(task);

    await taskList.save();
};

/**
    Aktualisiert eine Aufgabe.
*/
const updateTask = async (payload: Payload, data: Record<string, any>) => {
    const userId = payload.id;
    const passwordKey = payload.key;

    const { id, content, done } = data;

    if(!id || !content && typeof done !== "boolean") {
        throw new AmiraError(400, "INVALID_DATA");
    }
    
    const user = await User.findOne({ id: userId });
    const taskList = await TaskList.findOne({ userId });

    if(!taskList) {
        throw new AmiraError(400, "APP_ERROR", "TASKLIST_NOT_FOUND");
    }

    const userKey = decrypt(user.userKey, passwordKey);

    const index = taskList.tasks.findIndex((task) => task.id === id);

    if(content) taskList.tasks[index].content = encrypt(content, userKey);
    if(done) taskList.tasks[index].done = done;

    await taskList.save();
};

/**
    Entfernt eine Aufgabe.
*/
const deleteTask = async (payload: Payload, data: Record<string, any>) => {
    const userId = payload.id;
    const { id } = data;

    if(!id) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const taskList = await TaskList.findOne({ userId });

    if(!taskList) {
        throw new AmiraError(400, "APP_ERROR", "TASKLIST_NOT_FOUND");
    }

    const index = taskList.tasks.findIndex((task) => task.id === id);

    if(index < 0) {
        throw new AmiraError(400, "APP_ERROR", "TASKLIST_INVALID_TASK_ID");
    }
    
    taskList.tasks.splice(index, 1);

    await taskList.save();
};

export {
    fetchTasks,
    addTask,
    updateTask,
    deleteTask
};