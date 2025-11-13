'use client'

import { useRouter } from 'next/navigation'
import ItineraryForm from '../../../components/Itinerary/ItineraryForm'
import Button from '../../../components/UI/Button'

export default function CreateItineraryPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            ← Back
          </Button>
          <h1 className="text-4xl font-bold mb-2">Create New Itinerary</h1>
          <p className="text-lg text-gray-600">
            Tell us about your trip and we'll generate a personalized itinerary
          </p>
        </div>

        <div className="bg-white rounded-card shadow-sm p-8">
          <ItineraryForm />
        </div>
      </div>
    </main>
  )
}

