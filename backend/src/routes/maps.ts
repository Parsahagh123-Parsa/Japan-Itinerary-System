import express from 'express'
import { mapController } from '../controllers/mapController'
import { authenticate } from '../middlewares/auth'

const router = express.Router()

// Map routes require authentication
router.use(authenticate)

// Get route data
router.get('/route', mapController.getRoute)

// Get AR overlay data
router.get('/ar-overlay', mapController.getAROverlay)

export default router

