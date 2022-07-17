import { Response, Router } from "express";

// Intern
import AmiraError from "@structs/error";
import { sendError } from "@utils/response";

// Routen
import authRoutes from "@api/routes/auth";
import userRoutes from "@api/routes/user";
import contactRoutes from "@api/routes/contact";

/**
    API-Router.
*/
const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/contact", contactRoutes);

router.use((_, res: Response) => {
    sendError(res, new AmiraError(404, "NOT_FOUND"));
});

export default router;