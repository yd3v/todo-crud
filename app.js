const express = require("express");
const mongoose = require("mongoose")

const config = require("./config.json");
const taskRouter = require("./routes/taskRoute")
const userRouter = require("./routes/userRoute")
const categoryRouter = require("./routes/categoryRoute")

async function main() {
    try {
        await mongoose.connect(config.db.uri)
    } catch (error) {
        return console.log(error)
    }

    const app = express();
    app.use(express.urlencoded());

    app.use("/user", userRouter)
    app.use("/tasks", taskRouter)
    app.use("/category", categoryRouter)

    app.listen(config.port, async () => {
        console.log(`Listening ${config.port}`)
    })
}
main().catch(err => console.log(err))