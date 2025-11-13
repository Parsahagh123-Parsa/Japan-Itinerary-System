'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { useUserItineraries } from '../hooks/useItinerary'
import ItineraryCard from '../components/Itinerary/ItineraryCard'
import Button from '../components/UI/Button'
import Input from '../components/UI/Input'
import { ItineraryCardSkeleton } from '../components/UI/LoadingSkeleton'
import { useToast } from '../components/UI/ToastContainer'
import ConfirmDialog from '../components/UI/ConfirmDialog'
import EmptyState from '../components/UI/EmptyState'
import QuickActions from '../components/Dashboard/QuickActions'
import StatsCard from '../components/Dashboard/StatsCard'
import { deleteItinerary } from '../services/itinerary'
import type { Itinerary } from '../services/itinerary'

export default function Home() {
  const router = useRouter()
  const { showToast } = useToast()
  const { itineraries, loading, error, reload } = useUserItineraries()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCity, setFilterCity] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean
    itineraryId: string | null
    itineraryTitle: string
  }>({
    isOpen: false,
    itineraryId: null,
    itineraryTitle: '',
  })

  const handleDeleteClick = (id: string, title: string) => {
    setDeleteConfirm({
      isOpen: true,
      itineraryId: id,
      itineraryTitle: title,
    })
  }

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.itineraryId) return

    try {
      await deleteItinerary(deleteConfirm.itineraryId)
      showToast('Itinerary deleted successfully', 'success')
      reload()
      setDeleteConfirm({ isOpen: false, itineraryId: null, itineraryTitle: '' })
    } catch (err: any) {
      showToast(err.message || 'Failed to delete itinerary', 'error')
    }
  }

  const handleDeleteCancel = () => {
    setDeleteConfirm({ isOpen: false, itineraryId: null, itineraryTitle: '' })
  }

  // Filter and search itineraries
  const filteredItineraries = itineraries.filter((itinerary: Itinerary) => {
    const matchesSearch =
      searchQuery === '' ||
      itinerary.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      itinerary.cities.some((city) =>
        city.toLowerCase().includes(searchQuery.toLowerCase())
      )

    const matchesCity =
      filterCity === '' || itinerary.cities.includes(filterCity)

    return matchesSearch && matchesCity
  })

  // Get unique cities from all itineraries
  const uniqueCities = Array.from(
    new Set(itineraries.flatMap((it: Itinerary) => it.cities))
  ).sort()

  // Calculate statistics
  const totalDays = itineraries.reduce((sum, it) => {
    const start = new Date(it.startDate)
    const end = new Date(it.endDate)
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
    return sum + days
  }, 0)

  const totalCost = itineraries.reduce((sum, it) => sum + (it.totalCost || 0), 0)
  const uniqueCitiesCount = uniqueCities.length

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Japan Itinerary System</h1>
            <p className="text-lg text-gray-600">
              AI-powered travel planning for your Japan adventure
            </p>
          </div>
          <Link href="/itinerary/create">
            <Button size="lg">Create New Itinerary</Button>
          </Link>
        </div>

        {!loading && itineraries.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatsCard
                title="Total Itineraries"
                value={itineraries.length}
                icon="📋"
              />
              <StatsCard
                title="Total Days Planned"
                value={totalDays}
                icon="📅"
              />
              <StatsCard
                title="Cities Visited"
                value={uniqueCitiesCount}
                icon="🏙️"
              />
            </div>
            <QuickActions />
          </>
        )}

        {!loading && itineraries.length > 0 && (
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Search itineraries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className="px-4 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Cities</option>
              {uniqueCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ItineraryCardSkeleton />
            <ItineraryCardSkeleton />
            <ItineraryCardSkeleton />
          </div>
        )}

        {error && (
          <div className="bg-error/10 border border-error rounded-card p-4 text-error mb-6">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {itineraries.length === 0 ? (
              <EmptyState
                icon="🗾"
                title="No itineraries yet"
                description="Create your first AI-powered itinerary to get started planning your Japan adventure"
                action={{
                  label: 'Create Your First Itinerary',
                  onClick: () => router.push('/itinerary/create'),
                }}
              />
            ) : filteredItineraries.length === 0 ? (
              <EmptyState
                icon="🔍"
                title="No matching itineraries"
                description="Try adjusting your search or filter criteria to find what you're looking for"
                action={{
                  label: 'Clear Filters',
                  onClick: () => {
                    setSearchQuery('')
                    setFilterCity('')
                  },
                }}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItineraries.map((itinerary) => (
                  <ItineraryCard
                    key={itinerary.id}
                    itinerary={itinerary}
                    onDelete={(id) => handleDeleteClick(id, itinerary.title)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        <ConfirmDialog
          isOpen={deleteConfirm.isOpen}
          title="Delete Itinerary"
          message={`Are you sure you want to delete "${deleteConfirm.itineraryTitle}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      </div>
    </main>
  )
}

