import { Router, Request, Response } from "express";
import isLoggedIn from "@middleware/http/isLoggedIn";
import { sendData, sendError } from "@utils/response";

// Services
import { acceptContactRequest, sendContactRequest, withdrawContactRequest } from "@services/contact";

const router = Router();

router.use(isLoggedIn);

// Kontakt-Anfrage schicken
router.post("/send-request", async (req: Request, res: Response) => {
    try {
        await sendContactRequest(res.locals.id, req.body.recipientId);
        sendData(res, { success: true });
    } catch(error) {
        sendError(res, error);
    }
});

// Kontakt-Anfrage annehmen
router.post("/accept-request", async (req: Request, res: Response) => {
    try {
        await acceptContactRequest(res.locals.id, req.body.senderId);
        sendData(res, { success: true });
    } catch(error) {
        sendError(res, error);
    }
});

// Kontakt-Anfrage zurückziehen 
router.post("/withdraw-request", async (req: Request, res: Response) => {
    try {
        await withdrawContactRequest(res.locals.id, req.body.recipientId);
        sendData(res, { success: true });
    } catch(error) {
        sendError(res, error);
    }
});

export default router;