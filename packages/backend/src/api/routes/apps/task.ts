import { Request, Response, Router } from "express";

// Intern
import { sendData, sendError } from "@utils/response";
import {
    createTask,
    deleteAllTasks,
    deleteTask,
    getAllTasks,
    getTask,
    updateTask
} from "@services/apps/task";

/**
    Router für die Task-App.
*/
const router = Router();

/**
    GET /api/app/task/get
    Gibt alle Tasks eines Nutzers zurück.
*/
router.get("/get", async (req: Request, res: Response) => {
    try {
        const tasks = await getAllTasks(req);
        sendData(res, { tasks });
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    GET /api/app/task/get/:taskId
    Gibt einen Task eines Nutzers nach ID zurück.
*/
router.get("/get/:taskId", async (req: Request, res: Response) => {
    try {
        const task = await getTask(req);
        sendData(res, { task });
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    POST /api/app/task/add
    Erstellt einen neuen Task.
*/
router.post("/add", async (req: Request, res: Response) => {
    try {
        const taskId = await createTask(req);
        sendData(res, { taskId });
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    POST /api/app/task/update/:taskId
    Aktualisiert einen Task eines Nutzers.
*/
router.post("/update/:taskId", async (req: Request, res: Response) => {
    try {
        await updateTask(req);
        sendData(res);
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    POST /api/app/task/delete/:taskId
    Entfernt einen Task eines Nutzers.
*/
router.post("/delete/:taskId", async (req: Request, res: Response) => {
    try {
        await deleteTask(req);
        sendData(res);
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    POST /api/app/task/delete-all
    Entfernt einen Task eines Nutzers.
*/
router.post("/delete-all", async (req: Request, res: Response) => {
    try {
        await deleteAllTasks(req);
        sendData(res);
    } catch(error: any) {
        sendError(res, error);
    }
});

export default router;