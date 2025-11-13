import { Response } from 'express'
import { AuthenticatedRequest } from '../middlewares/auth'
import { translateService } from '../services/translateService'
import { validate, translateTextSchema } from '../utils/validation'
import { ValidationError } from '../utils/errors'

export const translateController = {
  /**
   * Translate text
   */
  async translateText(req: AuthenticatedRequest, res: Response) {
    try {
      const { text, targetLang = 'en', sourceLang = 'ja' } = validate(
        translateTextSchema,
        req.body
      )

      const translation = await translateService.translateText(
        text,
        sourceLang || 'ja',
        targetLang || 'en'
      )

      res.json({ translation })
    } catch (error: any) {
      console.error('Error translating text:', error)
      
      if (error instanceof ValidationError) {
        return res.status(400).json({
          error: 'Validation error',
          message: error.message,
        })
      }
      
      res.status(500).json({
        error: 'Failed to translate text',
        message: error.message,
      })
    }
  },

  /**
   * Translate image (OCR + translation)
   */
  async translateImage(req: AuthenticatedRequest, res: Response) {
    try {
      const { imageUrl, targetLang = 'en' } = req.body

      if (!imageUrl) {
        return res.status(400).json({
          error: 'Missing required field: imageUrl',
        })
      }

      const translation = await translateService.translateImage(
        imageUrl,
        targetLang
      )

      res.json({ translation })
    } catch (error: any) {
      console.error('Error translating image:', error)
      res.status(500).json({
        error: 'Failed to translate image',
        message: error.message,
      })
    }
  },
}

