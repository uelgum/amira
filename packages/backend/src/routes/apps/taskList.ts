import { Router, Request, Response } from "express";
import { sendData, sendError } from "@utils/response";

// Services
import {
    fetchTasks,
    addTask,
    updateTask,
    deleteTask
} from "@services/apps/taskList";

/**
    Router für "Tasks"-App.
*/
const router = Router();

// Aufgaben abrufen
router.get("/fetch", async (req: Request, res: Response) => {
    try {
        const tasks = await fetchTasks(res.locals);
        sendData(res, { tasks });
    } catch(error) {
        sendError(res, error);
    }
});

// Aufgabe hinzufügen
router.post("/add", async (req: Request, res: Response) => {
    try {
        await addTask(res.locals, req.body);
        sendData(res);
    } catch(error) {
        sendError(res, error);
    }
});

// Aufgabe aktualisieren
router.post("/update", async (req: Request, res: Response) => {
    try {
        await updateTask(res.locals, req.body);
        sendData(res);
    } catch(error) {
        sendError(res, error);
    }
});

// Aufgabe entfernen
router.post("/delete", async (req: Request, res: Response) => {
    try {
        await deleteTask(res.locals, req.body);
        sendData(res);
    } catch(error) {
        sendError(res, error);
    }
});

export default router;