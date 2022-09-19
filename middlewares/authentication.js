const jwt = require("jsonwebtoken")

const authUser = (req, res, next) => {
    let token = req.headers['x-access-token']
    try {
        let decoded = jwt.verify(token, process.env.PRIVATE_KEY)
        console.log(decoded)
        req.userId = decoded.id
        next()
    } catch (error) {
        res.json({
            error: "Invalid access token"
        })
    }

}
module.exports = authUser