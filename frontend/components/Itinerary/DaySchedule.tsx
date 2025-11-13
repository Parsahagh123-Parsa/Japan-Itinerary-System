'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import ActivityItem from './ActivityItem'
import BookingModal from '../Booking/BookingModal'
import WeatherWidget from '../Weather/WeatherWidget'
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

  // Get coordinates from first activity for weather
  const coordinates =
    day.activities.length > 0
      ? day.activities[0].location.coordinates
      : undefined

  // Get city name from first activity location
  const city =
    day.activities.length > 0 ? day.activities[0].location.name : ''

  return (
    <div className="bg-white rounded-card shadow-sm p-6 mb-6">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Day {day.day}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {format(date, 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
          {coordinates && (
            <WeatherWidget
              city={city}
              date={day.date}
              coordinates={coordinates}
            />
          )}
        </div>
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

