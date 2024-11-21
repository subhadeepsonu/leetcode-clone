import express from "express"
import { userRouter } from "./routes/user.route"
import { adminRouter } from "./routes/admin.route"
import { questionRouter } from "./routes/question.route"
import { submissionRouter } from "./routes/submission.route"
import { testCaseRouter } from "./routes/testcase.route"
import { createClient } from "redis"
import cors from "cors"
const app = express()
app.use(express.json())
app.use(cors({
    origin: "*"
}))
const redisClient = createClient()
redisClient.connect()
app.use("/api/v1", userRouter)
app.use("/api/v1", adminRouter)
app.use("/api/v1", questionRouter)
app.use("/api/v1", submissionRouter)
app.use("/api/v1", testCaseRouter)
app.listen(3000, () => {
    console.log("Server is running on port 3000")
}
)
export { redisClient }