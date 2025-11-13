'use client'

import { useState } from 'react'
import Button from '../UI/Button'
import type { Activity } from '../../services/itinerary'

interface NightlifeSpot {
  id: string
  name: string
  city: string
  type: 'bar' | 'club' | 'izakaya' | 'karaoke' | 'rooftop' | 'jazz'
  description: string
  location: {
    name: string
    address: string
    coordinates: [number, number]
  }
  atmosphere: string
  priceRange: string
  bestTime: string
  tips: string[]
  specialties: string[]
  tags: string[]
}

const NIGHTLIFE_SPOTS: NightlifeSpot[] = [
  {
    id: 'night-1',
    name: 'Golden Gai',
    city: 'Tokyo',
    type: 'bar',
    description: 'Tiny bars in Shinjuku, each seating only 5-10 people',
    location: {
      name: 'Golden Gai',
      address: '1 Chome Kabukicho, Shinjuku City, Tokyo',
      coordinates: [35.6938, 139.7034],
    },
    atmosphere: 'Intimate, retro, local',
    priceRange: '¥500-1000 cover + drinks',
    bestTime: '8pm-2am',
    tips: [
      'Look for "English OK" signs',
      'Cover charge usually ¥500-1000',
      'Respect the intimate atmosphere',
      'Cash only at most places',
      'Don\'t be loud',
    ],
    specialties: ['Whisky', 'Sake', 'Local atmosphere'],
    tags: ['intimate', 'local', 'retro', 'unique'],
  },
  {
    id: 'night-2',
    name: 'Omoide Yokocho',
    city: 'Tokyo',
    type: 'izakaya',
    description: 'Narrow alley with tiny yakitori bars',
    location: {
      name: 'Omoide Yokocho',
      address: 'Nishishinjuku, Shinjuku City, Tokyo',
      coordinates: [35.6938, 139.7034],
    },
    atmosphere: 'Nostalgic, casual, smoky',
    priceRange: '¥500-2000 per person',
    bestTime: '6pm-11pm',
    tips: [
      'Try yakitori (grilled skewers)',
      'Very small spaces',
      'Cash only',
      'Great for food and drinks',
      'Less touristy than Golden Gai',
    ],
    specialties: ['Yakitori', 'Beer', 'Sake'],
    tags: ['food', 'casual', 'nostalgic', 'local'],
  },
  {
    id: 'night-3',
    name: 'Roppongi',
    city: 'Tokyo',
    type: 'club',
    description: 'International nightlife district with clubs and bars',
    location: {
      name: 'Roppongi',
      address: 'Roppongi, Minato City, Tokyo',
      coordinates: [35.6627, 139.7314],
    },
    atmosphere: 'International, energetic, party',
    priceRange: '¥2000-5000 cover + drinks',
    bestTime: '11pm-5am',
    tips: [
      'Many clubs have cover charges',
      'Dress code enforced',
      'International crowd',
      'Check event schedules',
      'Be aware of surroundings',
    ],
    specialties: ['Dancing', 'DJs', 'International music'],
    tags: ['club', 'international', 'party', 'dancing'],
  },
  {
    id: 'night-4',
    name: 'Pontocho',
    city: 'Kyoto',
    type: 'bar',
    description: 'Narrow alley with traditional bars and restaurants',
    location: {
      name: 'Pontocho',
      address: 'Pontocho, Nakagyo Ward, Kyoto',
      coordinates: [35.0047, 135.7700],
    },
    atmosphere: 'Traditional, elegant, sophisticated',
    priceRange: '¥2000-8000+',
    bestTime: '7pm-11pm',
    tips: [
      'Make reservations for dinner',
      'Look for geisha in evening',
      'Higher prices but authentic',
      'Traditional atmosphere',
      'Great for special occasions',
    ],
    specialties: ['Kaiseki', 'Sake', 'Traditional atmosphere'],
    tags: ['traditional', 'elegant', 'geisha', 'upscale'],
  },
  {
    id: 'night-5',
    name: 'Karaoke',
    city: 'Various',
    type: 'karaoke',
    description: 'Private room karaoke - Japanese favorite pastime',
    location: {
      name: 'Various',
      address: 'Major cities',
      coordinates: [35.6762, 139.6503],
    },
    atmosphere: 'Fun, social, private',
    priceRange: '¥1000-3000 per hour',
    bestTime: 'Anytime, especially late night',
    tips: [
      'Rent private room',
      'Order food and drinks',
      'English songs available',
      'Great for groups',
      'All-you-can-drink options',
    ],
    specialties: ['Singing', 'Food', 'Drinks', 'Private rooms'],
    tags: ['fun', 'social', 'private', 'popular'],
  },
  {
    id: 'night-6',
    name: 'Rooftop Bars',
    city: 'Tokyo',
    type: 'rooftop',
    description: 'Sky-high bars with city views',
    location: {
      name: 'Various',
      address: 'Tokyo',
      coordinates: [35.6762, 139.6503],
    },
    atmosphere: 'Sophisticated, scenic, upscale',
    priceRange: '¥1500-3000 per drink',
    bestTime: 'Sunset to late night',
    tips: [
      'Reservations recommended',
      'Dress code may apply',
      'Best views at sunset',
      'Higher prices for views',
      'Great for dates',
    ],
    specialties: ['City views', 'Cocktails', 'Sunset views'],
    tags: ['scenic', 'upscale', 'views', 'romantic'],
  },
  {
    id: 'night-7',
    name: 'Jazz Bars',
    city: 'Tokyo',
    type: 'jazz',
    description: 'Intimate jazz venues with live music',
    location: {
      name: 'Various',
      address: 'Tokyo',
      coordinates: [35.6762, 139.6503],
    },
    atmosphere: 'Intimate, sophisticated, musical',
    priceRange: '¥1500-3000 cover + drinks',
    bestTime: '8pm-1am',
    tips: [
      'Check performance schedules',
      'Cover charge common',
      'Quiet atmosphere',
      'Great for music lovers',
      'Reservations recommended',
    ],
    specialties: ['Live jazz', 'Cocktails', 'Intimate setting'],
    tags: ['music', 'intimate', 'sophisticated', 'live'],
  },
]

