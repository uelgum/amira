import { Router } from "express";

// Routen
import authRouter from "@routes/auth";
import accountRouter from "@routes/account";

/**
    Hauptrouter der Amira API.
*/
const router = Router();

router.use("/auth", authRouter);
router.use("/account", accountRouter);

export default router;