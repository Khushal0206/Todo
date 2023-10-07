const express = require("express")
const { createTask, allUserTask, updateUser, deleteUser } = require("../controller/taskController")
const { isAuth } = require("../middlewares/auth")
const router = express.Router()
router.route("/create").post(isAuth, createTask)
router.route("/my").get(isAuth, allUserTask)
router.route("/:id").put(isAuth, updateUser).delete(isAuth,deleteUser)



module.exports = router