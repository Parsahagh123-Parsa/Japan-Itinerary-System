'use client'

import { useState } from 'react'
import Link from 'next/link'
import Button from '../UI/Button'
import { formatCoordinates } from '../../services/maps'
import type { Activity } from '../../services/itinerary'

interface ActivityItemProps {
  activity: Activity
  onBook?: (activity: Activity) => void
}

export default function ActivityItem({ activity, onBook }: ActivityItemProps) {
  const [showDetails, setShowDetails] = useState(false)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'restaurant':
        return '🍽️'
      case 'attraction':
        return '🏛️'
      case 'culture':
        return '🎭'
      case 'nature':
        return '🌲'
      case 'nightlife':
        return '🌃'
      default:
        return '📍'
    }
  }

  return (
    <div className="border border-gray-200 rounded-card p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{getTypeIcon(activity.type)}</span>
            <h4 className="font-semibold text-gray-900">{activity.name}</h4>
          </div>
          <p className="text-sm text-gray-600 mb-1">
            {activity.startTime} - {activity.endTime}
          </p>
          <p className="text-sm text-gray-700">{activity.location.name}</p>
        </div>
        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
          {activity.type}
        </span>
      </div>

      {activity.notes && (
        <p className="text-sm text-gray-600 mb-3 italic">{activity.notes}</p>
      )}

      <div className="flex gap-2 flex-wrap">
        <Link
          href={`/map?from=${formatCoordinates(
            activity.location.coordinates[0],
            activity.location.coordinates[1]
          )}`}
        >
          <Button variant="outline" size="sm">
            View on Map
          </Button>
        </Link>
        {onBook && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onBook(activity)}
          >
            Book
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide' : 'Show'} Details
        </Button>
      </div>

      {showDetails && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-600 mb-1">
            <span className="font-medium">Address:</span> {activity.location.address}
          </p>
          <p className="text-xs text-gray-600">
            <span className="font-medium">Coordinates:</span>{' '}
            {activity.location.coordinates[0]}, {activity.location.coordinates[1]}
          </p>
        </div>
      )}
    </div>
  )
}

