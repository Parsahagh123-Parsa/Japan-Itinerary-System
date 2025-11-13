import api from './api'

export interface BookingRequest {
  activityId: string
  bookingType: 'hotel' | 'restaurant' | 'activity'
  details: Record<string, any>
}

export interface Booking {
  id: string
  activityId: string
  bookingType: string
  externalId?: string
  status: 'pending' | 'confirmed' | 'cancelled'
  bookingDetails?: Record<string, any>
  bookedAt: string
}

/**
 * Book a hotel
 */
export async function bookHotel(
  activityId: string,
  hotelDetails: Record<string, any>
): Promise<Booking> {
  const response = await api.post<{ booking: Booking }>('/bookings/hotel', {
    activityId,
    ...hotelDetails,
  })
  return response.data.booking
}

/**
 * Book a restaurant
 */
export async function bookRestaurant(
  activityId: string,
  restaurantDetails: Record<string, any>
): Promise<Booking> {
  const response = await api.post<{ booking: Booking }>('/bookings/restaurant', {
    activityId,
    ...restaurantDetails,
  })
  return response.data.booking
}

/**
 * Book an activity
 */
export async function bookActivity(
  activityId: string,
  activityDetails: Record<string, any>
): Promise<Booking> {
  const response = await api.post<{ booking: Booking }>('/bookings/activity', {
    activityId,
    ...activityDetails,
  })
  return response.data.booking
}

/**
 * Get user's bookings
 */
export async function getUserBookings(): Promise<Booking[]> {
  const response = await api.get<{ bookings: Booking[] }>('/bookings')
  return response.data.bookings
}

/**
 * Cancel a booking
 */
export async function cancelBooking(id: string): Promise<void> {
  await api.put(`/bookings/${id}/cancel`)
}

