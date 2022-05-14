import { Router } from "express";

// Middleware
import isLoggedIn from "@middleware/http/isLoggedIn";

// Routen
import notesRouter from "@routes/apps/notes";

/**
    Router für Apps.
*/
const router = Router();

router.use(isLoggedIn);

router.use("/notes", notesRouter);

export default router;