import { Response } from 'express'
import { AuthenticatedRequest } from '../middlewares/auth'
import { weatherService } from '../services/weatherService'

export const weatherController = {
  /**
   * Get weather data for coordinates
   */
  async getWeather(req: AuthenticatedRequest, res: Response) {
    try {
      const { lat, lon, date } = req.query

      if (!lat || !lon) {
        return res.status(400).json({
          error: 'Missing required parameters: lat, lon',
        })
      }

      const weather = await weatherService.getWeather(
        parseFloat(lat as string),
        parseFloat(lon as string),
        date as string | undefined
      )

      res.json({ weather })
    } catch (error: any) {
      console.error('Error fetching weather:', error)
      res.status(500).json({
        error: 'Failed to fetch weather',
        message: error.message,
      })
    }
  },
}