interface NightlifeGuideProps {
  city?: string
  onAddToItinerary?: (activity: Activity) => void
}

export default function NightlifeGuide({
  city,
  onAddToItinerary,
}: NightlifeGuideProps) {
  const [selectedType, setSelectedType] = useState<string>('all')

  const filteredSpots = NIGHTLIFE_SPOTS.filter(
    (spot) => !city || spot.city === city || spot.city === 'Various'
  ).filter(
    (spot) => selectedType === 'all' || spot.type === selectedType
  )

  const handleAddToItinerary = (spot: NightlifeSpot) => {
    if (!onAddToItinerary) return

    const activity: Activity = {
      id: `night-${spot.id}`,
      name: spot.name,
      type: 'Nightlife',
      startTime: spot.bestTime.split('-')[0],
      endTime: spot.bestTime.split('-')[1] || '23:00',
      location: spot.location,
      notes: `${spot.description}\n\nAtmosphere: ${spot.atmosphere}\nPrice Range: ${spot.priceRange}\nBest Time: ${spot.bestTime}\n\nSpecialties: ${spot.specialties.join(', ')}\n\nTips: ${spot.tips.join(', ')}`,
    }

    onAddToItinerary(activity)
  }

  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">🍻 Nightlife Guide</h3>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-1 text-sm border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Types</option>
          <option value="bar">Bar</option>
          <option value="club">Club</option>
          <option value="izakaya">Izakaya</option>
          <option value="karaoke">Karaoke</option>
          <option value="rooftop">Rooftop</option>
          <option value="jazz">Jazz</option>
        </select>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded p-3 mb-4">
        <p className="text-xs text-purple-800">
          💡 Tip: Many bars have cover charges. Cash is preferred at most places. Be respectful and moderate with alcohol.
        </p>
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
                  <p>💰 {spot.priceRange}</p>
                  <p>🕐 Best Time: {spot.bestTime}</p>
                  <p>✨ Atmosphere: {spot.atmosphere}</p>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-700 mb-1">
                    Specialties:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {spot.specialties.map((item, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-700 mb-1">Tips:</p>
                  <ul className="text-xs text-gray-600 space-y-0.5">
                    {spot.tips.map((tip, index) => (
                      <li key={index}>💡 {tip}</li>
                    ))}
                  </ul>
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

