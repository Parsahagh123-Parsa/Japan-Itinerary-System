'use client'

import { useState } from 'react'
import Button from '../UI/Button'
import type { Activity } from '../../services/itinerary'

interface Onsen {
  id: string
  name: string
  city: string
  type: 'public' | 'ryokan' | 'day-trip' | 'outdoor'
  description: string
  location: {
    name: string
    address: string
    coordinates: [number, number]
  }
  waterType: string
  temperature: string
  cost: number
  features: string[]
  etiquette: string[]
  bestTime: string
  tags: string[]
}

const ONSEN_LIST: Onsen[] = [
  {
    id: 'onsen-1',
    name: 'Hakone Onsen',
    city: 'Hakone',
    type: 'outdoor',
    description: 'Famous hot spring resort with views of Mount Fuji',
    location: {
      name: 'Hakone',
      address: 'Hakone, Kanagawa',
      coordinates: [35.2324, 139.1067],
    },
    waterType: 'Sulfuric',
    temperature: '40-42°C',
    cost: 1500,
    features: [
      'Mount Fuji views',
      'Multiple bath types',
      'Traditional ryokan stays',
      'Open-air baths',
    ],
    etiquette: [
      'Wash thoroughly before entering',
      'No swimsuits allowed',
      'No tattoos (check policy)',
      'Keep towels out of water',
    ],
    bestTime: 'Year-round',
    tags: ['scenic', 'traditional', 'relaxation', 'nature'],
  },
  {
    id: 'onsen-2',
    name: 'Kusatsu Onsen',
    city: 'Kusatsu',
    type: 'public',
    description: 'One of Japan\'s most famous hot springs with unique yumomi performance',
    location: {
      name: 'Kusatsu',
      address: 'Kusatsu, Gunma',
      coordinates: [36.6211, 138.5931],
    },
    waterType: 'Acidic',
    temperature: '50-95°C',
    cost: 1000,
    features: [
      'Yumomi (water cooling) performance',
      'Very hot natural springs',
      'Traditional town atmosphere',
      'Multiple public baths',
    ],
    etiquette: [
      'Water is very hot - be careful',
      'Watch yumomi performance',
      'Try different bath temperatures',
      'Respect bathing rules',
    ],
    bestTime: 'Year-round, especially winter',
    tags: ['traditional', 'unique', 'culture', 'hot'],
  },
  {
    id: 'onsen-3',
    name: 'Beppu Onsen',
    city: 'Beppu',
    type: 'public',
    description: 'City with 8 "hells" (jigoku) - colorful hot spring pools',
    location: {
      name: 'Beppu',
      address: 'Beppu, Oita',
      coordinates: [33.2794, 131.4975],
    },
    waterType: 'Various',
    temperature: 'Varies',
    cost: 2000,
    features: [
      '8 different "hell" pools',
      'Sand baths',
      'Steam baths',
      'Colorful mineral pools',
    ],
    etiquette: [
      'Visit hells for viewing only',
      'Separate bathing facilities',
      'Try sand bath experience',
      'Follow temperature guidelines',
    ],
    bestTime: 'Year-round',
    tags: ['unique', 'colorful', 'experience', 'geothermal'],
  },
  {
    id: 'onsen-4',
    name: 'Arima Onsen',
    city: 'Kobe',
    type: 'ryokan',
    description: 'One of Japan\'s oldest hot spring resorts',
    location: {
      name: 'Arima Onsen',
      address: 'Arima, Kobe',
      coordinates: [34.7994, 135.2444],
    },
    waterType: 'Gold/Silver',
    temperature: '40-45°C',
    cost: 1500,
    features: [
      'Historic ryokan',
      'Gold and silver springs',
      'Traditional architecture',
      'Near Kobe city',
    ],
    etiquette: [
      'Book ryokan for full experience',
      'Try both gold and silver baths',
      'Enjoy kaiseki dinner',
      'Respect traditional atmosphere',
    ],
    bestTime: 'Year-round',
    tags: ['historic', 'traditional', 'ryokan', 'luxury'],
  },
]

interface OnsenGuideProps {
  city?: string
  onAddToItinerary?: (activity: Activity) => void
}

export default function OnsenGuide({ city, onAddToItinerary }: OnsenGuideProps) {
  const [selectedType, setSelectedType] = useState<string>('all')

  const filteredOnsen = ONSEN_LIST.filter(
    (onsen) => !city || onsen.city === city
  ).filter(
    (onsen) => selectedType === 'all' || onsen.type === selectedType
  )

  const handleAddToItinerary = (onsen: Onsen) => {
    if (!onAddToItinerary) return

    const activity: Activity = {
      id: `onsen-${onsen.id}`,
      name: onsen.name,
      type: 'Onsen',
      startTime: '14:00',
      endTime: '18:00',
      location: onsen.location,
      notes: `${onsen.description}\n\nWater Type: ${onsen.waterType}\nTemperature: ${onsen.temperature}\n\nFeatures: ${onsen.features.join(', ')}\n\nEtiquette: ${onsen.etiquette.join(', ')}`,
    }

    onAddToItinerary(activity)
  }

  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">♨️ Onsen (Hot Springs) Guide</h3>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-1 text-sm border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Types</option>
          <option value="public">Public</option>
          <option value="ryokan">Ryokan</option>
          <option value="day-trip">Day Trip</option>
          <option value="outdoor">Outdoor</option>
        </select>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
        <p className="text-xs font-medium text-blue-800 mb-1">
          💡 Onsen Etiquette Basics:
        </p>
        <ul className="text-xs text-blue-700 space-y-0.5">
          <li>• Wash thoroughly before entering (shower area)</li>
          <li>• No swimsuits - bathing is nude (gender-separated)</li>
          <li>• Small towel for modesty, keep out of water</li>
          <li>• Tattoos may be restricted - check policy</li>
          <li>• No photos in bathing areas</li>
          <li>• Be quiet and respectful</li>
        </ul>
      </div>

      <div className="space-y-4">
        {filteredOnsen.map((onsen) => (
          <div
            key={onsen.id}
            className="border border-gray-200 rounded-card p-4 hover:border-primary transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{onsen.name}</h4>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs">
                    {onsen.type}
                  </span>
                  <span className="text-xs text-gray-500">{onsen.city}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{onsen.description}</p>
                <div className="text-xs text-gray-600 space-y-1 mb-2">
                  <p>📍 {onsen.location.address}</p>
                  <p>💧 Water: {onsen.waterType} ({onsen.temperature})</p>
                  <p>💰 ¥{onsen.cost.toLocaleString()}</p>
                  <p>🕐 Best: {onsen.bestTime}</p>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-700 mb-1">
                    Features:
                  </p>
                  <ul className="text-xs text-gray-600 space-y-0.5">
                    {onsen.features.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-700 mb-1">
                    Etiquette Tips:
                  </p>
                  <ul className="text-xs text-gray-600 space-y-0.5">
                    {onsen.etiquette.map((item, index) => (
                      <li key={index}>💡 {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-1">
                  {onsen.tags.map((tag) => (
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
                  onClick={() => handleAddToItinerary(onsen)}
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

