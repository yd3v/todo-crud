const router = require('express').Router()
const auth = require("../middlewares/authentication")
const userController = require("../controllers/userController")

router.post("/auth", userController.auth)         // Authorization route

router.post("/create", userController.create)     // Create user route
router.get("/", auth, userController.view)         // Get user info route
router.patch("/:id", auth, userController.update)       // Update user route
router.delete("/:id", auth, userController.delete)      // Delete user route

module.exports = router