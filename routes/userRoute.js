const router = require('express').Router()
const auth = require("../middlewares/authentication")
const UserController = require("../controllers/userController")

router.post("/auth", UserController.auth)         // Authorization route

router.post("/create", UserController.create)     // Create user route
router.get("/", auth, UserController.view)         // Get user info route
router.patch("/:id", auth, UserController.update)       // Update user route
router.delete("/:id", auth, UserController.delete)      // Delete user route

module.exports = router