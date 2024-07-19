import express from 'express'
import { createCategory , showAllCategories , categoryPageDetails } from '../controller/category.controller.js';
import { auth,isAdmin,isStudent,isInstructor } from '../middleware/auth.js'
import { createCourse,
    getCourseDetails
 } from '../controller/course.controller.js';
import { createSection } from '../controller/Section.controller.js';
const router = express.Router()

// category routes
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/categoryPageDetails", categoryPageDetails)
router.get("/showAllCategories", showAllCategories)

// Course routers
router.post("/createCourse", auth, isInstructor, createCourse)
router.get("/getCourseDetails",getCourseDetails)  // pending 

// section and sub section
router.post("/addSection", auth, isInstructor, createSection)

// for Rating and Review

export default router