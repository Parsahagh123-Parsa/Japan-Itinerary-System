import express from 'express'
import { transitController } from '../controllers/transitController'
import { authenticate } from '../middlewares/auth'

const router = express.Router()

// Transit routes require authentication
router.use(authenticate)

// Get transit schedule
router.get('/schedule', transitController.getSchedule)

export default router

