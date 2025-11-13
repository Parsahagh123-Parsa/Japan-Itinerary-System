'use client'

import { useState, FormEvent } from 'react'
import Button from '../UI/Button'
import Input from '../UI/Input'
import { useToast } from '../UI/ToastContainer'
import type { Activity } from '../../services/itinerary'
import { bookHotel, bookRestaurant, bookActivity } from '../../services/bookings'

interface BookingModalProps {
  activity: Activity
  onClose: () => void
  onSuccess: () => void
}

export default function BookingModal({
  activity,
  onClose,
  onSuccess,
}: BookingModalProps) {
  const { showToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    date: '',
    time: activity.startTime,
    guests: '1',
    notes: '',
  })

  const bookingType =
    activity.type === 'restaurant'
      ? 'restaurant'
      : activity.type === 'attraction' || activity.type === 'culture'
      ? 'activity'
      : 'hotel'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const bookingDetails = {
        name: activity.name,
        date: formData.date,
        time: formData.time,
        guests: parseInt(formData.guests),
        notes: formData.notes,
        location: activity.location,
      }

      // Create a temporary activity ID or use the activity's ID if available
      const activityId = (activity as any).id || 'temp-' + Date.now()

      if (bookingType === 'hotel') {
        await bookHotel(activityId, bookingDetails)
      } else if (bookingType === 'restaurant') {
        await bookRestaurant(activityId, bookingDetails)
      } else {
        await bookActivity(activityId, bookingDetails)
      }

      showToast('Booking created successfully!', 'success')
      onSuccess()
      onClose()
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create booking'
      setError(errorMessage)
      showToast(errorMessage, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-card shadow-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4">Book {activity.name}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />

          <Input
            label="Time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />

          {bookingType === 'restaurant' && (
            <Input
              label="Number of Guests"
              type="number"
              min="1"
              value={formData.guests}
              onChange={(e) =>
                setFormData({ ...formData, guests: e.target.value })
              }
              required
            />
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes (optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
            />
          </div>

          {error && (
            <div className="p-4 bg-error/10 border border-error rounded-card text-error text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={loading} className="flex-1">
              Confirm Booking
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

