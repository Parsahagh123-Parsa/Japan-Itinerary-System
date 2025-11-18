'use client'

import { useState } from 'react'
import Button from '../UI/Button'
import type { Activity } from '../../services/itinerary'

interface HiddenGem {
  id: string
  name: string
  city: string
  type: 'secret' | 'local' | 'hidden' | 'offbeat'
  description: string
  location: {
    name: string
    address: string
    coordinates: [number, number]
  }
  whyHidden: string
  bestTime: string
  tips: string[]
  estimatedCost?: number
  tags: string[]
}

const HIDDEN_GEMS: HiddenGem[] = [
  {
    id: 'gem-1',
    name: 'Yanaka Ginza Shopping Street',
    city: 'Tokyo',
    type: 'local',
    description: 'Old-school shopping street that feels like stepping back in time to old Tokyo',
    location: {
      name: 'Yanaka Ginza',
      address: 'Yanaka, Taito City, Tokyo',
      coordinates: [35.7258, 139.7706],
    },
    whyHidden: 'Off the beaten path, not in guidebooks',
    bestTime: 'Morning',
    tips: [
      'Try the croquettes from various vendors',
      'Visit nearby Yanaka Cemetery for cherry blossoms',
      'Less crowded than other shopping streets',
    ],
    estimatedCost: 1000,
    tags: ['shopping', 'local', 'culture', 'food'],
  },
  {
    id: 'gem-2',
    name: 'Fushimi Inari Hidden Path',
    city: 'Kyoto',
    type: 'secret',
    description: 'Lesser-known path at Fushimi Inari that avoids the crowds',
    location: {
      name: 'Fushimi Inari (Back Path)',
      address: 'Fushimi Ward, Kyoto',
      coordinates: [35.0122, 135.7722],
    },
    whyHidden: 'Most tourists only see the main path',
    bestTime: 'Early Morning',
    tips: [
      'Take the path to the right after the main gate',
      'More peaceful and photogenic',
      'Leads to smaller shrines',
    ],
    estimatedCost: 0,
    tags: ['nature', 'photography', 'spiritual', 'hiking'],
  },
  {
    id: 'gem-3',
    name: 'Golden Gai Bars',
    city: 'Tokyo',
    type: 'hidden',
    description: 'Tiny bars in Shinjuku, each seating only 5-10 people',
    location: {
      name: 'Golden Gai',
      address: '1 Chome Kabukicho, Shinjuku City, Tokyo',
      coordinates: [35.6938, 139.7034],
    },
    whyHidden: 'Intimidating for tourists, but welcoming once inside',
    bestTime: 'Evening',
    tips: [
      'Look for "English OK" signs',
      'Cover charge usually ¥500-1000',
      'Respect the intimate atmosphere',
    ],
    estimatedCost: 2000,
    tags: ['nightlife', 'local', 'culture', 'drinking'],
  },
  {
    id: 'gem-4',
    name: 'Kiyosumi Teien Garden',
    city: 'Tokyo',
    type: 'offbeat',
    description: 'Beautiful traditional garden, less crowded than others',
    location: {
      name: 'Kiyosumi Teien',
      address: '3-3-9 Kiyosumi, Koto City, Tokyo',
      coordinates: [35.6824, 139.7984],
    },
    whyHidden: 'Overshadowed by more famous gardens',
    bestTime: 'Afternoon',
    tips: [
      'Perfect for meditation',
      'Great for photography',
      'Free for seniors',
    ],
    estimatedCost: 150,
    tags: ['nature', 'peaceful', 'photography', 'culture'],
  },
  {
    id: 'gem-5',
    name: 'Pontocho Alley',
    city: 'Kyoto',
    type: 'local',
    description: 'Narrow alley with traditional restaurants and geisha sightings',
    location: {
      name: 'Pontocho',
      address: 'Pontocho, Nakagyo Ward, Kyoto',
      coordinates: [35.0047, 135.7700],
    },
    whyHidden: 'Can be missed if not looking carefully',
    bestTime: 'Evening',
    tips: [
      'Make reservations for dinner',
      'Look for geisha in the evening',
      'Try kaiseki cuisine',
    ],
    estimatedCost: 5000,
    tags: ['food', 'culture', 'geisha', 'traditional'],
  },
  {
    id: 'gem-6',
    name: 'Shimokitazawa',
    city: 'Tokyo',
    type: 'offbeat',
    description: 'Hipster neighborhood with vintage shops and indie cafes',
    location: {
      name: 'Shimokitazawa',
      address: 'Shimokitazawa, Setagaya City, Tokyo',
      coordinates: [35.6616, 139.6669],
    },
    whyHidden: 'Not on typical tourist routes',
    bestTime: 'Afternoon',
    tips: [
      'Great for vintage shopping',
      'Many independent cafes',
      'Young, creative atmosphere',
    ],
    estimatedCost: 2000,
    tags: ['shopping', 'cafe', 'vintage', 'hipster'],
  },
]

interface HiddenGemsProps {
  city?: string
  onAddToItinerary?: (activity: Activity) => void
}

export default function HiddenGems({ city, onAddToItinerary }: HiddenGemsProps) {
  const [selectedType, setSelectedType] = useState<string>('all')

  const filteredGems = HIDDEN_GEMS.filter(
    (gem) => !city || gem.city === city
  ).filter(
    (gem) => selectedType === 'all' || gem.type === selectedType
  )

  const handleAddToItinerary = (gem: HiddenGem) => {
    if (!onAddToItinerary) return

    const activity: Activity = {
      id: `gem-${gem.id}`,
      name: gem.name,
      type: 'Hidden Gem',
      startTime: '10:00',
      endTime: '12:00',
      location: gem.location,
      notes: `${gem.description}\n\nWhy it's hidden: ${gem.whyHidden}\n\nTips: ${gem.tips.join(', ')}`,
    }

    onAddToItinerary(activity)
  }

  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">💎 Hidden Gems & Secret Spots</h3>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-1 text-sm border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Types</option>
          <option value="secret">Secret</option>
          <option value="local">Local Favorites</option>
          <option value="hidden">Hidden</option>
          <option value="offbeat">Offbeat</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredGems.map((gem) => (
          <div
            key={gem.id}
            className="border border-gray-200 rounded-card p-4 hover:border-primary transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{gem.name}</h4>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs">
                    {gem.type}
                  </span>
                  <span className="text-xs text-gray-500">{gem.city}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{gem.description}</p>
                <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mb-2">
                  <p className="text-xs font-medium text-yellow-800">
                    💡 Why it&apos;s hidden: {gem.whyHidden}
                  </p>
                </div>
                <div className="text-xs text-gray-600 space-y-1 mb-2">
                  <p>📍 {gem.location.address}</p>
                  <p>🕐 Best time: {gem.bestTime}</p>
                  {gem.estimatedCost && (
                    <p>💰 Estimated: ¥{gem.estimatedCost.toLocaleString()}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {gem.tips.map((tip, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                    >
                      💡 {tip}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {gem.tags.map((tag) => (
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
                  onClick={() => handleAddToItinerary(gem)}
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

