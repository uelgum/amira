import { Router } from "express";

// Intern
import isLoggedIn from "@api/middleware/http/isLoggedIn";
import { sendData, sendError } from "@utils/response";
import { deleteNotification, getNotifications } from "@services/notification";

// Types
import type { Request, Response } from "express";

/**
    Notifications-Router.
*/
const router = Router();

router.use(isLoggedIn);

/**
    GET /api/notifications
    Ruft alle Benachrichtigungen eines Nutzers ab.
*/
router.get("/", async (req: Request, res: Response) => {
    try {
        const data = await getNotifications(req);
        sendData(res, data);
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    POST /api/notifications/delete/:notificationId
    Löscht eine Benachrichtigung eines Nutzers.
*/
router.post("/delete/:notificationId", async (req: Request, res: Response) => {
    try {
        await deleteNotification(req);
        sendData(res);
    } catch(error: any) {
        sendError(res, error);
    }
});

export default router;