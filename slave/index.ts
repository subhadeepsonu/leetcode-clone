import express from "express"
const app = express()
import redis from "redis"
async function slave() {
    while (true) {
        const client = redis.createClient()
        await client.connect()
        const submissions = client.brPop("submissions", 0)
        console.log(submissions)
    }
}
slave()
app.listen(3000, () => {
    console.log("Server is running on port 3000")
}
)