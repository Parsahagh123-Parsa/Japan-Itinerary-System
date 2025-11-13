'use client'

import { useMemo } from 'react'
import type { Itinerary } from '../../services/itinerary'

interface ItineraryStatsProps {
  itinerary: Itinerary
}

export default function ItineraryStats({ itinerary }: ItineraryStatsProps) {
  const stats = useMemo(() => {
    const totalActivities = itinerary.days.reduce(
      (sum, day) => sum + day.activities.length,
      0
    )

    const activityTypes = new Map<string, number>()
    itinerary.days.forEach((day) => {
      day.activities.forEach((activity) => {
        const count = activityTypes.get(activity.type) || 0
        activityTypes.set(activity.type, count + 1)
      })
    })

    const totalDistance = 0 // Would calculate from coordinates in production
    const avgActivityDuration = 0 // Would calculate from start/end times

    const uniqueLocations = new Set<string>()
    itinerary.days.forEach((day) => {
      day.activities.forEach((activity) => {
        uniqueLocations.add(activity.location.name)
      })
    })

    return {
      totalActivities,
      totalDays: itinerary.days.length,
      uniqueLocations: uniqueLocations.size,
      activityTypes: Array.from(activityTypes.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5),
      totalCost: itinerary.totalCost || 0,
    }
  }, [itinerary])

  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">📊 Itinerary Statistics</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-card">
          <div className="text-2xl font-bold text-primary">{stats.totalDays}</div>
          <div className="text-xs text-gray-600 mt-1">Days</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-card">
          <div className="text-2xl font-bold text-primary">{stats.totalActivities}</div>
          <div className="text-xs text-gray-600 mt-1">Activities</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-card">
          <div className="text-2xl font-bold text-primary">{stats.uniqueLocations}</div>
          <div className="text-xs text-gray-600 mt-1">Locations</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-card">
          <div className="text-2xl font-bold text-primary">
            ¥{stats.totalCost.toLocaleString()}
          </div>
          <div className="text-xs text-gray-600 mt-1">Estimated Cost</div>
        </div>
      </div>

      {stats.activityTypes.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Activity Breakdown
          </h4>
          <div className="space-y-2">
            {stats.activityTypes.map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{type}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{
                        width: `${(count / stats.totalActivities) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-6 text-right">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

