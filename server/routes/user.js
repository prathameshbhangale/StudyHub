import express from 'express'
import { login , signup , sendOTP , changePassword } from '../controller/userAuth.controller.js'
import { auth } from '../middleware/auth.js'
import { resetPassword , resetPasswordToken } from '../controller/resetPassword.controller.js'
const router = express.Router()

router.post("/login", login)
router.post("/signup", signup)
router.post("/sendOTP", sendOTP)
router.post("/changePassword",auth, changePassword)

router.post("/reset-password-token", resetPasswordToken)
router.post("/reset-password", resetPassword)

export default router
