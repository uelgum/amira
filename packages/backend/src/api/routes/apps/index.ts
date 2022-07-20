import { Router } from "express";

// Intern
import isLoggedIn from "@api/middleware/http/isLoggedIn";
import taskRouter from "@api/routes/apps/task";

/**
    App-Router.
*/
const router = Router();

router.use(isLoggedIn);

router.use("/task", taskRouter);

export default router;