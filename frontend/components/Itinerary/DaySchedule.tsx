'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import ActivityItem from './ActivityItem'
import BookingModal from '../Booking/BookingModal'
import type { DaySchedule as DayScheduleType, Activity } from '../../services/itinerary'

interface DayScheduleProps {
  day: DayScheduleType
  onBookingSuccess?: () => void
}

export default function DaySchedule({ day, onBookingSuccess }: DayScheduleProps) {
  const date = new Date(day.date)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)

  const handleBook = (activity: Activity) => {
    setSelectedActivity(activity)
  }

  const handleBookingSuccess = () => {
    if (onBookingSuccess) {
      onBookingSuccess()
    }
  }

  return (
    <div className="bg-white rounded-card shadow-sm p-6 mb-6">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h3 className="text-xl font-semibold text-gray-900">
          Day {day.day}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {format(date, 'EEEE, MMMM d, yyyy')}
        </p>
      </div>

      <div className="space-y-4">
        {day.activities.map((activity, index) => (
          <ActivityItem
            key={index}
            activity={activity}
            onBook={handleBook}
          />
        ))}
      </div>

      {selectedActivity && (
        <BookingModal
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  )
}

