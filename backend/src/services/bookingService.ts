import { supabase } from '../config/supabase'

export interface BookingData {
  activityId: string
  bookingType: 'hotel' | 'restaurant' | 'activity'
  [key: string]: any
}

export interface Booking {
  id: string
  userId: string
  activityId: string
  bookingType: string
  externalId?: string
  status: 'pending' | 'confirmed' | 'cancelled'
  bookedAt: string
}

export const bookingService = {
  /**
   * Book a hotel
   */
  async bookHotel(userId: string, data: BookingData): Promise<Booking> {
    // TODO: Integrate with Booking.com API
    // For now, create a placeholder booking

    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        user_id: userId,
        activity_id: data.activityId,
        booking_type: 'hotel',
        external_id: data.externalId,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create booking: ${error.message}`)
    }

    return {
      id: booking.id,
      userId: booking.user_id,
      activityId: booking.activity_id,
      bookingType: booking.booking_type,
      externalId: booking.external_id,
      status: booking.status,
      bookedAt: booking.booked_at,
    }
  },

  /**
   * Book a restaurant
   */
  async bookRestaurant(userId: string, data: BookingData): Promise<Booking> {
    // TODO: Integrate with Hotpepper/Gurunavi API

    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        user_id: userId,
        activity_id: data.activityId,
        booking_type: 'restaurant',
        external_id: data.externalId,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create booking: ${error.message}`)
    }

    return {
      id: booking.id,
      userId: booking.user_id,
      activityId: booking.activity_id,
      bookingType: booking.booking_type,
      externalId: booking.external_id,
      status: booking.status,
      bookedAt: booking.booked_at,
    }
  },

  /**
   * Book an activity
   */
  async bookActivity(userId: string, data: BookingData): Promise<Booking> {
    // TODO: Integrate with Klook API

    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        user_id: userId,
        activity_id: data.activityId,
        booking_type: 'activity',
        external_id: data.externalId,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create booking: ${error.message}`)
    }

    return {
      id: booking.id,
      userId: booking.user_id,
      activityId: booking.activity_id,
      bookingType: booking.booking_type,
      externalId: booking.external_id,
      status: booking.status,
      bookedAt: booking.booked_at,
    }
  },

  /**
   * Get user's bookings
   */
  async getUserBookings(userId: string): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .order('booked_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch bookings: ${error.message}`)
    }

    return (
      data?.map((booking) => ({
        id: booking.id,
        userId: booking.user_id,
        activityId: booking.activity_id,
        bookingType: booking.booking_type,
        externalId: booking.external_id,
        status: booking.status,
        bookedAt: booking.booked_at,
      })) || []
    )
  },
}

