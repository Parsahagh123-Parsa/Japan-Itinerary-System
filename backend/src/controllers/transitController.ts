import { Response } from 'express'
import { AuthenticatedRequest } from '../middlewares/auth'
import { transitService } from '../services/transitService'
import { validate, transitRequestSchema } from '../utils/validation'
import { ValidationError } from '../utils/errors'

export const transitController = {
  /**
   * Get Japan Rail schedule information
   */
  async getSchedule(req: AuthenticatedRequest, res: Response) {
    try {
      const transitData = validate(transitRequestSchema, req.query)

      const routes = await transitService.getSchedule(
        transitData.from,
        transitData.to,
        transitData.date,
        transitData.time
      )

      res.json({ routes })
    } catch (error: any) {
      console.error('Error fetching transit schedule:', error)
      
      if (error instanceof ValidationError) {
        return res.status(400).json({
          error: 'Validation error',
          message: error.message,
        })
      }
      
      res.status(500).json({
        error: 'Failed to fetch transit schedule',
        message: error.message,
      })
    }
  },
}

