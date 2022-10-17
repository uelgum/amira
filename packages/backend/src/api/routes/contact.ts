import { Request, Response, Router } from "express";

// Intern
import isLoggedIn from "@api/middleware/http/isLoggedIn";
import { sendData, sendError } from "@utils/response";
import {
    getPresenceStatus,
    acceptContactRequest,
    rejectContactRequest,
    removeContact,
    sendContactRequest,
    withdrawContactRequest
} from "@services/contact";

/**
    Contact-Router.
*/
const router = Router();

router.use(isLoggedIn);

/**
    POST /api/contact/presence/:userId
    Sendet eine Kontakt-Anfrage an einen Nutzer.
*/
router.get("/presence/:userId", async (req: Request, res: Response) => {
    try {
        const data = await getPresenceStatus(req);
        sendData(res, data);
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    POST /api/contact/request
    Sendet eine Kontakt-Anfrage an einen Nutzer.
*/
router.post("/request", async (req: Request, res: Response) => {
    try {
        await sendContactRequest(req);
        sendData(res);
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    POST /api/contact/withdraw
    Zieht eine Kontakt-Anfrage an einen Nutzer zurück.
*/
router.post("/withdraw", async (req: Request, res: Response) => {
    try {
        await withdrawContactRequest(req);
        sendData(res);
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    POST /api/contact/accept
    Akzeptiert eine Kontakt-Anfrage eines Nutzers.
*/
router.post("/accept", async (req: Request, res: Response) => {
    try {
        await acceptContactRequest(req);
        sendData(res);
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    POST /api/contact/accept
    Lehnt eine Kontakt-Anfrage eines Nutzers ab.
*/
router.post("/reject", async (req: Request, res: Response) => {
    try {
        await rejectContactRequest(req);
        sendData(res);
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    POST /api/contact/accept
    Entfernt einen bestehenden Kontakt mit einem Nutzer.
*/
router.post("/remove", async (req: Request, res: Response) => {
    try {
        await removeContact(req);
        sendData(res);
    } catch(error: any) {
        sendError(res, error);
    }
});

export default router;