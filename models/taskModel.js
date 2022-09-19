const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    createDate: String,
    deadline: String,
    category: String,
    userId: String
})

module.exports = mongoose.model("Task", taskSchema)
