import { Router, Request, Response } from "express";
import { sendData, sendError } from "@utils/response";

// Services
import { verifyEmail } from "@services/account";

const router = Router();

// E-Mail-Verifizierung
router.post("/verify-email", async (req: Request, res: Response) => {
    try {
        await verifyEmail(req.body);
        sendData(res, { success: true });
    } catch(error) {
        sendError(res, error);
    }
});

export default router;