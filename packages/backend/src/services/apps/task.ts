import AmiraError from "@structs/error";
import Task from "@models/apps/task";
import User from "@models/user";
import { generateId } from "@services/id";
import { decrypt, encrypt } from "@services/crypto";
import { validateTaskData } from "@services/validator";

// Types
import type { Request } from "express";

/**
    Maximale Anzahl der Tasks.
*/
const MAX_TASKS = 10;

/**
    Erstellt einen neuen Task.
*/
const addTask = async (req: Request) => {
    const userId = req.user.id;
    const passwordKey = req.user.key;

    const { content } = req.body;

    if(!content || content.length > 280) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const user = await User.findOne({
        where: {
            id: userId
        }
    });

    if(!user) {
        throw new AmiraError(404, "USER_NOT_FOUND");
    }

    const taskCount = await Task.count({
        where: {
            userId
        }
    });

    if(taskCount === MAX_TASKS) {
        throw new AmiraError(400, "TASK_LIMIT_EXCEEDED");
    }

    const userKey = decrypt(user.userKey, passwordKey);

    if(userKey.length === 0) {
        throw new AmiraError(400, "INVALID_USER_KEY");
    }

    const encryptedContent = encrypt(content, userKey);

    const task = await Task.create({
        id: generateId(),
        userId,
        content: encryptedContent,
        done: false,
        createdAt: Date.now()
    });

    await task.save();

    return task.id;
};

/**
    Gibt einen Task eines Nutzers nach ID zurück.
*/
const getTask = async (req: Request) => {
    const userId = req.user.id;
    const passwordKey = req.user.key;

    const { taskId } = req.params;

    if(!taskId) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const user = await User.findOne({
        where: {
            id: userId
        }
    });

    if(!user) {
        throw new AmiraError(404, "USER_NOT_FOUND");
    }

    const userKey = decrypt(user.userKey, passwordKey);

    if(userKey.length === 0) {
        throw new AmiraError(400, "INVALID_USER_KEY");
    }

    const task = await Task.findOne({
        where: {
            id: taskId
        }
    });

    if(!task) {
        throw new AmiraError(404, "TASK_NOT_FOUND");
    }

    const decryptedContent = decrypt(task.content, userKey);

    return {
        id: task.id,
        content: decryptedContent,
        done: task.done,
        createdAt: task.createdAt
    };
};

/**
    Gibt alle Tasks eines Nutzers zurück.
*/
const getAllTasks = async (req: Request) => {
    const userId = req.user.id;
    const passwordKey = req.user.key;

    const user = await User.findOne({
        where: {
            id: userId
        }
    });

    if(!user) {
        throw new AmiraError(404, "USER_NOT_FOUND");
    }

    const userKey = decrypt(user.userKey, passwordKey);

    if(userKey.length === 0) {
        throw new AmiraError(400, "INVALID_USER_KEY");
    }

    const tasks = await Task.findAll({
        where: {
            userId
        }
    });

    const decryptedTasks = tasks.map((task) => {
        return {
            id: task.id,
            content: decrypt(task.content, userKey),
            done: task.done,
            createdAt: task.createdAt
        };
    });

    return decryptedTasks;
};

/**
    Aktualisiert einen Task eines Nutzers.
*/
const updateTask = async (req: Request) => {
    const userId = req.user.id;
    const passwordKey = req.user.key;

    const { taskId } = req.params;

    if(!taskId) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const isValid = validateTaskData(req.body);

    if(!isValid) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const { content, done } = req.body;

    const user = await User.findOne({
        where: {
            id: userId
        }
    });

    if(!user) {
        throw new AmiraError(404, "USER_NOT_FOUND");
    }

    const userKey = decrypt(user.userKey, passwordKey);

    if(userKey.length === 0) {
        throw new AmiraError(400, "INVALID_USER_KEY");
    }

    const task = await Task.findOne({
        where: {
            id: taskId,
            userId
        }
    });

    if(!task) {
        throw new AmiraError(404, "TASK_NOT_FOUND");
    }

    task.content = encrypt(content, userKey);
    task.done = done;

    await task.save();
};

/**
    Entfernt einen Task eines Nutzers.
*/
const deleteTask = async (req: Request) => {
    const userId = req.user.id;
    const { taskId } = req.params;

    if(!taskId) {
        throw new AmiraError(400, "INVALID_DATA");
    }

    const task = await Task.findOne({
        where: {
            id: taskId,
            userId
        }
    });

    if(!task) {
        throw new AmiraError(404, "TASK_NOT_FOUND");
    }

    await task.destroy();
};

/**
    Entfernt alle Tasks eines Nutzers.
*/
const deleteAllTasks = async (req: Request) => {
    const userId = req.user.id;

    await Task.destroy({
        where: {
            userId
        }
    });
};

export {
    addTask,
    getTask,
    getAllTasks,
    updateTask,
    deleteTask,
    deleteAllTasks
};