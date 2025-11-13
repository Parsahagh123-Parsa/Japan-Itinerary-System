'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import Link from 'next/link'
import type { Itinerary } from '../../services/itinerary'
import { getUserItineraries } from '../../services/itinerary'

export default function RecentActivity() {
  const [recentItineraries, setRecentItineraries] = useState<Itinerary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRecent = async () => {
      try {
        const itineraries = await getUserItineraries()
        // Get 3 most recent
        const recent = itineraries.slice(0, 3)
        setRecentItineraries(recent)
      } catch (err) {
        console.error('Failed to load recent itineraries:', err)
      } finally {
        setLoading(false)
      }
    }

    loadRecent()
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-card shadow-sm p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  if (recentItineraries.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-4">Recent Itineraries</h3>
      <div className="space-y-3">
        {recentItineraries.map((itinerary) => (
          <Link
            key={itinerary.id}
            href={`/itinerary/${itinerary.id}`}
            className="block p-3 rounded-card hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">
                  {itinerary.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {itinerary.cities.join(', ')}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {format(new Date(itinerary.createdAt), 'MMM d, yyyy')}
                </p>
              </div>
              <span className="text-xs text-gray-400">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

