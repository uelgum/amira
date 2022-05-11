import { Router } from "express";

// Routen
import authRouter from "@routes/auth";
import accountRouter from "@routes/account";
import contactRouter from "@routes/contact";
import appRouter from "./apps";

const router = Router();

router.use("/auth", authRouter);
router.use("/account", accountRouter);
router.use("/contact", contactRouter);
router.use("/apps", appRouter);

export default router;