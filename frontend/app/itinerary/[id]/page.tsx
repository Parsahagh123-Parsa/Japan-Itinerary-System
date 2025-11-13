'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useItinerary } from '../../../hooks/useItinerary'
import DaySchedule from '../../../components/Itinerary/DaySchedule'
import ShareItinerary from '../../../components/Itinerary/ShareItinerary'
import ExportItinerary from '../../../components/Itinerary/ExportItinerary'
import { useState } from 'react'
import FavoriteButton from '../../../components/Itinerary/FavoriteButton'
import CostBreakdown from '../../../components/Itinerary/CostBreakdown'
import ItineraryAdjustModal from '../../../components/Itinerary/ItineraryAdjustModal'
import Button from '../../../components/UI/Button'
import { DayScheduleSkeleton } from '../../../components/UI/LoadingSkeleton'
import { formatCoordinates } from '../../../services/maps'

export default function ItineraryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { itinerary, loading, error, reload } = useItinerary(params.id as string)
  const [showAdjustModal, setShowAdjustModal] = useState(false)

  if (loading) {
    return (
      <main className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="h-10 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
          <DayScheduleSkeleton />
          <DayScheduleSkeleton />
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
            <div className="flex gap-2 flex-wrap items-center">
              <FavoriteButton itineraryId={itinerary.id} />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdjustModal(true)}
              >
                🔄 Adjust Plan
              </Button>
              <ShareItinerary itineraryId={itinerary.id} title={itinerary.title} />
              <ExportItinerary itinerary={itinerary} />
              <Link href={`/itinerary/${itinerary.id}/print`} target="_blank">
                <Button variant="outline" size="sm">
                  🖨️ Print
                </Button>
              </Link>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {itinerary.days.map((day) => (
              <DaySchedule
                key={day.day}
                day={day}
                onBookingSuccess={() => {
                  // Could show a success message or refresh data
                }}
              />
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <CostBreakdown itinerary={itinerary} />
            </div>
          </div>
        </div>

        {showAdjustModal && (
          <ItineraryAdjustModal
            itineraryId={itinerary.id}
            onClose={() => setShowAdjustModal(false)}
            onSuccess={() => {
              reload?.()
              setShowAdjustModal(false)
            }}
          />
        )}
      </div>
    </main>
  )
}

