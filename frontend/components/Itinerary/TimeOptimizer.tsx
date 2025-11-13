'use client'

import { useState } from 'react'
import Button from '../UI/Button'
import { useToast } from '../UI/ToastContainer'
import type { Itinerary } from '../../services/itinerary'

interface TimeOptimizerProps {
  itinerary: Itinerary
  onOptimize: (optimizedItinerary: Itinerary) => void
}

export default function TimeOptimizer({
  itinerary,
  onOptimize,
}: TimeOptimizerProps) {
  const { showToast } = useToast()
  const [optimizing, setOptimizing] = useState(false)

  const calculateDistance = (
    coord1: [number, number],
    coord2: [number, number]
  ): number => {
    const R = 6371 // Earth's radius in km
    const dLat = ((coord2[0] - coord1[0]) * Math.PI) / 180
    const dLon = ((coord2[1] - coord1[1]) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((coord1[0] * Math.PI) / 180) *
        Math.cos((coord2[0] * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const optimizeDay = (day: typeof itinerary.days[0]) => {
    if (day.activities.length <= 1) return day

    // Sort activities by location proximity
    const sortedActivities = [...day.activities].sort((a, b) => {
      // Simple optimization: sort by coordinates
      // In production, would use more sophisticated routing
      const latDiff = a.location.coordinates[0] - b.location.coordinates[0]
      const lngDiff = a.location.coordinates[1] - b.location.coordinates[1]
      return latDiff + lngDiff
    })

    // Recalculate times based on travel time
    let currentTime = new Date(`${day.date}T09:00`)
    const optimizedActivities = sortedActivities.map((activity, index) => {
      if (index > 0) {
        const prevActivity = sortedActivities[index - 1]
        const distance = calculateDistance(
          prevActivity.location.coordinates,
          activity.location.coordinates
        )
        // Estimate travel time: 5 min per km + 15 min buffer
        const travelMinutes = Math.ceil(distance * 5) + 15
        currentTime = new Date(
          currentTime.getTime() + travelMinutes * 60000
        )
      }

      const startTime = `${String(currentTime.getHours()).padStart(2, '0')}:${String(currentTime.getMinutes()).padStart(2, '0')}`
      
      // Estimate activity duration (default 2 hours)
      const duration = 120
      const endTime = new Date(currentTime.getTime() + duration * 60000)
      const endTimeStr = `${String(endTime.getHours()).padStart(2, '0')}:${String(endTime.getMinutes()).padStart(2, '0')}`

      currentTime = endTime

      return {
        ...activity,
        startTime,
        endTime: endTimeStr,
      }
    })

    return {
      ...day,
      activities: optimizedActivities,
    }
  }

  const handleOptimize = async () => {
    setOptimizing(true)
    try {
      // Simulate optimization
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const optimizedDays = itinerary.days.map(optimizeDay)
      const optimizedItinerary: Itinerary = {
        ...itinerary,
        days: optimizedDays,
      }

      onOptimize(optimizedItinerary)
      showToast('Itinerary optimized for efficient routing!', 'success')
    } catch (err) {
      showToast('Failed to optimize itinerary', 'error')
    } finally {
      setOptimizing(false)
    }
  }

  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">⚡ Optimize Route</h3>
          <p className="text-sm text-gray-600 mt-1">
            Reorder activities to minimize travel time
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleOptimize}
          isLoading={optimizing}
        >
          Optimize
        </Button>
      </div>

      <div className="text-xs text-gray-500 space-y-1">
        <p>• Activities will be reordered by location proximity</p>
        <p>• Travel times will be calculated and added</p>
        <p>• Start/end times will be adjusted automatically</p>
      </div>
    </div>
  )
}

