'use client'

import { useState } from 'react'
import Button from '../UI/Button'
import type { Activity } from '../../services/itinerary'

interface Ryokan {
  id: string
  name: string
  city: string
  region: string
  description: string
  location: {
    name: string
    address: string
    coordinates: [number, number]
  }
  priceRange: string
  features: string[]
  experience: string[]
  etiquette: string[]
  bestFor: string
  tags: string[]
}

const RYOKAN_LIST: Ryokan[] = [
  {
    id: 'ryokan-1',
    name: 'Traditional Ryokan Experience',
    city: 'Kyoto',
    region: 'Kansai',
    description: 'Authentic Japanese inn with tatami rooms, futon beds, and kaiseki meals',
    location: {
      name: 'Various Ryokan',
      address: 'Kyoto',
      coordinates: [35.0116, 135.7681],
    },
    priceRange: '¥15,000 - ¥50,000+ per person/night',
    features: [
      'Tatami mat rooms',
      'Futon bedding',
      'Private or shared onsen',
      'Kaiseki dinner',
      'Traditional breakfast',
      'Yukata provided',
    ],
    experience: [
      'Sleep on futon on tatami floor',
      'Wear yukata throughout stay',
      'Enjoy multi-course kaiseki dinner',
      'Relax in onsen',
      'Experience traditional hospitality',
    ],
    etiquette: [
      'Remove shoes at entrance',
      'Wear yukata provided',
      'Dinner served at specific time',
      'Futon laid out while at dinner',
      'Respect quiet hours',
      'Follow onsen etiquette',
    ],
    bestFor: 'Traditional experience, special occasions, cultural immersion',
    tags: ['traditional', 'luxury', 'cultural', 'onsen'],
  },
  {
    id: 'ryokan-2',
    name: 'Onsen Ryokan',
    city: 'Hakone',
    region: 'Kanto',
    description: 'Hot spring ryokan with natural onsen baths',
    location: {
      name: 'Hakone',
      address: 'Hakone, Kanagawa',
      coordinates: [35.2324, 139.1067],
    },
    priceRange: '¥20,000 - ¥80,000+ per person/night',
    features: [
      'Natural hot spring baths',
      'Private onsen rooms available',
      'Mount Fuji views',
      'Traditional architecture',
      'Gourmet kaiseki',
    ],
    experience: [
      'Soak in natural hot springs',
      'Enjoy views of Mount Fuji',
      'Traditional Japanese hospitality',
      'Seasonal kaiseki cuisine',
      'Peaceful mountain setting',
    ],
    etiquette: [
      'Bathe before dinner',
      'Wear yukata to dinner',
      'Private onsen may require booking',
      'Respect other guests',
      'Follow onsen rules',
    ],
    bestFor: 'Relaxation, couples, special occasions',
    tags: ['onsen', 'scenic', 'luxury', 'romantic'],
  },
  {
    id: 'ryokan-3',
    name: 'Budget Ryokan',
    city: 'Various',
    region: 'Various',
    description: 'Affordable traditional inn experience',
    location: {
      name: 'Various',
      address: 'Major cities',
      coordinates: [35.6762, 139.6503],
    },
    priceRange: '¥5,000 - ¥15,000 per person/night',
    features: [
      'Tatami rooms',
      'Shared bathrooms',
      'Simple meals available',
      'Traditional atmosphere',
      'Central locations',
    ],
    experience: [
      'Authentic Japanese accommodation',
      'Meet other travelers',
      'Traditional setting',
      'Budget-friendly',
    ],
    etiquette: [
      'Remove shoes',
      'Keep noise down',
      'Respect shared spaces',
      'Follow house rules',
    ],
    bestFor: 'Budget travelers, solo travelers, cultural experience',
    tags: ['budget', 'traditional', 'social', 'authentic'],
  },
]

interface RyokanGuideProps {
  city?: string
  onAddToItinerary?: (activity: Activity) => void
}

export default function RyokanGuide({
  city,
  onAddToItinerary,
}: RyokanGuideProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('all')

  const filteredRyokan = RYOKAN_LIST.filter(
    (ryokan) => !city || ryokan.city === city || ryokan.city === 'Various'
  ).filter(
    (ryokan) => selectedRegion === 'all' || ryokan.region === selectedRegion
  )

  const handleAddToItinerary = (ryokan: Ryokan) => {
    if (!onAddToItinerary) return

    const activity: Activity = {
      id: `ryokan-${ryokan.id}`,
      name: `Stay at ${ryokan.name}`,
      type: 'Accommodation',
      startTime: '15:00',
      endTime: '11:00',
      location: ryokan.location,
      notes: `${ryokan.description}\n\nPrice: ${ryokan.priceRange}\nBest For: ${ryokan.bestFor}\n\nFeatures: ${ryokan.features.join(', ')}\n\nExperience: ${ryokan.experience.join(', ')}\n\nEtiquette: ${ryokan.etiquette.join(', ')}`,
    }

    onAddToItinerary(activity)
  }

  const regions = Array.from(new Set(RYOKAN_LIST.map((r) => r.region)))

  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">🏯 Ryokan (Traditional Inn) Guide</h3>
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="px-3 py-1 text-sm border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Regions</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded p-3 mb-4">
        <p className="text-xs text-purple-800">
          💡 Ryokan are traditional Japanese inns offering authentic cultural experiences. Book well in advance, especially during peak seasons.
        </p>
      </div>

      <div className="space-y-4">
        {filteredRyokan.map((ryokan) => (
          <div
            key={ryokan.id}
            className="border border-gray-200 rounded-card p-4 hover:border-primary transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{ryokan.name}</h4>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs">
                    {ryokan.region}
                  </span>
                  <span className="text-xs text-gray-500">{ryokan.city}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{ryokan.description}</p>
                <div className="text-xs text-gray-600 space-y-1 mb-2">
                  <p>📍 {ryokan.location.address}</p>
                  <p>💰 {ryokan.priceRange}</p>
                  <p>✨ Best For: {ryokan.bestFor}</p>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-700 mb-1">
                    Features:
                  </p>
                  <ul className="text-xs text-gray-600 space-y-0.5">
                    {ryokan.features.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-700 mb-1">
                    Experience:
                  </p>
                  <ul className="text-xs text-gray-600 space-y-0.5">
                    {ryokan.experience.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-700 mb-1">
                    Etiquette:
                  </p>
                  <ul className="text-xs text-gray-600 space-y-0.5">
                    {ryokan.etiquette.map((item, index) => (
                      <li key={index}>💡 {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-1">
                  {ryokan.tags.map((tag) => (
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
                  onClick={() => handleAddToItinerary(ryokan)}
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

