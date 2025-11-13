'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useItinerary } from '../../../hooks/useItinerary'
import DaySchedule from '../../../components/Itinerary/DaySchedule'
import ShareItinerary from '../../../components/Itinerary/ShareItinerary'
import ExportItinerary from '../../../components/Itinerary/ExportItinerary'
import FavoriteButton from '../../../components/Itinerary/FavoriteButton'
import CostBreakdown from '../../../components/Itinerary/CostBreakdown'
import ItineraryAdjustModal from '../../../components/Itinerary/ItineraryAdjustModal'
import TimelineView from '../../../components/Itinerary/TimelineView'
import MapView from '../../../components/Itinerary/MapView'
import ExpenseTracker from '../../../components/Expense/ExpenseTracker'
import CalendarExport from '../../../components/Calendar/CalendarExport'
import CollaborateModal from '../../../components/Itinerary/CollaborateModal'
import ItineraryTags from '../../../components/Itinerary/ItineraryTags'
import LocationDetector from '../../../components/Location/LocationDetector'
import NearbyPlaces from '../../../components/Location/NearbyPlaces'
import CityInsights from '../../../components/Dashboard/CityInsights'
import ActivityRecommendations from '../../../components/Recommendations/ActivityRecommendations'
import ItineraryStats from '../../../components/Itinerary/ItineraryStats'
import TimeOptimizer from '../../../components/Itinerary/TimeOptimizer'
import HiddenGems from '../../../components/Japan/HiddenGems'
import CulturalExperiences from '../../../components/Japan/CulturalExperiences'
import SeasonalEvents from '../../../components/Japan/SeasonalEvents'
import OnsenGuide from '../../../components/Japan/OnsenGuide'
import FoodSpecialties from '../../../components/Japan/FoodSpecialties'
import AnimeCulture from '../../../components/Japan/AnimeCulture'
import CulturalEtiquette from '../../../components/Japan/CulturalEtiquette'
import TransportationGuide from '../../../components/Japan/TransportationGuide'
import EmergencyInfo from '../../../components/Japan/EmergencyInfo'
import LanguageHelper from '../../../components/Japan/LanguageHelper'
import RyokanGuide from '../../../components/Japan/RyokanGuide'
import PhotographySpots from '../../../components/Japan/PhotographySpots'
import ShoppingGuide from '../../../components/Japan/ShoppingGuide'
import NightlifeGuide from '../../../components/Japan/NightlifeGuide'
import Button from '../../../components/UI/Button'
import { DayScheduleSkeleton } from '../../../components/UI/LoadingSkeleton'
import { formatCoordinates } from '../../../services/maps'

type ViewMode = 'schedule' | 'timeline' | 'map'

