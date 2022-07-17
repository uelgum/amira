import { Request, Response, Router } from "express";

// Intern
import { sendData, sendError } from "@utils/response";
import isLoggedIn from "@api/middleware/http/isLoggedIn";
import {
    acceptContactRequest,
    rejectContactRequest,
    removeContact,
    sendContactRequest
} from "@services/contact";

/**
    Contact-Router.
*/
const router = Router();

router.use(isLoggedIn);

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