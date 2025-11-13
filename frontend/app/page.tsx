'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useUserItineraries } from '../hooks/useItinerary'
import ItineraryCard from '../components/Itinerary/ItineraryCard'
import Button from '../components/UI/Button'
import { useToast } from '../components/UI/ToastContainer'
import { deleteItinerary } from '../services/itinerary'

export default function Home() {
  const router = useRouter()
  const { showToast } = useToast()
  const { itineraries, loading, error, reload } = useUserItineraries()

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

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your itineraries...</p>
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
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {itineraries.map((itinerary) => (
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

