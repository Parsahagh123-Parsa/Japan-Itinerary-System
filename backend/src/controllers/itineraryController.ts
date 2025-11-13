import { Response } from 'express'
import { AuthenticatedRequest } from '../middlewares/auth'
import { itineraryService } from '../services/itineraryService'
import { validate, itineraryRequestSchema, adjustItinerarySchema } from '../utils/validation'
import { ValidationError } from '../utils/errors'

export const itineraryController = {
  /**
   * Generate a new AI-powered itinerary
   */
  async generate(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id
      
      // Validate input using Zod schema
      const itineraryData = validate(itineraryRequestSchema, req.body)

      const itinerary = await itineraryService.generateItinerary(
        userId,
        itineraryData
      )

      res.json({ itinerary })
    } catch (error: any) {
      console.error('Error generating itinerary:', error)
      
      if (error instanceof ValidationError) {
        return res.status(400).json({
          error: 'Validation error',
          message: error.message,
        })
      }
      
      res.status(500).json({
        error: 'Failed to generate itinerary',
        message: error.message,
      })
    }
  },

  /**
   * Get itinerary by ID
   */
  async getById(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id
      const { id } = req.params

      const itinerary = await itineraryService.getItineraryById(userId, id)

      if (!itinerary) {
        return res.status(404).json({ error: 'Itinerary not found' })
      }

      res.json({ itinerary })
    } catch (error: any) {
      console.error('Error fetching itinerary:', error)
      res.status(500).json({
        error: 'Failed to fetch itinerary',
        message: error.message,
      })
    }
  },

  /**
   * Adjust an existing itinerary
   */
  async adjust(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id
      const { id } = req.params
      
      // Validate input using Zod schema
      const { reason, preferences } = validate(adjustItinerarySchema, req.body)

      const itinerary = await itineraryService.adjustItinerary(
        userId,
        id,
        reason,
        preferences
      )

      res.json({ itinerary })
    } catch (error: any) {
      console.error('Error adjusting itinerary:', error)
      
      if (error instanceof ValidationError) {
        return res.status(400).json({
          error: 'Validation error',
          message: error.message,
        })
      }
      
      res.status(500).json({
        error: 'Failed to adjust itinerary',
        message: error.message,
      })
    }
  },

  /**
   * Get user's itineraries
   */
  async getUserItineraries(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id

      const itineraries = await itineraryService.getUserItineraries(userId)

      res.json({ itineraries })
    } catch (error: any) {
      console.error('Error fetching user itineraries:', error)
      res.status(500).json({
        error: 'Failed to fetch itineraries',
        message: error.message,
      })
    }
  },

  /**
   * Delete an itinerary
   */
  async delete(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id
      const { id } = req.params

      await itineraryService.deleteItinerary(userId, id)

      res.json({ message: 'Itinerary deleted successfully' })
    } catch (error: any) {
      console.error('Error deleting itinerary:', error)
      res.status(500).json({
        error: 'Failed to delete itinerary',
        message: error.message,
      })
    }
  },

  /**
   * Get itinerary statistics
   */
  async getStatistics(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user!.id

      const statistics = await itineraryService.getStatistics(userId)

      res.json({ statistics })
    } catch (error: any) {
      console.error('Error fetching statistics:', error)
      res.status(500).json({
        error: 'Failed to fetch statistics',
        message: error.message,
      })
    }
  },
}

