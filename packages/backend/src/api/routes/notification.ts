import { Request, Response, Router } from "express";

import isLoggedIn from "@api/middleware/http/isLoggedIn";
import { sendData, sendError } from "@utils/response";
import { deleteNotification, getNotifications } from "@services/notification";

/**
    Notification-Router.
*/
const router = Router();

router.use(isLoggedIn);

/**
    GET /api/notification/get
    Ruft alle Benachrichtigungen ab.
*/
router.get("/get", async (req: Request, res: Response) => {
    try {
        const data = await getNotifications(req.user.id);
        sendData(res, data);
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    POST /api/notification/delete/:id
    Ruft alle Benachrichtigungen ab.
*/
router.get("/get", async (req: Request, res: Response) => {
    try {
        await deleteNotification(req);
        sendData(res);
    } catch(error: any) {
        sendError(res, error);
    }
});

export default router;