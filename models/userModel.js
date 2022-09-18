const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String
})

module.exports = mongoose.model("User", userSchema)
