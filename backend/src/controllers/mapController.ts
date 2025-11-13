import { Response } from 'express'
import { AuthenticatedRequest } from '../middlewares/auth'
import { mapService } from '../services/mapService'

export const mapController = {
  /**
   * Get route data for Mapbox visualization
   */
  async getRoute(req: AuthenticatedRequest, res: Response) {
    try {
      const { from, to, mode } = req.query

      if (!from || !to) {
        return res.status(400).json({
          error: 'Missing required parameters: from, to',
        })
      }

      const route = await mapService.getRoute(
        from as string,
        to as string,
        (mode as string) || 'walking'
      )

      res.json({ route })
    } catch (error: any) {
      console.error('Error fetching route:', error)
      res.status(500).json({
        error: 'Failed to fetch route',
        message: error.message,
      })
    }
  },

  /**
   * Get AR overlay data
   */
  async getAROverlay(req: AuthenticatedRequest, res: Response) {
    try {
      const { coordinates } = req.query

      if (!coordinates) {
        return res.status(400).json({
          error: 'Missing required parameter: coordinates',
        })
      }

      const overlay = await mapService.getAROverlay(coordinates as string)

      res.json({ overlay })
    } catch (error: any) {
      console.error('Error fetching AR overlay:', error)
      res.status(500).json({
        error: 'Failed to fetch AR overlay',
        message: error.message,
      })
    }
  },
}

