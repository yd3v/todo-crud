const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        min: 5,
        max: 30
    },
    password: {
        type: String,
        min: 8,
        max: 30
    }
})

module.exports = mongoose.model("User", userSchema)
