'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useItinerary } from '../../../hooks/useItinerary'
import DaySchedule from '../../../components/Itinerary/DaySchedule'
import Button from '../../../components/UI/Button'
import { formatCoordinates } from '../../../services/maps'

export default function ItineraryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { itinerary, loading, error } = useItinerary(params.id as string)

  if (loading) {
    return (
      <main className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading itinerary...</p>
          </div>
        </div>
      </main>
    )
  }

  if (error || !itinerary) {
    return (
      <main className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-card shadow-sm p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {error || 'Itinerary not found'}
            </h2>
            <Button onClick={() => router.push('/')} className="mt-4">
              Go to Dashboard
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="mb-4"
          >
            ← Back to Dashboard
          </Button>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{itinerary.title}</h1>
              <p className="text-lg text-gray-600">
                {itinerary.cities.join(', ')}
              </p>
              {itinerary.totalCost && (
                <p className="text-sm text-gray-600 mt-2">
                  Estimated cost: ¥{itinerary.totalCost.toLocaleString()}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              {itinerary.days.length > 0 && itinerary.days[0].activities.length > 0 && (
                <Link
                  href={`/map?from=${formatCoordinates(
                    itinerary.days[0].activities[0].location.coordinates[0],
                    itinerary.days[0].activities[0].location.coordinates[1]
                  )}`}
                >
                  <Button variant="outline">View on Map</Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {itinerary.days.map((day) => (
            <DaySchedule key={day.day} day={day} />
          ))}
        </div>
      </div>
    </main>
  )
}

