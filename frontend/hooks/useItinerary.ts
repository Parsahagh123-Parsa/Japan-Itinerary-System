import { useState, useEffect } from 'react'
import { generateItinerary, getItinerary, adjustItinerary, getUserItineraries, type Itinerary, type ItineraryRequest } from '../services/itinerary'

export function useItinerary(id?: string) {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      loadItinerary(id)
    }
  }, [id])

  const loadItinerary = async (itineraryId: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await getItinerary(itineraryId)
      setItinerary(data)
    } catch (err: any) {
      setError(err.message || 'Failed to load itinerary')
    } finally {
      setLoading(false)
    }
  }

  const createItinerary = async (request: ItineraryRequest) => {
    setLoading(true)
    setError(null)
    try {
      const data = await generateItinerary(request)
      setItinerary(data)
      return data
    } catch (err: any) {
      setError(err.message || 'Failed to create itinerary')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateItinerary = async (reason: string, preferences?: Record<string, any>) => {
    if (!itinerary) return

    setLoading(true)
    setError(null)
    try {
      const data = await adjustItinerary(itinerary.id, reason, preferences)
      setItinerary(data)
      return data
    } catch (err: any) {
      setError(err.message || 'Failed to update itinerary')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    itinerary,
    loading,
    error,
    createItinerary,
    updateItinerary,
    reload: id ? () => loadItinerary(id) : undefined,
  }
}

export function useUserItineraries() {
  const [itineraries, setItineraries] = useState<Itinerary[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadItineraries = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getUserItineraries()
      setItineraries(data)
    } catch (err: any) {
      setError(err.message || 'Failed to load itineraries')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItineraries()
  }, [])

  return {
    itineraries,
    loading,
    error,
    reload: loadItineraries,
  }
}

