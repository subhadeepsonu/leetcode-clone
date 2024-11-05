import { Router } from "express";
import { adminMiddleware } from "../middleware/admin.middleware";
export const testCaseRouter = Router();
testCaseRouter.post("/testcase", adminMiddleware);
testCaseRouter.get("/testcase", adminMiddleware);
testCaseRouter.put("/testcase", adminMiddleware);
testCaseRouter.delete("/testcase", adminMiddleware);