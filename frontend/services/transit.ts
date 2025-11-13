import api from './api'

export interface TransitRequest {
  from: string // Station name
  to: string
  date: string // ISO date string
  time?: string // Time string (HH:mm)
}

export interface TransitRoute {
  id: string
  from: string
  to: string
  departureTime: string
  arrivalTime: string
  duration: number // minutes
  transfers: TransitTransfer[]
  price?: number
}

export interface TransitTransfer {
  from: string
  to: string
  line: string
  platform?: string
  departureTime: string
  arrivalTime: string
}

/**
 * Get Japan Rail schedule information
 */
export async function getTransitSchedule(
  request: TransitRequest
): Promise<TransitRoute[]> {
  const response = await api.get<{ routes: TransitRoute[] }>(
    '/transit/schedule',
    { params: request }
  )
  return response.data.routes
}