export default function ItineraryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { itinerary, loading, error, reload } = useItinerary(params.id as string)
  const [showAdjustModal, setShowAdjustModal] = useState(false)
  const [showCollaborateModal, setShowCollaborateModal] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('schedule')
  const [detectedLocation, setDetectedLocation] = useState<{
    city: string
    coordinates: [number, number]
  } | null>(null)

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
              {itinerary.description && (
                <p className="text-gray-600 mt-2">{itinerary.description}</p>
              )}
              <div className="mt-4">
                <ItineraryTags
                  itineraryId={itinerary.id}
                  tags={itinerary.tags || []}
                  onUpdate={(tags) => {
                    // In production, this would update the itinerary in the database
                    console.log('Tags updated:', tags)
                  }}
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <LocationDetector
                onLocationDetected={(city, coordinates) => {
                  setDetectedLocation({ city, coordinates })
                }}
              />
              <FavoriteButton itineraryId={itinerary.id} />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdjustModal(true)}
              >
                🔄 Adjust Plan
              </Button>
              <CalendarExport itinerary={itinerary} />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCollaborateModal(true)}
              >
                👥 Collaborate
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

        <div className="mb-6">
          <div className="flex gap-2 border-b border-gray-200">
            <button
              onClick={() => setViewMode('schedule')}
              className={`px-4 py-2 font-medium transition-colors ${
                viewMode === 'schedule'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Schedule
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-4 py-2 font-medium transition-colors ${
                viewMode === 'timeline'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Timeline
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-2 font-medium transition-colors ${
                viewMode === 'map'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Map
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {viewMode === 'schedule' && (
              <div className="space-y-6">
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
            )}
            
            {viewMode === 'timeline' && (
              <TimelineView itinerary={itinerary} />
            )}
            
            {viewMode === 'map' && (
              <MapView itinerary={itinerary} />
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <ItineraryStats itinerary={itinerary} />
              <TimeOptimizer
                itinerary={itinerary}
                onOptimize={(optimized) => {
                  // In production, this would update the itinerary
                  console.log('Optimized itinerary:', optimized)
                }}
              />
              {detectedLocation && (
                <NearbyPlaces
                  coordinates={detectedLocation.coordinates}
                  city={detectedLocation.city}
                  onAddToItinerary={(activity) => {
                    // In production, this would add to itinerary
                    console.log('Adding activity:', activity)
                  }}
                />
              )}
              {itinerary.cities.length > 0 && (
                <>
                  <HiddenGems
                    city={itinerary.cities[0]}
                    onAddToItinerary={(activity) => {
                      console.log('Adding hidden gem:', activity)
                    }}
                  />
                  <CulturalExperiences
                    city={itinerary.cities[0]}
                    onAddToItinerary={(activity) => {
                      console.log('Adding cultural experience:', activity)
                    }}
                  />
                  <SeasonalEvents
                    city={itinerary.cities[0]}
                    onAddToItinerary={(activity) => {
                      console.log('Adding seasonal event:', activity)
                    }}
                  />
                  <OnsenGuide
                    city={itinerary.cities[0]}
                    onAddToItinerary={(activity) => {
                      console.log('Adding onsen:', activity)
                    }}
                  />
                  <FoodSpecialties
                    city={itinerary.cities[0]}
                    onAddToItinerary={(activity) => {
                      console.log('Adding food specialty:', activity)
                    }}
                  />
                  <AnimeCulture
                    city={itinerary.cities[0]}
                    onAddToItinerary={(activity) => {
                      console.log('Adding anime spot:', activity)
                    }}
                  />
                  <PhotographySpots
                    city={itinerary.cities[0]}
                    onAddToItinerary={(activity) => {
                      console.log('Adding photo spot:', activity)
                    }}
                  />
                  <ShoppingGuide
                    city={itinerary.cities[0]}
                    onAddToItinerary={(activity) => {
                      console.log('Adding shopping spot:', activity)
                    }}
                  />
                  <NightlifeGuide
                    city={itinerary.cities[0]}
                    onAddToItinerary={(activity) => {
                      console.log('Adding nightlife spot:', activity)
                    }}
                  />
                  <ActivityRecommendations
                    city={itinerary.cities[0]}
                    interests={itinerary.tags}
                    onAddToItinerary={(activity) => {
                      console.log('Adding recommended activity:', activity)
                    }}
                  />
                  <CityInsights city={itinerary.cities[0]} />
                </>
              )}
              <CulturalEtiquette />
              <LanguageHelper />
              <TransportationGuide />
              <RyokanGuide
                city={itinerary.cities[0]}
                onAddToItinerary={(activity) => {
                  console.log('Adding ryokan:', activity)
                }}
              />
              <EmergencyInfo />
              <CostBreakdown itinerary={itinerary} />
              <ExpenseTracker itineraryId={itinerary.id} />
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

        {showCollaborateModal && (
          <CollaborateModal
            itineraryId={itinerary.id}
            onClose={() => setShowCollaborateModal(false)}
          />
        )}
      </div>
    </main>
  )
}

