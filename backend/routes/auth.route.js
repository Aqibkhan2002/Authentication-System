import express from "express"
const router=express.Router()
import{
    signup,
    login,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,
    getUser,
    checkparamtoken
} from "../controllers/auth.controller.js"
import { verifyToken } from "../middleware/verifyJWT.js"

router.get("/getuser",verifyToken,getUser)
router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.post("/verifyEmail",verifyEmail)
router.post("/forgotPassword",forgotPassword)
router.post("/resetPassword/:token",resetPassword)
router.post("/checkparamtoken",checkparamtoken)



export default router

