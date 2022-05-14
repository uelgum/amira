import { Router, Request, Response } from "express";
import { sendData, sendError } from "@utils/response";

// Middleware
import isLoggedIn from "@middleware/http/isLoggedIn";

// Services
import { verifyEmail } from "@services/account";
import { fetchContacts } from "@services/contact";
import { fetchNotifications } from "@services/notification";

/**
    Router für Benutzerkonten.
*/
const router = Router();

router.use(isLoggedIn);

// Abrufen der Kontakte
router.get("/contacts", async (req: Request, res: Response) => {
    try {
        const contacts = await fetchContacts(res.locals.id);
        sendData(res, { contacts });
    } catch(error) {
        sendError(res, error);
    }
});

// Abrufen der Benachrichtungen
router.get("/notifications", async (req: Request, res: Response) => {
    try {
        const notifications = await fetchNotifications(res.locals.id);
        sendData(res, { notifications });
    } catch(error) {
        sendError(res, error);
    }
});

// Bestätigung der E-Mail
router.post("/verify-email", async (req: Request, res: Response) => {
    try {
        await verifyEmail(req.body);
        sendData(res);
    } catch(error) {
        sendError(res, error);
    }
});

export default router;