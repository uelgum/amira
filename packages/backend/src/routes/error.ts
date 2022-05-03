import { Router, Response } from "express";
import { sendError } from "@utils/response";
import AmiraError from "@structs/amiraError";

const router = Router();

// 404
router.use((_, res: Response) => {
    sendError(res, new AmiraError(404, "NOT_FOUND"));
});

export default router;