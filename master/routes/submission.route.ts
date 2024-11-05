import { Router } from "express";
import { userMiddleware } from "../middleware/user.middleware";
export const submissionRouter = Router();
submissionRouter.post("/submission/:id", userMiddleware);
submissionRouter.get("/submission/:id", userMiddleware);