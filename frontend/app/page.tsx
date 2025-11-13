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
import { deleteItinerary } from '../services/itinerary'
import type { Itinerary } from '../services/itinerary'

export default function Home() {
  const router = useRouter()
  const { showToast } = useToast()
  const { itineraries, loading, error, reload } = useUserItineraries()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCity, setFilterCity] = useState('')

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this itinerary?')) {
      try {
        await deleteItinerary(id)
        showToast('Itinerary deleted successfully', 'success')
        reload()
      } catch (err: any) {
        showToast(err.message || 'Failed to delete itinerary', 'error')
      }
    }
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
              <div className="bg-white rounded-card shadow-sm p-12 text-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  No itineraries yet
                </h2>
                <p className="text-gray-600 mb-6">
                  Create your first AI-powered itinerary to get started
                </p>
                <Link href="/itinerary/create">
                  <Button size="lg">Create Your First Itinerary</Button>
                </Link>
              </div>
            ) : filteredItineraries.length === 0 ? (
              <div className="bg-white rounded-card shadow-sm p-12 text-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  No matching itineraries
                </h2>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('')
                    setFilterCity('')
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItineraries.map((itinerary) => (
                  <ItineraryCard
                    key={itinerary.id}
                    itinerary={itinerary}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}

