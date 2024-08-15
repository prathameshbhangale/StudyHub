import express from 'express'
const router = express.Router()

import { contactUsController } from '../controller/contactUs.controller.js'

router.post("/contact-us", contactUsController )

export default router
