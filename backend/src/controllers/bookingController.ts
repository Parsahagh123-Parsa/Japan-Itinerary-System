import { Response } from 'express'
import { AuthenticatedRequest } from '../middlewares/auth'
import { bookingService } from '../services/bookingService'

export const bookingController = {
  /**
   * Book a hotel
   */
  async bookHotel(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id
      const bookingData = req.body

      const booking = await bookingService.bookHotel(userId, bookingData)

      res.json({ booking })
    } catch (error: any) {
      console.error('Error booking hotel:', error)
      res.status(500).json({
        error: 'Failed to book hotel',
        message: error.message,
      })
    }
  },

  /**
   * Book a restaurant
   */
  async bookRestaurant(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id
      const bookingData = req.body

      const booking = await bookingService.bookRestaurant(userId, bookingData)

      res.json({ booking })
    } catch (error: any) {
      console.error('Error booking restaurant:', error)
      res.status(500).json({
        error: 'Failed to book restaurant',
        message: error.message,
      })
    }
  },

  /**
   * Book an activity
   */
  async bookActivity(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id
      const bookingData = req.body

      const booking = await bookingService.bookActivity(userId, bookingData)

      res.json({ booking })
    } catch (error: any) {
      console.error('Error booking activity:', error)
      res.status(500).json({
        error: 'Failed to book activity',
        message: error.message,
      })
    }
  },

  /**
   * Get user's bookings
   */
  async getUserBookings(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id

      const bookings = await bookingService.getUserBookings(userId)

      res.json({ bookings })
    } catch (error: any) {
      console.error('Error fetching bookings:', error)
      res.status(500).json({
        error: 'Failed to fetch bookings',
        message: error.message,
      })
    }
  },

  /**
   * Cancel a booking
   */
  async cancelBooking(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id
      const { id } = req.params

      await bookingService.cancelBooking(userId, id)

      res.json({ message: 'Booking cancelled successfully' })
    } catch (error: any) {
      console.error('Error cancelling booking:', error)
      res.status(500).json({
        error: 'Failed to cancel booking',
        message: error.message,
      })
    }
  },
}

