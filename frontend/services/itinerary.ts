import api from './api'

export interface ItineraryRequest {
  startDate: string
  endDate: string
  cities: string[]
  interests: string[]
  budget: 'budget' | 'moderate' | 'luxury'
  travelStyle?: 'relaxed' | 'moderate' | 'packed'
}

export interface Activity {
  id: string
  startTime: string
  endTime: string
  name: string
  type: string
  location: {
    name: string
    address: string
    coordinates: [number, number]
  }
  notes?: string
}

export interface DaySchedule {
  day: number
  date: string
  activities: Activity[]
}

export interface Itinerary {
  id: string
  title: string
  startDate: string
  endDate: string
  cities: string[]
  days: DaySchedule[]
  totalCost?: number
  createdAt: string
}

/**
 * Generate a new AI-powered itinerary
 */
export async function generateItinerary(
  request: ItineraryRequest
): Promise<Itinerary> {
  const response = await api.post<{ itinerary: Itinerary }>(
    '/itinerary/generate',
    request
  )
  return response.data.itinerary
}

/**
 * Get itinerary by ID
 */
export async function getItinerary(id: string): Promise<Itinerary> {
  const response = await api.get<{ itinerary: Itinerary }>(`/itinerary/${id}`)
  return response.data.itinerary
}

/**
 * Adjust an existing itinerary
 */
export async function adjustItinerary(
  id: string,
  reason: string,
  preferences?: Record<string, any>
): Promise<Itinerary> {
  const response = await api.put<{ itinerary: Itinerary }>(
    `/itinerary/${id}/adjust`,
    { reason, preferences }
  )
  return response.data.itinerary
}

/**
 * Get user's itineraries
 */
export async function getUserItineraries(): Promise<Itinerary[]> {
  const response = await api.get<{ itineraries: Itinerary[] }>('/itinerary')
  return response.data.itineraries
}

/**
 * Delete an itinerary
 */
export async function deleteItinerary(id: string): Promise<void> {
  await api.delete(`/itinerary/${id}`)
}

