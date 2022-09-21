import { Router } from "express";

// Intern
import isLoggedIn from "@api/middleware/http/isLoggedIn";
import mailRouter from "@api/routes/apps/mail";
import notesRouter from "@api/routes/apps/notes";
import taskRouter from "@api/routes/apps/task";

/**
    App-Router.
*/
const router = Router();

router.use(isLoggedIn);

router.use("/mail", mailRouter);
router.use("/notes", notesRouter);
router.use("/task", taskRouter);

export default router;