'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import Button from '../UI/Button'
import type { Itinerary } from '../../services/itinerary'

interface ItineraryCardProps {
  itinerary: Itinerary
  onDelete?: (id: string) => void
}

export default function ItineraryCard({ itinerary, onDelete }: ItineraryCardProps) {
  const startDate = new Date(itinerary.startDate)
  const endDate = new Date(itinerary.endDate)
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1

  return (
    <div className="bg-white rounded-card shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {itinerary.title}
          </h3>
          <p className="text-sm text-gray-600">
            {format(startDate, 'MMM d')} - {format(endDate, 'MMM d, yyyy')} • {days} days
          </p>
        </div>
        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(itinerary.id)}
            className="text-error hover:text-error-dark"
          >
            Delete
          </Button>
        )}
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {itinerary.cities.map((city) => (
            <span
              key={city}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
            >
              {city}
            </span>
          ))}
        </div>
      </div>

      {itinerary.totalCost && (
        <p className="text-sm text-gray-600 mb-4">
          Estimated cost: ¥{itinerary.totalCost.toLocaleString()}
        </p>
      )}

      <div className="flex gap-2">
        <Link href={`/itinerary/${itinerary.id}`} className="flex-1">
          <Button variant="primary" className="w-full">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  )
}

