import express from 'express'
import { createCategory , showAllCategories , categoryPageDetails } from '../controller/category.controller.js';
import { auth,isAdmin,isStudent,isInstructor } from '../middleware/auth.js'
import { createCourse } from '../controller/course.controller.js';
const router = express.Router()

// category routes
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/categoryPageDetails", categoryPageDetails)
router.get("/showAllCategories", showAllCategories)

// Course routers
router.post("/createCourse", auth, isInstructor, createCourse)
                  

// for Rating and Review

export default router