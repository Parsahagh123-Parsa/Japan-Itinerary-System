'use client'

import { useState } from 'react'
import Button from '../UI/Button'
import { useToast } from '../UI/ToastContainer'
import type { Itinerary } from '../../services/itinerary'

interface ItineraryComparisonProps {
  itineraries: Itinerary[]
  onSelect?: (itinerary: Itinerary) => void
}

export default function ItineraryComparison({
  itineraries,
  onSelect,
}: ItineraryComparisonProps) {
  const { showToast } = useToast()
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  if (itineraries.length < 2) {
    return null
  }

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else if (newSelected.size < 2) {
      newSelected.add(id)
    } else {
      showToast('Please select maximum 2 itineraries to compare', 'warning')
      return
    }
    setSelectedIds(newSelected)
  }

  const selectedItineraries = itineraries.filter((it) =>
    selectedIds.has(it.id)
  )

  const getComparisonData = () => {
    if (selectedItineraries.length !== 2) return null

    const [it1, it2] = selectedItineraries

    const days1 = it1.days.length
    const days2 = it2.days.length

    const activities1 = it1.days.reduce(
      (sum, day) => sum + day.activities.length,
      0
    )
    const activities2 = it2.days.reduce(
      (sum, day) => sum + day.activities.length,
      0
    )

    const cost1 = it1.totalCost || 0
    const cost2 = it2.totalCost || 0

    const cities1 = it1.cities.length
    const cities2 = it2.cities.length

    return {
      days: { it1: days1, it2: days2 },
      activities: { it1: activities1, it2: activities2 },
      cost: { it1: cost1, it2: cost2 },
      cities: { it1: cities1, it2: cities2 },
    }
  }

  const comparison = getComparisonData()

  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">🔍 Compare Itineraries</h3>

      <div className="space-y-3 mb-4">
        {itineraries.map((it) => (
          <label
            key={it.id}
            className="flex items-center gap-3 p-3 border border-gray-200 rounded-card cursor-pointer hover:border-primary transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedIds.has(it.id)}
              onChange={() => toggleSelection(it.id)}
              className="w-4 h-4 text-primary focus:ring-primary"
            />
            <div className="flex-1">
              <div className="font-medium">{it.title}</div>
              <div className="text-sm text-gray-600">
                {it.days.length} days • {it.cities.join(', ')}
              </div>
            </div>
          </label>
        ))}
      </div>

      {comparison && (
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-medium mb-3">Comparison</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">
                {selectedItineraries[0].title}
              </div>
              <div className="space-y-2 text-sm">
                <div>Days: {comparison.days.it1}</div>
                <div>Activities: {comparison.activities.it1}</div>
                <div>Cities: {comparison.cities.it1}</div>
                <div>Cost: ¥{comparison.cost.it1.toLocaleString()}</div>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">
                {selectedItineraries[1].title}
              </div>
              <div className="space-y-2 text-sm">
                <div>Days: {comparison.days.it2}</div>
                <div>Activities: {comparison.activities.it2}</div>
                <div>Cities: {comparison.cities.it2}</div>
                <div>Cost: ¥{comparison.cost.it2.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedIds.size > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedIds(new Set())}
            className="w-full"
          >
            Clear Selection
          </Button>
        </div>
      )}
    </div>
  )
}

