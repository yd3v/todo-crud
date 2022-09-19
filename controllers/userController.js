const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")


class userController {

    static async auth(req, res) {
        let res_ = {}
        const { username, password } = req.body

        if (!username || !password) {
            res_.success = false
            res_.error = "Missing username / password"
        }
        else if (username.length < 5) {
            res_.success = false
            res_.error = "The 'username' field length must be >= 5"
        } else if (password.length < 8) {
            res_.success = false
            res_.error = "The 'password' field length must be >= 8"
        }

        else {

            let auth = await userModel.findOne({
                username: username,
                password: password
            })


            if (auth) {
                var token = jwt.sign({ id: auth._id }, process.env.PRIVATE_KEY, { expiresIn: "30min" })
                res_.success = true
                res_.token = token
                res_.userId = auth._id

            } else {
                res_.success = false
            }
        }

        res.json(res_)
    }

    static async create(req, res) {
        let res_ = {}
        const { username, password } = req.body

        try {
            const user = await new userModel({
                username: username,
                password: password
            }).save()

            if (user) {
                res_.success = true
                res_.user = user
            } else {
                res_.success = false
            }
        } catch (error) {
            res_.success = false
            if (error.code == 11000) res_.error = "User already exists"
        }

        res.json(res_)
    }

    static async view(req, res) {
        let res_ = {}
        const id = req.userId

        try {
            const user = await userModel.findById(id)
            if (user) {
                res_.success = true
                res_.user = user
            } else {
                res_.success = false
            }
        } catch (error) {
            res_.success = false
            res_.error = error
        }

        res.json(res_)
    }

    static async delete(req, res) {
        let res_ = {}
        const { id } = req.params

        try {
            const user = await userModel.deleteOne({
                _id: id
            })

            if (user) {
                res_.success = true
                res_.user = user
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
        const { username, password } = req.body

        try {
            const user = await userModel.updateOne({
                _id: id
            },
                {
                    $set: {
                        username: username,
                        password: password
                    }
                })

            if (user.modifiedCount > 0) {
                res_.success = true
                res_.user = user
            } else res_.success = false
        } catch (error) {
            res_.success = false
            if (error.code == 11000) res_.error = "User already exists"
        }

        res.json(res_)
    }
    static async listAll(req, res) {
        let res_ = {}
        let users = await userModel.find()

        if (users) {
            res_.success = true
            res_.users = users
        } else res_.success = false
        res.json(res_)
    }
}
module.exports = userController