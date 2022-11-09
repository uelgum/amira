import { Request, Response, Router } from "express";

// Intern
import { sendData, sendError } from "@utils/response";
import { addDaily, deleteDaily, getDailies } from "@services/apps/dailies";

/**
    Router für die Dailies-App.
*/
const router = Router();

/**
    GET /api/app/dailies/get
    Ruft alle Dailies eines Nutzers ab.
*/
router.get("/get", async (req: Request, res: Response) => {
    try {
        const data = await getDailies(req);
        sendData(res, data);
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    POST /api/app/dailies/add
    Ruft alle Dailies eines Nutzers ab.
*/
router.post("/add", async (req: Request, res: Response) => {
    try {
        const data = await addDaily(req);
        sendData(res, data);
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    POST /api/app/dailies/delete/:dailyId
    Löscht eine Daily eines Nutzers.
*/
router.post("/delete", async (req: Request, res: Response) => {
    try {
        await deleteDaily(req);
        sendData(res);
    } catch(error: any) {
        sendError(res, error);
    }
});

export default router;