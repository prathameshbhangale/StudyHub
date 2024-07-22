import express from 'express'
const router = express.Router()

import { 
    auth,
    isAdmin,
    isInstructor,
    isStudent
 } from '../middleware/auth.js'
import { 
    getAllUserDetails ,
    updateProfile,
    updateDisplayPicture
 } from '../controller/profile.controller.js'

router.put("/updateProfile",auth,updateProfile)
router.get("/getAllUserDetails",auth,getAllUserDetails)
router.put("/updateDisplayPicture",auth,updateDisplayPicture)

export default router
