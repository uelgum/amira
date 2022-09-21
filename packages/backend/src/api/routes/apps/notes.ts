import { Request, Response, Router } from "express";

// Intern
import { sendData, sendError } from "@utils/response";
import { getNotes, updateNotes } from "@services/apps/notes";

/**
    Router für die Notes-App.
*/
const router = Router();

/**
    GET /api/app/notes/get
    Ruft die Notizen eines Nutzers ab.
*/
router.get("/get", async (req: Request, res: Response) => {
    try {
        const data = await getNotes(req);
        sendData(res, data);
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    POST /api/app/notes/update
    Aktualisiert die Notizen eines Nutzers.
*/
router.post("/update", async (req: Request, res: Response) => {
    try {
        await updateNotes(req);
        sendData(res);
    } catch(error: any) {
        sendError(res, error);
    }
});

export default router;