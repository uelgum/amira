import { Router } from "express";

// Intern
import AmiraError from "@structs/error";
import { sendError } from "@utils/response";

// Routen
import isLoggedIn from "@api/middleware/http/isLoggedIn";
import notesRouter from "@api/routes/apps/notes";
import taskRouter from "@api/routes/apps/task";
import dailiesRouter from "@api/routes/apps/dailies";

// Types
import type { Response } from "express";

/**
    App-Router.
*/
const router = Router();

router.use(isLoggedIn);

router.use("/notes", notesRouter);
router.use("/task", taskRouter);
router.use("/dailies", dailiesRouter);

router.use((_, res: Response) => {
    sendError(res, new AmiraError(404, "NOT_FOUND"));
});


export default router;