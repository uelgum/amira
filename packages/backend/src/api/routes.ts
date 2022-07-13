import { Response, Router } from "express";

// Intern
import AmiraError from "@structs/error";
import { sendError } from "@utils/response";

// Routen
import authRoutes from "@api/routes/auth";

/**
    API-Router.
*/
const router = Router();

router.use("/auth", authRoutes);

router.use((_, res: Response) => {
    sendError(res, new AmiraError(404, "NOT_FOUND"));
});

export default router;