import express from 'express'
import { translateController } from '../controllers/translateController'
import { authenticate } from '../middlewares/auth'

const router = express.Router()

// Translation routes require authentication
router.use(authenticate)

// Translate text
router.post('/text', translateController.translateText)

// Translate image
router.post('/image', translateController.translateImage)

export default router

