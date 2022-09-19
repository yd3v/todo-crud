const router = require("express").Router()
const auth = require("../middlewares/authentication")
const TaskController = require("../controllers/taskController")

router.post("/create", auth, TaskController.create)
router.get("/", auth, TaskController.view)
router.patch("/:id/update", auth, TaskController.update)
router.delete("/:id/delete", auth, TaskController.delete)

module.exports = router