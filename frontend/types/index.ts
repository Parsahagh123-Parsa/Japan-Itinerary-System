// Shared TypeScript types for the frontend

export interface User {
  id: string
  email: string
  name?: string
  preferences?: UserPreferences
}

export interface UserPreferences {
  interests: string[]
  budgetRange: 'budget' | 'moderate' | 'luxury'
  travelStyle: 'relaxed' | 'moderate' | 'packed'
}

export interface Place {
  id: string
  name: string
  address: string
  coordinates: [number, number]
  category: string
  rating?: number
  priceRange?: string
  imageUrl?: string
}

// Re-export types from services
export type {
  Itinerary,
  Activity,
  DaySchedule,
  ItineraryRequest,
} from '../services/itinerary'

export type {
  Booking,
  BookingRequest,
} from '../services/bookings'

export type {
  Route,
  RouteRequest,
  AROverlay,
} from '../services/maps'

export type {
  TransitRoute,
  TransitRequest,
} from '../services/transit'

