import { Router, Request, Response } from "express";
import isLoggedOut from "@middleware/http/isLoggedOut";
import { login, register } from "@services/auth";
import { sendData, sendError } from "@utils/response";

const router = Router();

router.use(isLoggedOut);

// Login
router.post("/login", async (req: Request, res: Response) => {
    try {
        const token = await login(req.body);
        sendData(res, { token });
    } catch(error) {
        sendError(res, error);
    }
});

// Register
router.post("/register", async (req: Request, res: Response) => {
    try {
        await register(req.body);
        sendData(res, { success: true });
    } catch(error) {
        sendError(res, error);
    }
});

export default router;