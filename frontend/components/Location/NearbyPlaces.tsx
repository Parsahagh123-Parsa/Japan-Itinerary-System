'use client'

import { useState, useEffect } from 'react'
import Button from '../UI/Button'
import { useToast } from '../UI/ToastContainer'
import type { Activity } from '../../services/itinerary'

interface NearbyPlacesProps {
  coordinates: [number, number]
  city: string
  onAddToItinerary?: (activity: Activity) => void
}

interface Place {
  name: string
  address: string
  type: string
  rating?: number
  distance: number
  coordinates: [number, number]
}

export default function NearbyPlaces({
  coordinates,
  city,
  onAddToItinerary,
}: NearbyPlacesProps) {
  const { showToast } = useToast()
  const [places, setPlaces] = useState<Place[]>([])
  const [loading, setLoading] = useState(false)

  // Sample places data for major Japanese cities
  const getPlacesForCity = (cityName: string): Place[] => {
    const cityPlaces: Record<string, Place[]> = {
      Tokyo: [
        {
          name: 'Senso-ji Temple',
          address: '2 Chome-3-1 Asakusa, Taito City, Tokyo',
          type: 'Temple',
          rating: 4.5,
          distance: 2.3,
          coordinates: [35.7148, 139.7967],
        },
        {
          name: 'Tokyo Skytree',
          address: '1 Chome-1-2 Oshiage, Sumida City, Tokyo',
          type: 'Landmark',
          rating: 4.6,
          distance: 3.1,
          coordinates: [35.7101, 139.8107],
        },
        {
          name: 'Shibuya Crossing',
          address: 'Shibuya City, Tokyo',
          type: 'Landmark',
          rating: 4.4,
          distance: 5.2,
          coordinates: [35.6598, 139.7006],
        },
      ],
      Kyoto: [
        {
          name: 'Fushimi Inari Shrine',
          address: '68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto',
          type: 'Shrine',
          rating: 4.7,
          distance: 1.8,
          coordinates: [35.0122, 135.7722],
        },
        {
          name: 'Kiyomizu-dera',
          address: '1 Chome-294 Kiyomizu, Higashiyama Ward, Kyoto',
          type: 'Temple',
          rating: 4.6,
          distance: 2.5,
          coordinates: [35.0116, 135.7850],
        },
        {
          name: 'Arashiyama Bamboo Grove',
          address: 'Sagatenryuji Susukinobabacho, Ukyo Ward, Kyoto',
          type: 'Nature',
          rating: 4.5,
          distance: 8.3,
          coordinates: [35.0172, 135.6720],
        },
      ],
      Osaka: [
        {
          name: 'Osaka Castle',
          address: '1-1 Osakajo, Chuo Ward, Osaka',
          type: 'Castle',
          rating: 4.4,
          distance: 2.1,
          coordinates: [34.6873, 135.5262],
        },
        {
          name: 'Dotonbori',
          address: 'Dotonbori, Chuo Ward, Osaka',
          type: 'Entertainment',
          rating: 4.5,
          distance: 1.5,
          coordinates: [34.6698, 135.5019],
        },
        {
          name: 'Universal Studios Japan',
          address: '2 Chome-1-33 Sakurajima, Konohana Ward, Osaka',
          type: 'Theme Park',
          rating: 4.6,
          distance: 6.8,
          coordinates: [34.6654, 135.4323],
        },
      ],
    }

    return cityPlaces[cityName] || []
  }

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true)
      try {
        // Simulate API call - in production, this would call a real API
        await new Promise((resolve) => setTimeout(resolve, 500))
        const cityPlaces = getPlacesForCity(city)
        setPlaces(cityPlaces)
      } catch (err) {
        showToast('Failed to load nearby places', 'error')
      } finally {
        setLoading(false)
      }
    }

    if (city) {
      fetchPlaces()
    }
  }, [city, showToast])

  const handleAddToItinerary = (place: Place) => {
    if (!onAddToItinerary) return

    const activity: Activity = {
      id: `nearby-${Date.now()}`,
      name: place.name,
      type: place.type,
      startTime: '10:00',
      endTime: '12:00',
      location: {
        name: place.name,
        address: place.address,
        coordinates: place.coordinates,
      },
    }

    onAddToItinerary(activity)
    showToast(`${place.name} added to itinerary`, 'success')
  }

  if (loading) {
    return (
      <div className="bg-white rounded-card shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Nearby Places in {city}</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (places.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">
        📍 Nearby Places in {city}
      </h3>
      <div className="space-y-3">
        {places.map((place, index) => (
          <div
            key={index}
            className="flex items-start justify-between p-4 border border-gray-200 rounded-card hover:border-primary transition-colors"
          >
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{place.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{place.address}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                  {place.type}
                </span>
                {place.rating && (
                  <span className="text-xs text-gray-600">
                    ⭐ {place.rating}
                  </span>
                )}
                <span className="text-xs text-gray-600">
                  📍 {place.distance.toFixed(1)} km away
                </span>
              </div>
            </div>
            {onAddToItinerary && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAddToItinerary(place)}
              >
                Add
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

