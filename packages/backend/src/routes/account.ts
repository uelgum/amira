import { Router, Request, Response } from "express";
import { sendData, sendError } from "@utils/response";

// Middleware
import isLoggedIn from "@middleware/http/isLoggedIn";

// Services
import { verifyEmail } from "@services/account";

/**
    Router für Benutzerkonten.
*/
const router = Router();

router.use(isLoggedIn);

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