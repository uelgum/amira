import { Request, Response, Router } from "express";
import { sendData, sendError } from "@utils/response";
import isLoggedOut from "@middleware/http/isLoggedOut";

// Services
import { login, register } from "@services/auth";

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
        const recoveryCode = await register(req.body);
        sendData(res, { recoveryCode });
    } catch(error) {
        sendError(res, error);
    }
});

export default router;