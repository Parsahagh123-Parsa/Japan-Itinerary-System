'use client'

import { useState, useEffect } from 'react'
import { getUserBookings, cancelBooking } from '../../services/bookings'
import BookingCard from '../../components/Booking/BookingCard'
import Button from '../../components/UI/Button'
import type { Booking } from '../../services/bookings'

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadBookings = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getUserBookings()
      setBookings(data)
    } catch (err: any) {
      setError(err.message || 'Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBookings()
  }, [])

  const handleCancel = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return
    }

    try {
      await cancelBooking(id)
      loadBookings()
    } catch (err: any) {
      alert(err.message || 'Failed to cancel booking')
    }
  }

  const filteredBookings = {
    all: bookings,
    confirmed: bookings.filter((b) => b.status === 'confirmed'),
    pending: bookings.filter((b) => b.status === 'pending'),
    cancelled: bookings.filter((b) => b.status === 'cancelled'),
  }

  const [activeFilter, setActiveFilter] = useState<'all' | 'confirmed' | 'pending' | 'cancelled'>('all')

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">My Bookings</h1>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading bookings...</p>
          </div>
        )}

        {error && (
          <div className="bg-error/10 border border-error rounded-card p-4 text-error mb-6">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="flex gap-2 mb-6 flex-wrap">
              <Button
                variant={activeFilter === 'all' ? 'primary' : 'outline'}
                onClick={() => setActiveFilter('all')}
                size="sm"
              >
                All ({filteredBookings.all.length})
              </Button>
              <Button
                variant={activeFilter === 'confirmed' ? 'primary' : 'outline'}
                onClick={() => setActiveFilter('confirmed')}
                size="sm"
              >
                Confirmed ({filteredBookings.confirmed.length})
              </Button>
              <Button
                variant={activeFilter === 'pending' ? 'primary' : 'outline'}
                onClick={() => setActiveFilter('pending')}
                size="sm"
              >
                Pending ({filteredBookings.pending.length})
              </Button>
              <Button
                variant={activeFilter === 'cancelled' ? 'primary' : 'outline'}
                onClick={() => setActiveFilter('cancelled')}
                size="sm"
              >
                Cancelled ({filteredBookings.cancelled.length})
              </Button>
            </div>

            {filteredBookings[activeFilter].length === 0 ? (
              <div className="bg-white rounded-card shadow-sm p-12 text-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  No bookings found
                </h2>
                <p className="text-gray-600">
                  {activeFilter === 'all'
                    ? "You haven't made any bookings yet"
                    : `No ${activeFilter} bookings`}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBookings[activeFilter].map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onCancel={handleCancel}
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

