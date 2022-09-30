const taskModel = require("../models/taskModel")

String.prototype.clean = () => {
    return this.replace("<", "&lt;").replace(">", "&gt;")
}

class TaskController {

    static async create(req, res) {
        let res_ = {}
        const { title, description, deadline } = req.body
        const id = req.userId
        const date = new Date().toLocaleDateString("pt-br")
        try {
            const task = await new taskModel({
                userId: id,
                title: title.clean(),
                createDate: date.clean(),
                deadline: deadline.clean(),
                description: description.clean()
            }).save()

            if (task) {
                res_.success = true
                res_.task = task
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
            const userTasks = await taskModel.find({
                userId: id
            })
            if (userTasks) {
                res_.success = true
                res_.tasks = userTasks
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
            const task = await taskModel.deleteOne({
                _id: id,
                userId: userId
            })

            if (task) {
                res_.success = true
                res_.task = task
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
        const { title, description } = req.body

        try {
            const task = await taskModel.updateOne({
                _id: id,
                userId: userId
            },
                {
                    $set: {
                        title: title.clean(),
                        description: description.clean()
                    }
                })

            if (task.modifiedCount > 0) {
                res_.success = true
                res_.task = task
            } else res_.success = false
        } catch (error) {
            res_.success = false
            res_.error = error.message
        }

        res.json(res_)
    }

}
module.exports = TaskController
