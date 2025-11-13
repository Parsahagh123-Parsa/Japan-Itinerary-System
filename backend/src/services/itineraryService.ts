import { supabase } from '../config/supabase'
import { aiService } from './ai/itineraryService'

export interface ItineraryData {
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
  userId: string
  title: string
  startDate: string
  endDate: string
  cities: string[]
  days: DaySchedule[]
  totalCost?: number
  createdAt: string
}

export const itineraryService = {
  /**
   * Generate a new AI-powered itinerary
   */
  async generateItinerary(
    userId: string,
    data: ItineraryData
  ): Promise<Itinerary> {
    // Use AI service to generate itinerary
    const aiItinerary = await aiService.generateItinerary(data)

    // Save to database
    const { data: itinerary, error } = await supabase
      .from('itineraries')
      .insert({
        user_id: userId,
        title: `${data.cities.join(', ')} Trip`,
        start_date: data.startDate,
        end_date: data.endDate,
        cities: data.cities,
        days: aiItinerary.days,
        total_cost: aiItinerary.totalCost,
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to save itinerary: ${error.message}`)
    }

    return {
      id: itinerary.id,
      userId: itinerary.user_id,
      title: itinerary.title,
      startDate: itinerary.start_date,
      endDate: itinerary.end_date,
      cities: itinerary.cities,
      days: itinerary.days,
      totalCost: itinerary.total_cost,
      createdAt: itinerary.created_at,
    }
  },

  /**
   * Get itinerary by ID
   */
  async getItineraryById(
    userId: string,
    itineraryId: string
  ): Promise<Itinerary | null> {
    const { data, error } = await supabase
      .from('itineraries')
      .select('*')
      .eq('id', itineraryId)
      .eq('user_id', userId)
      .single()

    if (error || !data) {
      return null
    }

    return {
      id: data.id,
      userId: data.user_id,
      title: data.title,
      startDate: data.start_date,
      endDate: data.end_date,
      cities: data.cities,
      days: data.days,
      totalCost: data.total_cost,
      createdAt: data.created_at,
    }
  },

  /**
   * Adjust an existing itinerary
   */
  async adjustItinerary(
    userId: string,
    itineraryId: string,
    reason: string,
    preferences?: Record<string, any>
  ): Promise<Itinerary> {
    // Get existing itinerary
    const existing = await this.getItineraryById(userId, itineraryId)

    if (!existing) {
      throw new Error('Itinerary not found')
    }

    // Use AI service to adjust itinerary
    const adjustedItinerary = await aiService.adjustItinerary(
      existing,
      reason,
      preferences
    )

    // Update in database
    const { data, error } = await supabase
      .from('itineraries')
      .update({
        days: adjustedItinerary.days,
        total_cost: adjustedItinerary.totalCost,
      })
      .eq('id', itineraryId)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update itinerary: ${error.message}`)
    }

    return {
      id: data.id,
      userId: data.user_id,
      title: data.title,
      startDate: data.start_date,
      endDate: data.end_date,
      cities: data.cities,
      days: data.days,
      totalCost: data.total_cost,
      createdAt: data.created_at,
    }
  },

  /**
   * Get user's itineraries
   */
  async getUserItineraries(userId: string): Promise<Itinerary[]> {
    const { data, error } = await supabase
      .from('itineraries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch itineraries: ${error.message}`)
    }

    return (
      data?.map((itinerary) => ({
        id: itinerary.id,
        userId: itinerary.user_id,
        title: itinerary.title,
        startDate: itinerary.start_date,
        endDate: itinerary.end_date,
        cities: itinerary.cities,
        days: itinerary.days,
        totalCost: itinerary.total_cost,
        createdAt: itinerary.created_at,
      })) || []
    )
  },

  /**
   * Delete an itinerary
   */
  async deleteItinerary(userId: string, itineraryId: string): Promise<void> {
    const { error } = await supabase
      .from('itineraries')
      .delete()
      .eq('id', itineraryId)
      .eq('user_id', userId)

    if (error) {
      throw new Error(`Failed to delete itinerary: ${error.message}`)
    }
  },

  /**
   * Get user's itinerary statistics
   */
  async getStatistics(userId: string) {
    const { data: itineraries, error } = await supabase
      .from('itineraries')
      .select('*')
      .eq('user_id', userId)

    if (error) {
      throw new Error(`Failed to fetch statistics: ${error.message}`)
    }

    const totalItineraries = itineraries?.length || 0
    let totalDays = 0
    let totalCost = 0
    const cities = new Set<string>()

    itineraries?.forEach((itinerary) => {
      const start = new Date(itinerary.start_date)
      const end = new Date(itinerary.end_date)
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
      totalDays += days
      totalCost += itinerary.total_cost || 0
      itinerary.cities?.forEach((city: string) => cities.add(city))
    })

    return {
      totalItineraries,
      totalDays,
      totalCost,
      uniqueCities: cities.size,
      averageDaysPerItinerary: totalItineraries > 0 ? Math.round(totalDays / totalItineraries) : 0,
      averageCostPerItinerary: totalItineraries > 0 ? Math.round(totalCost / totalItineraries) : 0,
    }
  },
}

