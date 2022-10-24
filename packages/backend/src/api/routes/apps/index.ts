import { Router } from "express";

// Intern
import isLoggedIn from "@api/middleware/http/isLoggedIn";
import notesRouter from "@api/routes/apps/notes";
import taskRouter from "@api/routes/apps/task";
import dailiesRouter from "@api/routes/apps/dailies";

/**
    App-Router.
*/
const router = Router();

router.use(isLoggedIn);

router.use("/notes", notesRouter);
router.use("/task", taskRouter);
router.use("/dailies", dailiesRouter);

export default router;