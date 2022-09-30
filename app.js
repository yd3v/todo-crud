
const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
const multer = require("multer")
require('dotenv').config()
const taskRouter = require("./routes/taskRoute")
const userRouter = require("./routes/userRoute")
const categoryRouter = require("./routes/categoryRoute")

const PORT = process.env.PORT

async function main() {
    try {
        await mongoose.connect(process.env.DB_URI)
    } catch (error) {
        return console.log(error)
    }

    const app = express();
    app.use(express.urlencoded());
    app.use(cors())
    app.use(multer().array())
    app.use("/", express.static(__dirname + "/todo-list"))

    app.use("/api/user", userRouter)
    app.use("/api/tasks", taskRouter)
    app.use("/api/category", categoryRouter)

    app.listen(PORT, () => {
        console.log(`Listening ${PORT}`)
    })
}
main().catch(err => console.log(err))
