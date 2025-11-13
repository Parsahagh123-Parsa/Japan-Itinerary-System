/**
 * Itinerary model types
 */

export interface Itinerary {
  id: string
  userId: string
  title: string
  startDate: string
  endDate: string
  cities: string[]
  days: DaySchedule[]
  totalCost?: number
  createdAt: string
  updatedAt?: string
}

export interface DaySchedule {
  day: number
  date: string
  activities: Activity[]
}

export interface Activity {
  id?: string
  startTime: string
  endTime: string
  name: string
  type: string
  location: {
    name: string
    address: string
    coordinates: [number, number] // [lng, lat]
  }
  notes?: string
}

