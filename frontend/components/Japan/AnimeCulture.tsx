'use client'

import { useState } from 'react'
import Button from '../UI/Button'
import type { Activity } from '../../services/itinerary'

interface AnimeSpot {
  id: string
  name: string
  city: string
  type: 'museum' | 'district' | 'cafe' | 'shop' | 'real-location'
  description: string
  location: {
    name: string
    address: string
    coordinates: [number, number]
  }
  featuredAnime: string[]
  cost: number
  highlights: string[]
  tips: string[]
  tags: string[]
}

const ANIME_SPOTS: AnimeSpot[] = [
  {
    id: 'anime-1',
    name: 'Ghibli Museum',
    city: 'Tokyo',
    type: 'museum',
    description: 'Museum dedicated to Studio Ghibli films',
    location: {
      name: 'Ghibli Museum',
      address: '1-1-83 Shimorenjaku, Mitaka, Tokyo',
      coordinates: [35.6962, 139.5704],
    },
    featuredAnime: ['Spirited Away', 'My Neighbor Totoro', 'Howl\'s Moving Castle'],
    cost: 1000,
    highlights: [
      'Original artwork and sketches',
      'Exclusive short films',
      'Life-sized recreations',
      'Gift shop with exclusive items',
    ],
    tips: [
      'Book tickets months in advance',
      'Tickets sold only through Lawson',
      'No photos inside',
      'Arrive early for best experience',
    ],
    tags: ['ghibli', 'museum', 'family', 'popular'],
  },
  {
    id: 'anime-2',
    name: 'Akihabara',
    city: 'Tokyo',
    type: 'district',
    description: 'Electric Town - anime, manga, and gaming paradise',
    location: {
      name: 'Akihabara',
      address: 'Akihabara, Chiyoda City, Tokyo',
      coordinates: [35.6984, 139.7731],
    },
    featuredAnime: ['Steins;Gate', 'Durarara!!', 'Various'],
    cost: 0,
    highlights: [
      'Maid cafes',
      'Anime merchandise stores',
      'Retro gaming shops',
      'Electronics stores',
      'Arcades',
    ],
    tips: [
      'Spend at least half a day',
      'Visit Mandarake for rare items',
      'Try a maid cafe experience',
      'Check out Yodobashi Camera',
    ],
    tags: ['shopping', 'gaming', 'culture', 'popular'],
  },
  {
    id: 'anime-3',
    name: 'Nakano Broadway',
    city: 'Tokyo',
    type: 'shop',
    description: 'Multi-story complex with anime/manga shops',
    location: {
      name: 'Nakano Broadway',
      address: '5-52-15 Nakano, Nakano City, Tokyo',
      coordinates: [35.7097, 139.6659],
    },
    featuredAnime: ['Various'],
    cost: 0,
    highlights: [
      'Rare collectibles',
      'Vintage manga',
      'Figure shops',
      'Less touristy than Akihabara',
    ],
    tips: [
      'Better prices than Akihabara',
      'More authentic experience',
      'Multiple floors to explore',
      'Bargain hunting paradise',
    ],
    tags: ['shopping', 'collectibles', 'authentic', 'bargain'],
  },
  {
    id: 'anime-4',
    name: 'Suga Shrine Stairs',
    city: 'Tokyo',
    type: 'real-location',
    description: 'Famous stairs from "Your Name" (Kimi no Na wa)',
    location: {
      name: 'Suga Shrine',
      address: '5 Sugacho, Shinjuku City, Tokyo',
      coordinates: [35.6906, 139.7042],
    },
    featuredAnime: ['Your Name'],
    cost: 0,
    highlights: [
      'Exact location from film',
      'Beautiful view',
      'Photography spot',
      'Peaceful shrine',
    ],
    tips: [
      'Visit during golden hour',
      'Respect the shrine',
      'Popular photo spot',
      'Combine with Shinjuku visit',
    ],
    tags: ['photography', 'real-location', 'shrine', 'popular'],
  },
  {
    id: 'anime-5',
    name: 'One Piece Tower',
    city: 'Tokyo',
    type: 'museum',
    description: 'Theme park dedicated to One Piece manga/anime',
    location: {
      name: 'Tokyo Tower',
      address: '4-2-8 Shibakoen, Minato City, Tokyo',
      coordinates: [35.6586, 139.7454],
    },
    featuredAnime: ['One Piece'],
    cost: 3200,
    highlights: [
      'Interactive attractions',
      'Character meet and greets',
      'Exclusive merchandise',
      'Live shows',
    ],
    tips: [
      'One Piece fans must-visit',
      'Located in Tokyo Tower',
      'Book in advance',
      'Allow 2-3 hours',
    ],
    tags: ['theme-park', 'one-piece', 'interactive', 'family'],
  },
  {
    id: 'anime-6',
    name: 'Ikebukuro',
    city: 'Tokyo',
    type: 'district',
    description: 'Another anime/manga hub, less crowded than Akihabara',
    location: {
      name: 'Ikebukuro',
      address: 'Ikebukuro, Toshima City, Tokyo',
      coordinates: [35.7295, 139.7109],
    },
    featuredAnime: ['Durarara!!', 'Various'],
    cost: 0,
    highlights: [
      'Sunshine City',
      'Animate flagship store',
      'Pokemon Center',
      'J-World Tokyo',
    ],
    tips: [
      'More family-friendly',
      'Less overwhelming than Akihabara',
      'Great for Pokemon fans',
      'Multiple attractions',
    ],
    tags: ['shopping', 'family', 'pokemon', 'variety'],
  },
]

interface AnimeCultureProps {
  city?: string
  onAddToItinerary?: (activity: Activity) => void
}

export default function AnimeCulture({
  city,
  onAddToItinerary,
}: AnimeCultureProps) {
  const [selectedType, setSelectedType] = useState<string>('all')

  const filteredSpots = ANIME_SPOTS.filter(
    (spot) => !city || spot.city === city
  ).filter(
    (spot) => selectedType === 'all' || spot.type === selectedType
  )

  const handleAddToItinerary = (spot: AnimeSpot) => {
    if (!onAddToItinerary) return

    const activity: Activity = {
      id: `anime-${spot.id}`,
      name: spot.name,
      type: 'Anime Culture',
      startTime: '10:00',
      endTime: '14:00',
      location: spot.location,
      notes: `${spot.description}\n\nFeatured Anime: ${spot.featuredAnime.join(', ')}\n\nHighlights: ${spot.highlights.join(', ')}\n\nTips: ${spot.tips.join(', ')}`,
    }

    onAddToItinerary(activity)
  }

  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">🎌 Anime & Manga Culture</h3>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-1 text-sm border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Types</option>
          <option value="museum">Museum</option>
          <option value="district">District</option>
          <option value="cafe">Cafe</option>
          <option value="shop">Shop</option>
          <option value="real-location">Real Location</option>
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
                  <p>💰 {spot.cost === 0 ? 'Free' : `¥${spot.cost.toLocaleString()}`}</p>
                  <p>
                    📺 Featured: {spot.featuredAnime.join(', ')}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-700 mb-1">
                    Highlights:
                  </p>
                  <ul className="text-xs text-gray-600 space-y-0.5">
                    {spot.highlights.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-700 mb-1">Tips:</p>
                  <ul className="text-xs text-gray-600 space-y-0.5">
                    {spot.tips.map((item, index) => (
                      <li key={index}>💡 {item}</li>
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

