import { Request, Response, Router } from "express";

// Intern
import { sendData, sendError } from "@utils/response";
import isLoggedIn from "@api/middleware/http/isLoggedIn";
import { verifyEmail } from "@services/user";

/**
    User-Router.
*/
const router = Router();

router.use(isLoggedIn);

/**
    POST /api/user/verify
    Verifiziert die E-Mail-Adresse eines Nutzers.
*/
router.post("/verify", async (req: Request, res: Response) => {
    try {
        await verifyEmail(req.body);
        sendData(res);
    } catch(error: any) {
        sendError(res, error);
    }
});

export default router;