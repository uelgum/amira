import { Router } from "express";

// Routen
import authRouter from "@routes/auth";

const router = Router();

router.use("/auth", authRouter);

export default router;