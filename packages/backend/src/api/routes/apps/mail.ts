import { Request, Response, Router } from "express";

// Intern
import { sendData, sendError } from "@utils/response";
import {
    getAllMails,
    getMail,
    sendMail
} from "@services/apps/mail";

/**
    Router für die Task-App.
*/
const router = Router();

/**
    GET /api/app/mail/get
    Ruft alle Mails eines Nutzers ab.
*/
router.get("/get", async (req: Request, res: Response) => {
    try {
        const mails = await getAllMails(req);
        sendData(res, { mails });
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    GET /api/app/mail/get/:mailId
    Ruft eine bestimmte Mail eines Nutzers ab.
*/
router.get("/get/:mailId", async (req: Request, res: Response) => {
    try {
        const mail = await getMail(req);
        sendData(res, { mail });
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    POST /api/app/mail/send
    Verschickt eine Mail an einen Nutzer.
*/
router.post("/send", async (req: Request, res: Response) => {
    try {
        await sendMail(req);
        sendData(res);
    } catch(error: any) {
        sendError(res, error);
    }
});

export default router;