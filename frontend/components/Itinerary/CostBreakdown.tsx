'use client'

import type { Itinerary } from '../../services/itinerary'

interface CostBreakdownProps {
  itinerary: Itinerary
}

export default function CostBreakdown({ itinerary }: CostBreakdownProps) {
  if (!itinerary.totalCost) {
    return null
  }

  // Calculate cost per day
  const startDate = new Date(itinerary.startDate)
  const endDate = new Date(itinerary.endDate)
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
  const costPerDay = Math.round(itinerary.totalCost / days)

  // Estimate breakdown (this could be enhanced with actual booking data)
  const breakdown = {
    accommodation: Math.round(itinerary.totalCost * 0.4),
    food: Math.round(itinerary.totalCost * 0.3),
    activities: Math.round(itinerary.totalCost * 0.2),
    transportation: Math.round(itinerary.totalCost * 0.1),
  }

  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-4">Cost Breakdown</h3>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700">Total Estimated Cost</span>
          <span className="text-2xl font-bold text-primary">
            ¥{itinerary.totalCost.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Per Day Average</span>
          <span>¥{costPerDay.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-700">Accommodation</span>
            <span className="text-sm font-medium">¥{breakdown.accommodation.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: '40%' }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-700">Food & Dining</span>
            <span className="text-sm font-medium">¥{breakdown.food.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-accent h-2 rounded-full"
              style={{ width: '30%' }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-700">Activities</span>
            <span className="text-sm font-medium">¥{breakdown.activities.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-success h-2 rounded-full"
              style={{ width: '20%' }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-700">Transportation</span>
            <span className="text-sm font-medium">¥{breakdown.transportation.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-warning h-2 rounded-full"
              style={{ width: '10%' }}
            ></div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-500 italic">
        * Estimated breakdown based on typical travel expenses
      </p>
    </div>
  )
}

