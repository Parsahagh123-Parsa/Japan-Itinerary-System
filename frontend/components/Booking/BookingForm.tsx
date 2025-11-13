'use client'

import { useState, FormEvent } from 'react'
import Button from '../UI/Button'
import Input from '../UI/Input'
import { useToast } from '../UI/ToastContainer'
import { bookHotel, bookRestaurant, bookActivity } from '../../services/bookings'

interface BookingFormProps {
  bookingType: 'hotel' | 'restaurant' | 'activity'
  activityId?: string
  activityName?: string
  onSuccess?: () => void
  onCancel?: () => void
}

export default function BookingForm({
  bookingType,
  activityId,
  activityName,
  onSuccess,
  onCancel,
}: BookingFormProps) {
  const { showToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '1',
    checkIn: '',
    checkOut: '',
    notes: '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const bookingDetails: Record<string, any> = {
        name: activityName || '',
        notes: formData.notes,
      }

      if (bookingType === 'hotel') {
        bookingDetails.checkIn = formData.checkIn
        bookingDetails.checkOut = formData.checkOut
      } else {
        bookingDetails.date = formData.date
        bookingDetails.time = formData.time
        if (bookingType === 'restaurant') {
          bookingDetails.guests = parseInt(formData.guests)
        }
      }

      const id = activityId || 'temp-' + Date.now()

      if (bookingType === 'hotel') {
        await bookHotel(id, bookingDetails)
      } else if (bookingType === 'restaurant') {
        await bookRestaurant(id, bookingDetails)
      } else {
        await bookActivity(id, bookingDetails)
      }

      showToast('Booking created successfully!', 'success')
      if (onSuccess) onSuccess()
    } catch (err: any) {
      showToast(err.message || 'Failed to create booking', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {bookingType === 'hotel' ? (
        <>
          <Input
            label="Check-in Date"
            type="date"
            value={formData.checkIn}
            onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
            required
          />
          <Input
            label="Check-out Date"
            type="date"
            value={formData.checkOut}
            onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
            required
          />
        </>
      ) : (
        <>
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
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              required
            />
          )}
        </>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Notes (optional)
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full px-4 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
          rows={3}
        />
      </div>

      <div className="flex gap-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
        )}
        <Button type="submit" isLoading={loading} className="flex-1">
          Confirm Booking
        </Button>
      </div>
    </form>
  )
}

