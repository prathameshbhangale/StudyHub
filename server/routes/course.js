import express from 'express'
import { createCategory , showAllCategories , categoryPageDetails } from '../controller/category.controller.js';
import { auth,isAdmin,isStudent,isInstructor } from '../middleware/auth.js'
import { createCourse } from '../controller/course.controller.js';
const router = express.Router()

// for category
router.post('/createCategory', auth, isAdmin, createCategory)
router.get('/showAllCategories', showAllCategories)
router.post('/getCategoryPageDetails', categoryPageDetails)

// Course routers
// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)
router.post("/getCourseDetails", auth, isInstructor, createCourse)
router.post("/createCourse", auth, isInstructor, createCourse)
router.post("/createCourse", auth, isInstructor, createCourse)
router.post("/createCourse", auth, isInstructor, createCourse)
                  

// for Rating and Review

export default router