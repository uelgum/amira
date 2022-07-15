import { Request, Response, Router } from "express";

// Intern
import isLoggedOut from "@api/middleware/http/isLoggedOut";
import { sendData, sendError } from "@utils/response";
import { login, register } from "@services/auth";

/**
    Auth-Router.
*/
const router = Router();

router.use(isLoggedOut);

/**
    POST /api/auth/login
    Meldet einen Nutzer an.
*/
router.post("/login", async (req: Request, res: Response) => {
    try {
        const token = await login(req.body);
        sendData(res, { token });
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    POST /api/auth/register
    Registriert ein neues Konto.
*/
router.post("/register", async (req: Request, res: Response) => {
    try {
        const recoveryCode = await register(req.body);
        sendData(res, { recoveryCode });
    } catch(error: any) {
        console.log(error);
        sendError(res, error);
    }
});

export default router;