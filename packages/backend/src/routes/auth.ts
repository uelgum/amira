import { Router, Request, Response } from "express";
import { sendData, sendError } from "@utils/response";

// Middleware
import isLoggedOut from "@middleware/http/isLoggedOut";

// Services
import { login, register } from "@services/auth";

/**
    Auth-Router.
*/
const router = Router();

router.use(isLoggedOut);

// Login
router.post("/login", async (req: Request, res: Response) => {
    try {
        const data = await login(req.body);
        sendData(res, data);
    } catch(error) {
        sendError(res, error);
    }
});

// Registrierung
router.post("/register", async (req: Request, res: Response) => {
    try {
        const recoveryCode = await register(req.body);
        sendData(res, { recoveryCode });
    } catch(error) {
        sendError(res, error);
    }
});

export default router;