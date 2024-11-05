import { Router } from "express";
import { adminMiddleware } from "../middleware/admin.middleware";
import { userMiddleware } from "../middleware/user.middleware";
export const questionRouter = Router();
questionRouter.post("/question", adminMiddleware);
questionRouter.get("/question", userMiddleware);
questionRouter.get("/question/:id", userMiddleware);
questionRouter.put("/question", adminMiddleware);
questionRouter.delete("/question", adminMiddleware);
