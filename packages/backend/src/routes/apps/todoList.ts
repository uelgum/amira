import { Router, Request, Response } from "express";
import { sendData, sendError } from "@utils/response";

// Services
import {
    getTasks,
    addTask,
    updateTask,
    deleteTask
} from "@services/apps/todoList";

const router = Router();

// Aufgaben abrufen
router.get("/get", async (req: Request, res: Response) => {
    try {
        const tasks = await getTasks(res.locals);
        sendData(res, { tasks });
    } catch(error) {
        sendError(res, error);
    }
});

// Aufgabe hinzufügen
router.post("/add", async (req: Request, res: Response) => {
    try {
        await addTask(res.locals, req.body);
        sendData(res, { sucess: true });
    } catch(error) {
        sendError(res, error);
    }
});

// Aufgabe aktualisieren
router.post("/update", async (req: Request, res: Response) => {
    try {
        await updateTask(res.locals, req.body);
        sendData(res, { sucess: true });
    } catch(error) {
        sendError(res, error);
    }
});

// Aufgabe entfernen
router.post("/delete", async (req: Request, res: Response) => {
    try {
        await deleteTask(res.locals, req.body);
        sendData(res, { sucess: true });
    } catch(error) {
        sendError(res, error);
    }
});

export default router;