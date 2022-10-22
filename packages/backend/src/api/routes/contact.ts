import { Request, Response, Router } from "express";

// Intern
import isLoggedIn from "@api/middleware/http/isLoggedIn";
import { sendData, sendError } from "@utils/response";
import {
    getContacts,
    getContactStatus,
    sendContactRequest,
    withdrawContactRequest,
    acceptContactRequest,
    removeContact
} from "@services/contact";

/**
    Contact-Router.
*/
const router = Router();

router.use(isLoggedIn);

/**
    GET /api/contacts
    Ruft alle Kontakte eines Nutzers ab.
*/
router.get("/", async (req: Request, res: Response) => {
    try {
        const data = await getContacts(req);
        sendData(res, data);
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    GET /api/contacts/:contactId
    Ruft den Kontakt-Status zwischen zwei Nutzern ab.
*/
router.get("/:contactId", async (req: Request, res: Response) => {
    try {
        const data = await getContactStatus(req);
        sendData(res, data);
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    POST /api/contacts/send
    Schickt eine Kontakt-Anfrage an einen Nutzer.
*/
router.post("/send", async (req: Request, res: Response) => {
    try {
        await sendContactRequest(req);
        sendData(res);
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    POST /api/contacts/withdraw
    Schickt eine Kontakt-Anfrage an einen Nutzer.
*/
router.post("/withdraw", async (req: Request, res: Response) => {
    try {
        await withdrawContactRequest(req);
        sendData(res);
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    POST /api/contacts/accept
    Bestätigt eine Kontakt-Anfrage eines anderen Nutzers.
*/
router.post("/accept", async (req: Request, res: Response) => {
    try {
        await acceptContactRequest(req);
        sendData(res);
    } catch(error: any) {
        sendError(res, error);
    }
});

/**
    POST /api/contacts/remove/:contactId
    Entfernt einen bestehenden Kontakt.
*/
router.post("/remove/:contactId", async (req: Request, res: Response) => {
    try {
        await removeContact(req);
        sendData(res);
    } catch(error: any) {
        sendError(res, error);
    }
});

export default router;