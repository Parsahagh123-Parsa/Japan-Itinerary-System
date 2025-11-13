import { z } from 'zod'
import { ValidationError } from './errors'

/**
 * Validation schemas using Zod
 */

export const itineraryRequestSchema = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  cities: z.array(z.string()).min(1),
  interests: z.array(z.string()).min(1),
  budget: z.enum(['budget', 'moderate', 'luxury']),
  travelStyle: z.enum(['relaxed', 'moderate', 'packed']).optional(),
})

export const adjustItinerarySchema = z.object({
  reason: z.string().min(1),
  preferences: z.record(z.any()).optional(),
})

export const routeRequestSchema = z.object({
  from: z.string(),
  to: z.string(),
  mode: z.enum(['walking', 'transit', 'driving']).optional(),
})

export const transitRequestSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/).optional(),
})

export const translateTextSchema = z.object({
  text: z.string().min(1),
  targetLang: z.string().optional(),
  sourceLang: z.string().optional(),
})

/**
 * Validate request data against a schema
 */
export function validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(
        error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')
      )
    }
    throw error
  }
}

