import { Router, Request, Response } from "express";
import { sendData, sendError } from "@utils/response";

// Middleware
import isLoggedIn from "@middleware/http/isLoggedIn";

// Services
import {
    sendContactRequest,
    withdrawContactRequest,
    acceptContactRequest,
    declineContactRequest,
    deleteContact
} from "@services/contact";

/**
    Router für Kontakte.
*/
const router = Router();

router.use(isLoggedIn);

// Kontakt-Anfrage verschicken
router.post("/request", async (req: Request, res: Response) => {
    try {
        await sendContactRequest(res.locals, req.body);
        sendData(res);
    } catch(error) {
        sendError(res, error);
    }
});

// Kontakt-Anfrage zurückziehen
router.post("/withdraw", async (req: Request, res: Response) => {
    try {
        await withdrawContactRequest(res.locals, req.body);
        sendData(res);
    } catch(error) {
        sendError(res, error);
    }
});

// Kontakt-Anfrage annehmen
router.post("/accept", async (req: Request, res: Response) => {
    try {
        await acceptContactRequest(res.locals, req.body);
        sendData(res);
    } catch(error) {
        sendError(res, error);
    }
});

// Kontakt-Anfrage ablehnen
router.post("/decline", async (req: Request, res: Response) => {
    try {
        await declineContactRequest(res.locals, req.body);
        sendData(res);
    } catch(error) {
        sendError(res, error);
    }
});

// Kontakt entfernen
router.post("/delete", async (req: Request, res: Response) => {
    try {
        await deleteContact(res.locals, req.body);
        sendData(res);
    } catch(error) {
        sendError(res, error);
    }
});

export default router;