import { Router } from "express";

// Intern
import isLoggedIn from "@api/middleware/http/isLoggedIn";
import { sendData, sendError } from "@utils/response";
import { sendPasswordResetEmail } from "@services/email";
import {
    addPublicKey,
    getPublicKey,
    blockUser,
    unblockUser,
    resetPassword, 
    verifyEmail,
    getUserInfo,
} from "@services/user";
import { getContactStatus } from "@services/contact";

// Types
import type { Request, Response } from "express";

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

/**
    POST /api/user/pubkey/:userId
    Fügt den Public Key eines Nutzers hinzu.
*/
router.post("/pubkey/:userId", async (req: Request, res: Response) => {
    try {
        await addPublicKey(req);
        sendData(res);
    } catch(error: any) {
        sendError(res, error);
    }
});

router.use(isLoggedIn);

/**
    GET /api/user/:userId
    Ruft Informationen über einen Nutzer ab.
*/
router.get("/:userId", async (req: Request, res: Response) => {
    try {
        const userInfo = await getUserInfo(req);
        const contactStatus = await getContactStatus(req, req.params.userId);

        const data = {
            ...userInfo,
            ...contactStatus
        };

        sendData(res, data);
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    GET /api/user/pubkey/:userId
    Ruft den Public Key eines Nutzers ab.
*/
router.get("/pubkey/:userId", async (req: Request, res: Response) => {
    try {
        const data = await getPublicKey(req);
        sendData(res, data);
    } catch(error: any) {
        sendError(res, error);
    }
});

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