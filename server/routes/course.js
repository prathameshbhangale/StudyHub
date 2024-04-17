import express from 'express'
import { createCategory , showAllCategories , categoryPageDetails } from '../controller/category.controller.js';
import { auth,isAdmin } from '../middleware/auth.js'
const router = express.Router()

// for category
router.post('/createCategory', auth, isAdmin, createCategory)
router.get('/showAllCategories', showAllCategories)
router.post('/getCategoryPageDetails', categoryPageDetails)

export default router