import { Response } from 'express'
import { AuthenticatedRequest } from '../middlewares/auth'
import { transitService } from '../services/transitService'

export const transitController = {
  /**
   * Get Japan Rail schedule information
   */
  async getSchedule(req: AuthenticatedRequest, res: Response) {
    try {
      const { from, to, date, time } = req.query

      if (!from || !to || !date) {
        return res.status(400).json({
          error: 'Missing required parameters: from, to, date',
        })
      }

      const routes = await transitService.getSchedule(
        from as string,
        to as string,
        date as string,
        time as string | undefined
      )

      res.json({ routes })
    } catch (error: any) {
      console.error('Error fetching transit schedule:', error)
      res.status(500).json({
        error: 'Failed to fetch transit schedule',
        message: error.message,
      })
    }
  },
}

