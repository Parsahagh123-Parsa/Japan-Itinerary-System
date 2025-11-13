import express from 'express'
import { weatherController } from '../controllers/weatherController'
import { authenticate } from '../middlewares/auth'

const router = express.Router()

// Weather routes require authentication
router.use(authenticate)

// Get weather data
router.get('/', weatherController.getWeather)

export default router

