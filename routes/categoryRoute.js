const router = require("express").Router()
const auth = require("../middlewares/authentication")
const categoryController = require("../controllers/categoryController")

router.post("/create", auth, categoryController.create)
router.get("/", auth, categoryController.view)
router.patch("/:id/update", auth, categoryController.update)
router.delete("/:id/delete", auth, categoryController.delete)

module.exports = router