import { Router, Response } from "express";
import { sendError } from "@utils/response";
import AmiraError from "@structs/error";

// Routen
import authRoutes from "./auth";

const router = Router();

router.use("/auth", authRoutes);

router.use((_, res: Response) => {
    sendError(res, new AmiraError("NOT_FOUND", 404));
});

export default router;