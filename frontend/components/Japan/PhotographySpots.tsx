'use client'

import { useState } from 'react'
import Button from '../UI/Button'
import type { Activity } from '../../services/itinerary'

interface PhotoSpot {
  id: string
  name: string
  city: string
  type: 'sunrise' | 'sunset' | 'day' | 'night' | 'seasonal'
  description: string
  location: {
    name: string
    address: string
    coordinates: [number, number]
  }
  bestTime: string
  bestSeason: string
  tips: string[]
  equipment: string[]
  tags: string[]
}

const PHOTO_SPOTS: PhotoSpot[] = [
  {
    id: 'photo-1',
    name: 'Fushimi Inari Torii Gates',
    city: 'Kyoto',
    type: 'day',
    description: 'Thousands of vermillion torii gates creating stunning tunnels',
    location: {
      name: 'Fushimi Inari Shrine',
      address: '68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto',
      coordinates: [35.0122, 135.7722],
    },
    bestTime: 'Early morning (6-8am) to avoid crowds',
    bestSeason: 'Year-round, especially autumn',
    tips: [
      'Arrive before 7am for best lighting',
      'Walk further up for fewer people',
      'Use wide-angle lens',
      'Golden hour provides best colors',
    ],
    equipment: ['Wide-angle lens', 'Tripod (optional)', 'Polarizing filter'],
    tags: ['iconic', 'architecture', 'tunnel', 'red'],
  },
  {
    id: 'photo-2',
    name: 'Shibuya Crossing',
    city: 'Tokyo',
    type: 'night',
    description: 'World\'s busiest intersection, iconic Tokyo scene',
    location: {
      name: 'Shibuya Scramble Crossing',
      address: 'Shibuya City, Tokyo',
      coordinates: [35.6598, 139.7006],
    },
    bestTime: 'Evening/night for neon lights',
    bestSeason: 'Year-round',
    tips: [
      'Shoot from Starbucks or Shibuya Sky',
      'Use long exposure for light trails',
      'Capture during rush hour',
      'Include Hachiko statue',
    ],
    equipment: ['Wide-angle lens', 'Tripod', 'ND filter'],
    tags: ['iconic', 'urban', 'neon', 'crowds'],
  },
  {
    id: 'photo-3',
    name: 'Arashiyama Bamboo Grove',
    city: 'Kyoto',
    type: 'day',
    description: 'Magical bamboo forest path',
    location: {
      name: 'Arashiyama Bamboo Grove',
      address: 'Sagatenryuji Susukinobabacho, Ukyo Ward, Kyoto',
      coordinates: [35.0172, 135.6720],
    },
    bestTime: 'Early morning (before 8am)',
    bestSeason: 'Year-round, spring/summer for green',
    tips: [
      'Arrive very early to avoid crowds',
      'Shoot upward for dramatic perspective',
      'Use natural light filtering through',
      'Walk slowly for best angles',
    ],
    equipment: ['Wide-angle lens', 'Polarizing filter'],
    tags: ['nature', 'green', 'peaceful', 'vertical'],
  },
  {
    id: 'photo-4',
    name: 'Mount Fuji from Lake Kawaguchi',
    city: 'Fuji Five Lakes',
    type: 'sunrise',
    description: 'Classic view of Mount Fuji reflected in lake',
    location: {
      name: 'Lake Kawaguchi',
      address: 'Fujikawaguchiko, Yamanashi',
      coordinates: [35.5036, 138.7600],
    },
    bestTime: 'Sunrise (5-6am)',
    bestSeason: 'October-April (clearer views)',
    tips: [
      'Check weather forecast',
      'Arrive before sunrise',
      'Use telephoto lens for compression',
      'Capture reflection in calm water',
    ],
    equipment: ['Telephoto lens', 'Tripod', 'Wide-angle for context'],
    tags: ['iconic', 'mountain', 'reflection', 'sunrise'],
  },
  {
    id: 'photo-5',
    name: 'Tokyo Skytree at Night',
    city: 'Tokyo',
    type: 'night',
    description: 'Illuminated tower against Tokyo skyline',
    location: {
      name: 'Tokyo Skytree',
      address: '1 Chome-1-2 Oshiage, Sumida City, Tokyo',
      coordinates: [35.7101, 139.8107],
    },
    bestTime: 'Blue hour and night',
    bestSeason: 'Year-round',
    tips: [
      'Shoot from Sumida River',
      'Include reflections in water',
      'Use long exposure',
      'Capture color-changing lights',
    ],
    equipment: ['Wide-angle lens', 'Tripod', 'Remote shutter'],
    tags: ['iconic', 'tower', 'night', 'urban'],
  },
  {
    id: 'photo-6',
    name: 'Cherry Blossoms at Philosopher\'s Path',
    city: 'Kyoto',
    type: 'seasonal',
    description: 'Pink cherry blossoms lining canal path',
    location: {
      name: 'Philosopher\'s Path',
      address: 'Sakyo Ward, Kyoto',
      coordinates: [35.0275, 135.7944],
    },
    bestTime: 'Early morning during peak bloom',
    bestSeason: 'Late March - Early April',
    tips: [
      'Check bloom forecast',
      'Arrive at sunrise',
      'Use shallow depth of field',
      'Capture petals falling',
    ],
    equipment: ['Telephoto lens', 'Macro lens', 'Polarizing filter'],
    tags: ['seasonal', 'nature', 'pink', 'spring'],
  },
  {
    id: 'photo-7',
    name: 'Golden Pavilion (Kinkaku-ji)',
    city: 'Kyoto',
    type: 'day',
    description: 'Golden temple reflected in pond',
    location: {
      name: 'Kinkaku-ji',
      address: '1 Kinkakujicho, Kita Ward, Kyoto',
      coordinates: [35.0394, 135.7299],
    },
    bestTime: 'Morning for best light',
    bestSeason: 'Year-round, autumn for colors',
    tips: [
      'Arrive at opening (9am)',
      'Capture reflection in pond',
      'Use polarizing filter',
      'Include surrounding garden',
    ],
    equipment: ['Wide-angle lens', 'Polarizing filter'],
    tags: ['iconic', 'temple', 'gold', 'reflection'],
  },
  {
    id: 'photo-8',
    name: 'Neon Streets of Shinjuku',
    city: 'Tokyo',
    type: 'night',
    description: 'Vibrant neon signs and bustling nightlife',
    location: {
      name: 'Shinjuku',
      address: 'Shinjuku City, Tokyo',
      coordinates: [35.6938, 139.7034],
    },
    bestTime: 'Night (8pm-11pm)',
    bestSeason: 'Year-round',
    tips: [
      'Use fast lens for low light',
      'Capture motion blur',
      'Include people for scale',
      'Shoot from different angles',
    ],
    equipment: ['Fast prime lens', 'Tripod (optional)'],
    tags: ['neon', 'urban', 'night', 'vibrant'],
  },
]

