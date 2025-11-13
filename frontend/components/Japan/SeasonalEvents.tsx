'use client'

import { useState, useMemo } from 'react'
import Button from '../UI/Button'
import type { Activity } from '../../services/itinerary'

interface SeasonalEvent {
  id: string
  name: string
  type: 'festival' | 'seasonal' | 'cultural' | 'nature'
  month: number
  city: string
  description: string
  location: {
    name: string
    address: string
    coordinates: [number, number]
  }
  duration: string
  highlights: string[]
  tips: string[]
  estimatedCost?: number
  tags: string[]
}

const SEASONAL_EVENTS: SeasonalEvent[] = [
  {
    id: 'event-1',
    name: 'Cherry Blossom Viewing (Hanami)',
    type: 'seasonal',
    month: 4,
    city: 'Various',
    description: 'Celebrate spring under blooming sakura trees',
    location: {
      name: 'Parks throughout Japan',
      address: 'Various',
      coordinates: [35.6762, 139.6503],
    },
    duration: 'Late March - Early May',
    highlights: [
      'Picnic under cherry blossoms',
      'Evening illuminations',
      'Traditional hanami parties',
      'Photography opportunities',
    ],
    tips: [
      'Arrive early for popular spots',
      'Bring a picnic blanket',
      'Respect the trees and environment',
      'Check bloom forecasts',
    ],
    estimatedCost: 1000,
    tags: ['spring', 'nature', 'photography', 'culture'],
  },
  {
    id: 'event-2',
    name: 'Gion Matsuri',
    type: 'festival',
    month: 7,
    city: 'Kyoto',
    description: 'One of Japan\'s most famous festivals with elaborate floats',
    location: {
      name: 'Gion District',
      address: 'Gion, Kyoto',
      coordinates: [35.0038, 135.7750],
    },
    duration: 'July 1-31',
    highlights: [
      'Yamaboko Junko parade (July 17)',
      'Traditional floats (yamaboko)',
      'Street food vendors',
      'Traditional music and performances',
    ],
    tips: [
      'Book accommodations early',
      'Arrive very early for parade',
      'Try festival street food',
      'Wear comfortable shoes',
    ],
    estimatedCost: 0,
    tags: ['summer', 'festival', 'culture', 'traditional'],
  },
  {
    id: 'event-3',
    name: 'Autumn Leaves (Momiji)',
    type: 'nature',
    month: 11,
    city: 'Various',
    description: 'Brilliant fall colors throughout Japan',
    location: {
      name: 'Temples and mountains',
      address: 'Various',
      coordinates: [35.6762, 139.6503],
    },
    duration: 'October - December',
    highlights: [
      'Temple gardens in fall colors',
      'Mountain hiking trails',
      'Illuminated autumn leaves',
      'Traditional tea ceremonies',
    ],
    tips: [
      'Peak varies by region',
      'Visit early morning for photos',
      'Combine with onsen visit',
      'Check weather forecasts',
    ],
    estimatedCost: 500,
    tags: ['autumn', 'nature', 'photography', 'hiking'],
  },
  {
    id: 'event-4',
    name: 'Sapporo Snow Festival',
    type: 'festival',
    month: 2,
    city: 'Sapporo',
    description: 'Massive snow and ice sculptures',
    location: {
      name: 'Odori Park',
      address: 'Odori, Chuo Ward, Sapporo',
      coordinates: [43.0642, 141.3469],
    },
    duration: 'Early February',
    highlights: [
      'Giant snow sculptures',
      'Ice sculptures at night',
      'International snow sculpture contest',
      'Winter food stalls',
    ],
    tips: [
      'Dress very warmly',
      'Visit both day and night',
      'Try hot sake',
      'Book hotels months in advance',
    ],
    estimatedCost: 0,
    tags: ['winter', 'festival', 'art', 'culture'],
  },
  {
    id: 'event-5',
    name: 'Fireworks Festivals (Hanabi)',
    type: 'festival',
    month: 8,
    city: 'Various',
    description: 'Summer fireworks displays across Japan',
    location: {
      name: 'Rivers and parks',
      address: 'Various',
      coordinates: [35.6762, 139.6503],
    },
    duration: 'July - August',
    highlights: [
      'Massive firework displays',
      'Traditional yukata wearing',
      'Festival food',
      'Riverside viewing',
    ],
    tips: [
      'Arrive hours early for good spots',
      'Wear yukata if possible',
      'Bring a picnic',
      'Check specific dates',
    ],
    estimatedCost: 0,
    tags: ['summer', 'festival', 'night', 'culture'],
  },
  {
    id: 'event-6',
    name: 'Plum Blossom Viewing (Ume)',
    type: 'seasonal',
    month: 3,
    city: 'Various',
    description: 'Early spring plum blossoms before cherry blossoms',
    location: {
      name: 'Plum groves',
      address: 'Various',
      coordinates: [35.6762, 139.6503],
    },
    duration: 'February - March',
    highlights: [
      'Less crowded than cherry blossoms',
      'Fragrant flowers',
      'Early spring atmosphere',
      'Traditional plum festivals',
    ],
    tips: [
      'Great alternative to hanami',
      'Visit Kairakuen in Mito',
      'Try plum-flavored treats',
      'Combine with onsen',
    ],
    estimatedCost: 500,
    tags: ['spring', 'nature', 'peaceful', 'culture'],
  },
]

interface SeasonalEventsProps {
  city?: string
  onAddToItinerary?: (activity: Activity) => void
}

export default function SeasonalEvents({
  city,
  onAddToItinerary,
}: SeasonalEventsProps) {
  const currentMonth = new Date().getMonth() + 1
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth)

  const filteredEvents = useMemo(() => {
    return SEASONAL_EVENTS.filter(
      (event) => !city || event.city === city || event.city === 'Various'
    ).filter(
      (event) => selectedMonth === 0 || event.month === selectedMonth
    )
  }, [city, selectedMonth])

  const handleAddToItinerary = (event: SeasonalEvent) => {
    if (!onAddToItinerary) return

    const activity: Activity = {
      id: `event-${event.id}`,
      name: event.name,
      type: event.type,
      startTime: '10:00',
      endTime: '18:00',
      location: event.location,
      notes: `${event.description}\n\nDuration: ${event.duration}\n\nHighlights: ${event.highlights.join(', ')}\n\nTips: ${event.tips.join(', ')}`,
    }

    onAddToItinerary(activity)
  }

  const monthNames = [
    'All Months',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">🌸 Seasonal Events & Festivals</h3>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="px-3 py-1 text-sm border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {monthNames.map((name, index) => (
            <option key={index} value={index}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="border border-gray-200 rounded-card p-4 hover:border-primary transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{event.name}</h4>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs">
                    {event.type}
                  </span>
                  <span className="text-xs text-gray-500">{event.city}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                <div className="text-xs text-gray-600 space-y-1 mb-2">
                  <p>📅 {event.duration}</p>
                  <p>📍 {event.location.address}</p>
                  {event.estimatedCost !== undefined && (
                    <p>💰 ¥{event.estimatedCost.toLocaleString()}</p>
                  )}
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-700 mb-1">
                    Highlights:
                  </p>
                  <ul className="text-xs text-gray-600 space-y-0.5">
                    {event.highlights.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-700 mb-1">Tips:</p>
                  <ul className="text-xs text-gray-600 space-y-0.5">
                    {event.tips.map((item, index) => (
                      <li key={index}>💡 {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-1">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {onAddToItinerary && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddToItinerary(event)}
                  className="ml-4"
                >
                  Add
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

