'use client'

import { format } from 'date-fns'
import Button from '../UI/Button'
import type { Booking } from '../../services/bookings'

interface BookingCardProps {
  booking: Booking
  onCancel?: (id: string) => void
}

export default function BookingCard({ booking, onCancel }: BookingCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success/10 text-success border-success'
      case 'pending':
        return 'bg-warning/10 text-warning border-warning'
      case 'cancelled':
        return 'bg-gray-100 text-gray-600 border-gray-300'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-300'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'hotel':
        return '🏨 Hotel'
      case 'restaurant':
        return '🍽️ Restaurant'
      case 'activity':
        return '🎯 Activity'
      default:
        return type
    }
  }

  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {getTypeLabel(booking.bookingType)}
          </h3>
          <p className="text-sm text-gray-600">
            Booked on {format(new Date(booking.bookedAt), 'MMM d, yyyy')}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            booking.status
          )}`}
        >
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </div>

      {booking.bookingDetails && (
        <div className="mb-4 space-y-2">
          {booking.bookingDetails.name && (
            <p className="text-sm text-gray-700">
              <span className="font-medium">Name:</span> {booking.bookingDetails.name}
            </p>
          )}
          {booking.bookingDetails.date && (
            <p className="text-sm text-gray-700">
              <span className="font-medium">Date:</span>{' '}
              {format(new Date(booking.bookingDetails.date), 'MMM d, yyyy')}
            </p>
          )}
          {booking.bookingDetails.time && (
            <p className="text-sm text-gray-700">
              <span className="font-medium">Time:</span> {booking.bookingDetails.time}
            </p>
          )}
        </div>
      )}

      {onCancel && booking.status !== 'cancelled' && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onCancel(booking.id)}
          className="w-full"
        >
          Cancel Booking
        </Button>
      )}
    </div>
  )
}

