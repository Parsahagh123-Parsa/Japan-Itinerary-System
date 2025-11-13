'use client'

import { format } from 'date-fns'
import type { DaySchedule as DayScheduleType } from '../../services/itinerary'

interface DayScheduleProps {
  day: DayScheduleType
}

export default function DaySchedule({ day }: DayScheduleProps) {
  const date = new Date(day.date)

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
          <div
            key={index}
            className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
          >
            <div className="flex-shrink-0 w-24 text-sm text-gray-600">
              <div className="font-medium">{activity.startTime}</div>
              <div className="text-xs">{activity.endTime}</div>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">
                {activity.name}
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                {activity.location.name}
              </p>
              <p className="text-xs text-gray-500 mb-2">
                {activity.location.address}
              </p>
              {activity.notes && (
                <p className="text-sm text-gray-700 italic">{activity.notes}</p>
              )}
              <span className="inline-block mt-2 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                {activity.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