interface PhotographySpotsProps {
  city?: string
  onAddToItinerary?: (activity: Activity) => void
}

export default function PhotographySpots({
  city,
  onAddToItinerary,
}: PhotographySpotsProps) {
  const [selectedType, setSelectedType] = useState<string>('all')

  const filteredSpots = PHOTO_SPOTS.filter(
    (spot) => !city || spot.city === city
  ).filter(
    (spot) => selectedType === 'all' || spot.type === selectedType
  )

  const handleAddToItinerary = (spot: PhotoSpot) => {
    if (!onAddToItinerary) return

    const activity: Activity = {
      id: `photo-${spot.id}`,
      name: spot.name,
      type: 'Photography',
      startTime: spot.type === 'sunrise' ? '05:00' : spot.type === 'night' ? '20:00' : '10:00',
      endTime: spot.type === 'sunrise' ? '07:00' : spot.type === 'night' ? '22:00' : '12:00',
      location: spot.location,
      notes: `${spot.description}\n\nBest Time: ${spot.bestTime}\nBest Season: ${spot.bestSeason}\n\nTips: ${spot.tips.join(', ')}\n\nEquipment: ${spot.equipment.join(', ')}`,
    }

    onAddToItinerary(activity)
  }

  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">📸 Photography Spots</h3>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-1 text-sm border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Types</option>
          <option value="sunrise">Sunrise</option>
          <option value="sunset">Sunset</option>
          <option value="day">Day</option>
          <option value="night">Night</option>
          <option value="seasonal">Seasonal</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredSpots.map((spot) => (
          <div
            key={spot.id}
            className="border border-gray-200 rounded-card p-4 hover:border-primary transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{spot.name}</h4>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs">
                    {spot.type}
                  </span>
                  <span className="text-xs text-gray-500">{spot.city}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{spot.description}</p>
                <div className="text-xs text-gray-600 space-y-1 mb-2">
                  <p>📍 {spot.location.address}</p>
                  <p>🕐 Best Time: {spot.bestTime}</p>
                  <p>🌸 Best Season: {spot.bestSeason}</p>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-700 mb-1">Tips:</p>
                  <ul className="text-xs text-gray-600 space-y-0.5">
                    {spot.tips.map((tip, index) => (
                      <li key={index}>💡 {tip}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-700 mb-1">
                    Recommended Equipment:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {spot.equipment.map((item, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {spot.tags.map((tag) => (
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
                  onClick={() => handleAddToItinerary(spot)}
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

