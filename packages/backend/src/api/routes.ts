import { Response, Router } from "express";

// Intern
import AmiraError from "@structs/error";
import { sendError } from "@utils/response";

// Routen
import authRoutes from "@api/routes/auth";
import userRoutes from "@api/routes/user";
import avatarRoutes from "@api/routes/avatar";
import contactRoutes from "@api/routes/contact";
import noticationRoutes from "@api/routes/notification";
import appRouter from "@api/routes/apps";

/**
    API-Router.
*/
const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/avatar", avatarRoutes);
router.use("/contact", contactRoutes);
router.use("/notification", noticationRoutes);
router.use("/app", appRouter);

router.use((_, res: Response) => {
    sendError(res, new AmiraError(404, "NOT_FOUND"));
});

export default router;