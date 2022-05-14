import { Router } from "express";

// Routen
import authRouter from "@routes/auth";
import accountRouter from "@routes/account";
import contactRouter from "@routes/contact";
import appsRouter from "@routes/apps";

/**
    Hauptrouter der Amira API.
*/
const router = Router();

router.use("/auth", authRouter);
router.use("/account", accountRouter);
router.use("/contact", contactRouter);
router.use("/apps", appsRouter);

export default router;