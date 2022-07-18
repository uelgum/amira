import { Request, Response, Router } from "express";

// Intern
import isLoggedIn from "@api/middleware/http/isLoggedIn";
import { sendData, sendError } from "@utils/response";
import { resetPassword, verifyEmail } from "@services/user";
import { sendPasswordResetEmail } from "@services/email";

/**
    User-Router.
*/
const router = Router();

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

/**
    POST /api/user/password-reset
    Setzt das Passwort zurück.
*/
router.post("/password-reset", async (req: Request, res: Response) => {
    try {
        const recoveryCode = await resetPassword(req.body);
        sendData(res, { recoveryCode });
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    POST /api/user/password-reset/request
    Schickt eine E-Mail zum Zurücksetzen des Passworts.
*/
router.post("/password-reset/request", async (req: Request, res: Response) => {
    try {
        await sendPasswordResetEmail(req);
        sendData(res);
    } catch(error: any) {
        sendError(res, error);
    }
});

router.use(isLoggedIn);

export default router;