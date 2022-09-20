const express = require("express");
const mongoose = require("mongoose")
require('dotenv').config()
const taskRouter = require("./routes/taskRoute")
const userRouter = require("./routes/userRoute")
const categoryRouter = require("./routes/categoryRoute")

const PORT = process.env.PORT || 8080;
async function main() {
    try {
        await mongoose.connect(process.env.DB_URI)
    } catch (error) {
        return console.log(error)
    }

    const app = express();
    app.use(express.urlencoded());

    app.use("/user", userRouter)
    app.use("/tasks", taskRouter)
    app.use("/category", categoryRouter)

    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Listening ${PORT}`)
    })
}
main().catch(err => console.log(err))
