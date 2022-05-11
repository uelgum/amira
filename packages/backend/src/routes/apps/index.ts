import { Router } from "express";
import isLoggedIn from "@middleware/http/isLoggedIn";

// Routen
import todoListRouter from "./todoList";

const router = Router();

router.use(isLoggedIn);

router.use("/todo", todoListRouter);

export default router;