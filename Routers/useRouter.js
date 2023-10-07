const express = require("express")
const { createUse, loginUser, myDatail, logOut } = require("../controller/userController")
const { isAuth } = require("../middlewares/auth")
const router = express.Router()
router.post("/create/new",createUse)
router.post("/login",loginUser)
router.get("/logout",logOut)

router.get("/me",isAuth,myDatail)



module.exports= router