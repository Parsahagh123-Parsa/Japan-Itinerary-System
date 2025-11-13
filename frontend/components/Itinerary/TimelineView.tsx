'use client'

import { format } from 'date-fns'
import type { Itinerary } from '../../services/itinerary'

interface TimelineViewProps {
  itinerary: Itinerary
}

export default function TimelineView({ itinerary }: TimelineViewProps) {
  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-6">Timeline View</h3>
      
      <div className="relative">
        {itinerary.days.map((day, dayIndex) => {
          const date = new Date(day.date)
          const isLast = dayIndex === itinerary.days.length - 1
          
          return (
            <div key={day.day} className="relative pb-8">
              {!isLast && (
                <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200"></div>
              )}
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  {day.day}
                </div>
                
                <div className="flex-1 pt-1">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {format(date, 'EEEE, MMMM d')}
                  </h4>
                  
                  <div className="space-y-3 mt-3">
                    {day.activities.map((activity, actIndex) => (
                      <div
                        key={actIndex}
                        className="border-l-2 border-primary pl-4 pb-3"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-primary">
                            {activity.startTime}
                          </span>
                          <span className="text-sm text-gray-600">-</span>
                          <span className="text-sm text-gray-600">
                            {activity.endTime}
                          </span>
                        </div>
                        <h5 className="font-medium text-gray-900">
                          {activity.name}
                        </h5>
                        <p className="text-sm text-gray-600">
                          {activity.location.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

