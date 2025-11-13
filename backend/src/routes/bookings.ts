import express from 'express'
import { bookingController } from '../controllers/bookingController'
import { authenticate } from '../middlewares/auth'

const router = express.Router()

// All booking routes require authentication
router.use(authenticate)

// Book a hotel
router.post('/hotel', bookingController.bookHotel)

// Book a restaurant
router.post('/restaurant', bookingController.bookRestaurant)

// Book an activity
router.post('/activity', bookingController.bookActivity)

// Get user's bookings
router.get('/', bookingController.getUserBookings)

export default router

