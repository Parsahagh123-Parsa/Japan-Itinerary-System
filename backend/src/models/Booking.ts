/**
 * Booking model types
 */

export interface Booking {
  id: string
  userId: string
  activityId?: string
  bookingType: 'hotel' | 'restaurant' | 'activity'
  externalId?: string
  status: 'pending' | 'confirmed' | 'cancelled'
  bookingDetails?: Record<string, any>
  bookedAt: string
  updatedAt?: string
}

