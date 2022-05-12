import { Router, Response } from "express";
import AmiraError from "@structs/amiraError";
import { sendError } from "@utils/response";

/**
    Router für Fehler.
*/
const router = Router();

// 404
router.use((_, res: Response) => {
    sendError(res, new AmiraError(404, "NOT_FOUND"));
});

export default router;