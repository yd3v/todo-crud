const router = require("express").Router()
const auth = require("../middlewares/authentication")
const taskController = require("../controllers/taskController")

router.post("/create", auth, taskController.create)
router.get("/", auth, taskController.view)
router.patch("/:id/update", auth, taskController.update)
router.delete("/:id/delete", auth, taskController.delete)

module.exports = router