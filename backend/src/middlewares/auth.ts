import { Request, Response, NextFunction } from 'express'
import { supabaseClient } from '../config/supabase'

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string
    email: string
  }
}

/**
 * Middleware to authenticate requests using Supabase JWT
 */
export async function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' })
    }

    const token = authHeader.substring(7)

    // Verify token with Supabase
    const {
      data: { user },
      error,
    } = await supabaseClient.auth.getUser(token)

    if (error || !user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' })
    }

    // Attach user to request
    req.user = {
      id: user.id,
      email: user.email || '',
    }

    next()
  } catch (error) {
    console.error('Authentication error:', error)
    return res.status(401).json({ error: 'Unauthorized: Authentication failed' })
  }
}

