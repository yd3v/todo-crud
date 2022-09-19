const router = require("express").Router()
const auth = require("../middlewares/authentication")
const CategoryController = require("../controllers/categoryController")

router.post("/create", auth, CategoryController.create)
router.get("/", auth, CategoryController.view)
router.patch("/:id/update", auth, CategoryController.update)
router.delete("/:id/delete", auth, CategoryController.delete)

module.exports = router