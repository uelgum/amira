import { Router, Request, Response } from "express";
import { sendData, sendError } from "@utils/response";

// Services
import { fetchNotes, updateNotes } from "@services/apps/notes";

/**
    Router für "Notes"-App.
*/
const router = Router();

// Notizen abrufen
router.get("/fetch", async (req: Request, res: Response) => {
    try {
        const notes = await fetchNotes(res.locals);
        sendData(res, { notes });
    } catch(error) {
        sendError(res, error);
    }
});

// Notizen aktualisieren
router.post("/update", async (req: Request, res: Response) => {
    try {
        await updateNotes(res.locals, req.body);
        sendData(res);
    } catch(error) {
        sendError(res, error);
    }
});

export default router;