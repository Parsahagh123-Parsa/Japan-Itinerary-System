import express from 'express'
import { itineraryController } from '../controllers/itineraryController'
import { authenticate } from '../middlewares/auth'

const router = express.Router()

// All itinerary routes require authentication
router.use(authenticate)

// Generate new itinerary
router.post('/generate', itineraryController.generate)

// Get itinerary by ID
router.get('/:id', itineraryController.getById)

// Adjust existing itinerary
router.put('/:id/adjust', itineraryController.adjust)

// Get user's itineraries
router.get('/', itineraryController.getUserItineraries)

// Delete itinerary
router.delete('/:id', itineraryController.delete)

// Get statistics
router.get('/statistics', itineraryController.getStatistics)

export default router

