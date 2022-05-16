import { Router } from "express";

// Middleware
import isLoggedIn from "@middleware/http/isLoggedIn";

// Routen
import notesRouter from "@routes/apps/notes";
import taskListRouter from "@routes/apps/taskList";

/**
    Router für Apps.
*/
const router = Router();

router.use(isLoggedIn);

router.use("/notes", notesRouter);
router.use("/tasks", taskListRouter);

export default router;