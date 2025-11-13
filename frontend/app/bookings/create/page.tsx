'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BookingForm from '../../../components/Booking/BookingForm'
import Button from '../../../components/UI/Button'

export default function CreateBookingPage() {
  const router = useRouter()
  const [bookingType, setBookingType] = useState<'hotel' | 'restaurant' | 'activity'>('hotel')

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            ← Back
          </Button>
          <h1 className="text-4xl font-bold mb-2">Create Booking</h1>
          <p className="text-lg text-gray-600">
            Book a hotel, restaurant, or activity
          </p>
        </div>

        <div className="bg-white rounded-card shadow-sm p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Booking Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setBookingType('hotel')}
                className={`px-4 py-3 rounded-button font-medium transition-colors ${
                  bookingType === 'hotel'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🏨 Hotel
              </button>
              <button
                onClick={() => setBookingType('restaurant')}
                className={`px-4 py-3 rounded-button font-medium transition-colors ${
                  bookingType === 'restaurant'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🍽️ Restaurant
              </button>
              <button
                onClick={() => setBookingType('activity')}
                className={`px-4 py-3 rounded-button font-medium transition-colors ${
                  bookingType === 'activity'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🎯 Activity
              </button>
            </div>
          </div>

          <BookingForm
            bookingType={bookingType}
            onSuccess={() => router.push('/bookings')}
            onCancel={() => router.back()}
          />
        </div>
      </div>
    </main>
  )
}

