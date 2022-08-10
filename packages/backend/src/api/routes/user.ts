import { Request, Response, Router } from "express";

// Intern
import isLoggedIn from "@api/middleware/http/isLoggedIn";
import { sendData, sendError } from "@utils/response";
import { blockUser, resetPassword, unblockUser, verifyEmail } from "@services/user";
import { sendPasswordResetEmail } from "@services/email";

/**
    User-Router.
*/
const router = Router();

/**
    POST /api/user/verify
    Verifiziert die E-Mail-Adresse eines Nutzers.
*/
router.post("/verify/:actionId", async (req: Request, res: Response) => {
    try {
        await verifyEmail(req);
        sendData(res);
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    POST /api/user/password/reset
    Setzt das Passwort zurück.
*/
router.post("/password/reset", async (req: Request, res: Response) => {
    try {
        const recoveryCode = await resetPassword(req);
        sendData(res, { recoveryCode });
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    POST /api/user/password/request-reset
    Schickt eine E-Mail zum Zurücksetzen des Passworts.
*/
router.post("/password/request-reset", async (req: Request, res: Response) => {
    try {
        await sendPasswordResetEmail(req);
        sendData(res);
    } catch(error: any) {
        sendError(res, error);
    }
});

router.use(isLoggedIn);

/**
    POST /api/user/block/:blockedUserId
    Blockiert einen anderen Nutzer.
*/
router.post("/block/:blockedUserId", async (req: Request, res: Response) => {
    try {
        await blockUser(req);
        sendData(res);
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    POST /api/user/unblock/:blockedUserId
    Entblockt einen anderen Nutzer.
*/
router.post("/unblock/:blockedUserId", async (req: Request, res: Response) => {
    try {
        await unblockUser(req);
        sendData(res);
    } catch(error: any) {
        sendError(res, error);
    }
});

export default router;