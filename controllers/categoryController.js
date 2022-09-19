const categoryModel = require("../models/categoryModel")

class CategoryController {
    static async create(req, res) {
        let res_ = {}
        const { title } = req.body
        const id = req.userId
        try {
            const category = await new categoryModel({
                userId: id,
                title: title
            }).save()

            if (category) {
                res_.success = true
                res_.category = category
            } else {
                res_.success = false
            }
        } catch (error) {
            res_.success = false
            res_.error = error.message
        }

        res.json(res_)
    }

    static async view(req, res) {
        let res_ = {}
        const id = req.userId
        try {
            const categories = await categoryModel.find({
                userId: id
            })
            if (categories) {
                res_.success = true
                res_.categories = categories
            } else {
                res_.success = false
            }
        } catch (error) {
            res_.success = false
            res_.error = error.message

        }
        res.json(res_)
    }


    static async delete(req, res) {
        let res_ = {}
        const { id } = req.params
        const userId = req.userId

        try {
            const category = await categoryModel.deleteOne({
                _id: id,
                userId: userId
            })

            if (category) {
                res_.success = true
                res_.category = category
            } else {
                res_.success = false
            }
        } catch (error) {
            res_.success = false
            res_.error = error
        }

        res.json(res_)
    }

    static async update(req, res) {
        let res_ = {}
        const { id } = req.params
        const userId = req.userId
        const { title } = req.body

        try {
            const category = await categoryModel.updateOne({
                _id: id,
                userId: userId
            },
                {
                    $set: {
                        title: title
                    }
                })

            if (category.modifiedCount > 0) {
                res_.success = true
                res_.category = category
            } else res_.success = false
        } catch (error) {
            res_.success = false
            res_.error = error.message
        }

        res.json(res_)
    }

}
module.exports = CategoryController