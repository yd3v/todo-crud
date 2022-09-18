const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    title: {
        type: String
    },
    userId: {
        type: String
    }
})

module.exports = mongoose.model("Category", categorySchema)
