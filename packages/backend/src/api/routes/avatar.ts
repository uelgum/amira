import { Router } from "express";

// Intern
import isLoggedIn from "@api/middleware/http/isLoggedIn";
import { sendData, sendError } from "@utils/response";
import { fetchAvatar, uploadAvatar } from "@services/avatar";

// Types
import type { Request, Response } from "express";

/**
    Avatar-Router.
*/
const router = Router();

/**
    GET /api/avatar/:userId
    Ruft den Avatar eines Nutzers ab.
*/
router.get("/:userId", async (req: Request, res: Response) => {
    try {
        const url = await fetchAvatar(req);
        res.redirect(url);
    } catch(error: any) {
        sendError(res, error);
    }
});

router.use(isLoggedIn);

/**
    POST /api/avatar
    Aktualisiert den Avatar eines Nutzers.
*/
router.post("/", async (req: Request, res: Response) => {
    try {
        await uploadAvatar(req);
        sendData(res);
    } catch(error: any) {
        sendError(res, error);
    }
});

export default router;