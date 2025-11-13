'use client'

import { useState, useEffect } from 'react'
import Button from '../UI/Button'
import { useToast } from '../UI/ToastContainer'
import type { Activity } from '../../services/itinerary'

interface Recommendation {
  id: string
  name: string
  type: string
  description: string
  location: {
    name: string
    address: string
    coordinates: [number, number]
  }
  rating?: number
  estimatedCost?: number
  duration: number
  bestTime: string
  tags: string[]
}

interface ActivityRecommendationsProps {
  city: string
  interests?: string[]
  onAddToItinerary?: (activity: Activity) => void
}

const RECOMMENDATIONS: Record<string, Recommendation[]> = {
  Tokyo: [
    {
      id: 'rec-1',
      name: 'TeamLab Borderless',
      type: 'Museum',
      description: 'Digital art museum with interactive installations',
      location: {
        name: 'TeamLab Borderless',
        address: '1-3-15 Odaiba, Koto City, Tokyo',
        coordinates: [35.6251, 139.7736],
      },
      rating: 4.7,
      estimatedCost: 3200,
      duration: 180,
      bestTime: 'Morning',
      tags: ['art', 'technology', 'family'],
    },
    {
      id: 'rec-2',
      name: 'Tsukiji Outer Market',
      type: 'Market',
      description: 'Fresh seafood and traditional Japanese street food',
      location: {
        name: 'Tsukiji Outer Market',
        address: '4 Chome-16-2 Tsukiji, Chuo City, Tokyo',
        coordinates: [35.6654, 139.7706],
      },
      rating: 4.5,
      estimatedCost: 2000,
      duration: 120,
      bestTime: 'Early Morning',
      tags: ['food', 'culture', 'shopping'],
    },
    {
      id: 'rec-3',
      name: 'Tokyo National Museum',
      type: 'Museum',
      description: 'Largest collection of Japanese art and artifacts',
      location: {
        name: 'Tokyo National Museum',
        address: '13-9 Uenokoen, Taito City, Tokyo',
        coordinates: [35.7186, 139.7764],
      },
      rating: 4.6,
      estimatedCost: 1000,
      duration: 180,
      bestTime: 'Afternoon',
      tags: ['culture', 'history', 'art'],
    },
  ],
  Kyoto: [
    {
      id: 'rec-4',
      name: 'Nishiki Market',
      type: 'Market',
      description: 'Traditional food market with local specialties',
      location: {
        name: 'Nishiki Market',
        address: 'Nishikikoji-dori, Nakagyo Ward, Kyoto',
        coordinates: [35.0047, 135.7674],
      },
      rating: 4.4,
      estimatedCost: 1500,
      duration: 90,
      bestTime: 'Morning',
      tags: ['food', 'culture', 'shopping'],
    },
    {
      id: 'rec-5',
      name: 'Gion District',
      type: 'Neighborhood',
      description: 'Historic geisha district with traditional architecture',
      location: {
        name: 'Gion District',
        address: 'Gion, Higashiyama Ward, Kyoto',
        coordinates: [35.0038, 135.7750],
      },
      rating: 4.6,
      estimatedCost: 0,
      duration: 120,
      bestTime: 'Evening',
      tags: ['culture', 'history', 'photography'],
    },
    {
      id: 'rec-6',
      name: 'Philosopher\'s Path',
      type: 'Nature',
      description: 'Scenic walking path along a canal lined with cherry trees',
      location: {
        name: 'Philosopher\'s Path',
        address: 'Sakyo Ward, Kyoto',
        coordinates: [35.0275, 135.7944],
      },
      rating: 4.5,
      estimatedCost: 0,
      duration: 60,
      bestTime: 'Morning',
      tags: ['nature', 'walking', 'photography'],
    },
  ],
  Osaka: [
    {
      id: 'rec-7',
      name: 'Osaka Aquarium Kaiyukan',
      type: 'Aquarium',
      description: 'One of Japan\'s largest aquariums',
      location: {
        name: 'Osaka Aquarium Kaiyukan',
        address: '1-1-10 Kaigandori, Minato Ward, Osaka',
        coordinates: [34.6544, 135.4289],
      },
      rating: 4.6,
      estimatedCost: 2300,
      duration: 180,
      bestTime: 'Afternoon',
      tags: ['family', 'nature', 'education'],
    },
    {
      id: 'rec-8',
      name: 'Shinsekai District',
      type: 'Neighborhood',
      description: 'Retro entertainment district with local food',
      location: {
        name: 'Shinsekai',
        address: 'Shinsekai, Naniwa Ward, Osaka',
        coordinates: [34.6503, 135.5062],
      },
      rating: 4.3,
      estimatedCost: 2000,
      duration: 120,
      bestTime: 'Evening',
      tags: ['food', 'culture', 'nightlife'],
    },
  ],
}

export default function ActivityRecommendations({
  city,
  interests = [],
  onAddToItinerary,
}: ActivityRecommendationsProps) {
  const { showToast } = useToast()
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        
        let cityRecs = RECOMMENDATIONS[city] || []
        
        // Filter by interests if provided
        if (interests.length > 0) {
          cityRecs = cityRecs.filter((rec) =>
            rec.tags.some((tag) =>
              interests.some((interest) =>
                interest.toLowerCase().includes(tag.toLowerCase())
              )
            )
          )
        }
        
        setRecommendations(cityRecs)
      } catch (err) {
        showToast('Failed to load recommendations', 'error')
      } finally {
        setLoading(false)
      }
    }

    if (city) {
      fetchRecommendations()
    }
  }, [city, interests, showToast])

  const handleAddToItinerary = (rec: Recommendation) => {
    if (!onAddToItinerary) return

    const activity: Activity = {
      id: `rec-${rec.id}`,
      name: rec.name,
      type: rec.type,
      startTime: '10:00',
      endTime: `${String(Math.floor(rec.duration / 60) + 10).padStart(2, '0')}:${String(rec.duration % 60).padStart(2, '0')}`,
      location: rec.location,
      notes: rec.description,
    }

    onAddToItinerary(activity)
    showToast(`${rec.name} added to itinerary`, 'success')
  }

  if (loading) {
    return (
      <div className="bg-white rounded-card shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Recommended Activities</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (recommendations.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">
        ⭐ Recommended Activities in {city}
      </h3>
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="border border-gray-200 rounded-card p-4 hover:border-primary transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{rec.name}</h4>
                  {rec.rating && (
                    <span className="text-sm text-gray-600">⭐ {rec.rating}</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <span>📍 {rec.location.address}</span>
                  <span>⏱️ {rec.duration} min</span>
                  {rec.estimatedCost && (
                    <span>💰 ¥{rec.estimatedCost.toLocaleString()}</span>
                  )}
                  <span>🕐 Best: {rec.bestTime}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {rec.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {onAddToItinerary && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddToItinerary(rec)}
                  className="ml-4"
                >
                  Add
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

