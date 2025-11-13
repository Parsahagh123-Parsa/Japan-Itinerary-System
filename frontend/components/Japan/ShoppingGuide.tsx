'use client'

import { useState } from 'react'
import Button from '../UI/Button'
import type { Activity } from '../../services/itinerary'

interface ShoppingSpot {
  id: string
  name: string
  city: string
  type: 'electronics' | 'fashion' | 'anime' | 'traditional' | 'department' | 'market'
  description: string
  location: {
    name: string
    address: string
    coordinates: [number, number]
  }
  specialties: string[]
  priceRange: string
  tips: string[]
  bestFor: string
  tags: string[]
}

const SHOPPING_SPOTS: ShoppingSpot[] = [
  {
    id: 'shop-1',
    name: 'Akihabara',
    city: 'Tokyo',
    type: 'electronics',
    description: 'Electric Town - electronics, anime, and gaming paradise',
    location: {
      name: 'Akihabara',
      address: 'Akihabara, Chiyoda City, Tokyo',
      coordinates: [35.6984, 139.7731],
    },
    specialties: [
      'Electronics',
      'Anime merchandise',
      'Retro games',
      'Maid cafes',
      'Figures and collectibles',
    ],
    priceRange: '¥100 - ¥100,000+',
    tips: [
      'Compare prices at multiple stores',
      'Check for tax-free shopping',
      'Bargain at smaller shops',
      'Visit Yodobashi Camera for electronics',
      'Explore side streets for deals',
    ],
    bestFor: 'Electronics, anime goods, gaming, tech enthusiasts',
    tags: ['electronics', 'anime', 'gaming', 'tech'],
  },
  {
    id: 'shop-2',
    name: 'Ginza',
    city: 'Tokyo',
    type: 'department',
    description: 'Luxury shopping district with high-end department stores',
    location: {
      name: 'Ginza',
      address: 'Ginza, Chuo City, Tokyo',
      coordinates: [35.6719, 139.7650],
    },
    specialties: [
      'Luxury brands',
      'Department stores',
      'Jewelry',
      'High-end fashion',
      'Traditional crafts',
    ],
    priceRange: '¥5,000 - ¥500,000+',
    tips: [
      'Visit on weekends (pedestrian zone)',
      'Check department store food floors',
      'Tax-free shopping available',
      'Explore side streets for unique finds',
      'Visit during sales seasons',
    ],
    bestFor: 'Luxury shopping, department stores, high-end brands',
    tags: ['luxury', 'fashion', 'department-store', 'upscale'],
  },
  {
    id: 'shop-3',
    name: 'Harajuku',
    city: 'Tokyo',
    type: 'fashion',
    description: 'Youth fashion and street style hub',
    location: {
      name: 'Harajuku',
      address: 'Harajuku, Shibuya City, Tokyo',
      coordinates: [35.6702, 139.7026],
    },
    specialties: [
      'Street fashion',
      'Vintage clothing',
      'Kawaii culture items',
      'Cosplay',
      'Accessories',
    ],
    priceRange: '¥500 - ¥20,000',
    tips: [
      'Visit Takeshita Street for kawaii items',
      'Explore Cat Street for vintage',
      'Check out Laforet Harajuku',
      'Best on weekends',
      'Bargain at smaller shops',
    ],
    bestFor: 'Street fashion, kawaii culture, vintage, youth fashion',
    tags: ['fashion', 'kawaii', 'vintage', 'youth'],
  },
  {
    id: 'shop-4',
    name: 'Nishiki Market',
    city: 'Kyoto',
    type: 'market',
    description: 'Traditional food market with local specialties',
    location: {
      name: 'Nishiki Market',
      address: 'Nishikikoji-dori, Nakagyo Ward, Kyoto',
      coordinates: [35.0047, 135.7674],
    },
    specialties: [
      'Traditional foods',
      'Pickles',
      'Tea',
      'Sweets',
      'Kitchenware',
    ],
    priceRange: '¥200 - ¥5,000',
    tips: [
      'Try samples before buying',
      'Buy small portions to try',
      'Cash preferred',
      'Visit early for best selection',
      'Great for souvenirs',
    ],
    bestFor: 'Food souvenirs, traditional items, local specialties',
    tags: ['food', 'traditional', 'market', 'souvenirs'],
  },
  {
    id: 'shop-5',
    name: 'Nakano Broadway',
    city: 'Tokyo',
    type: 'anime',
    description: 'Multi-story complex with anime/manga shops',
    location: {
      name: 'Nakano Broadway',
      address: '5-52-15 Nakano, Nakano City, Tokyo',
      coordinates: [35.7097, 139.6659],
    },
    specialties: [
      'Rare collectibles',
      'Vintage manga',
      'Figures',
      'Anime merchandise',
      'Comics',
    ],
    priceRange: '¥500 - ¥50,000+',
    tips: [
      'Better prices than Akihabara',
      'Multiple floors to explore',
      'Check Mandarake for rare items',
      'Bargain hunting paradise',
      'Less touristy',
    ],
    bestFor: 'Anime collectibles, rare items, manga, figures',
    tags: ['anime', 'collectibles', 'manga', 'bargain'],
  },
  {
    id: 'shop-6',
    name: 'Kappabashi Street',
    city: 'Tokyo',
    type: 'traditional',
    description: 'Kitchenware district with professional and traditional items',
    location: {
      name: 'Kappabashi',
      address: 'Kappabashi, Taito City, Tokyo',
      coordinates: [35.7100, 139.7890],
    },
    specialties: [
      'Kitchen knives',
      'Ceramics',
      'Restaurant supplies',
      'Food replicas',
      'Traditional cookware',
    ],
    priceRange: '¥1,000 - ¥50,000+',
    tips: [
      'Great for food replicas (souvenirs)',
      'Professional-grade knives',
      'Bargain for better prices',
      'Cash preferred',
      'Unique souvenirs',
    ],
    bestFor: 'Kitchenware, knives, ceramics, food replicas',
    tags: ['kitchenware', 'traditional', 'professional', 'unique'],
  },
  {
    id: 'shop-7',
    name: 'Shinsaibashi',
    city: 'Osaka',
    type: 'fashion',
    description: 'Long shopping arcade with fashion and food',
    location: {
      name: 'Shinsaibashi',
      address: 'Shinsaibashi, Chuo Ward, Osaka',
      coordinates: [34.6740, 135.5008],
    },
    specialties: [
      'Fashion',
      'Accessories',
      'Street food',
      'Cosmetics',
      'Souvenirs',
    ],
    priceRange: '¥500 - ¥30,000',
    tips: [
      'Covered arcade (weather-proof)',
      'Mix of high and low end',
      'Great for people watching',
      'Try street food while shopping',
      'Tax-free available',
    ],
    bestFor: 'Fashion, accessories, street food, general shopping',
    tags: ['fashion', 'arcade', 'food', 'variety'],
  },
]

interface ShoppingGuideProps {
  city?: string
  onAddToItinerary?: (activity: Activity) => void
}

export default function ShoppingGuide({
  city,
  onAddToItinerary,
}: ShoppingGuideProps) {
  const [selectedType, setSelectedType] = useState<string>('all')

  const filteredSpots = SHOPPING_SPOTS.filter(
    (spot) => !city || spot.city === city
  ).filter(
    (spot) => selectedType === 'all' || spot.type === selectedType
  )

  const handleAddToItinerary = (spot: ShoppingSpot) => {
    if (!onAddToItinerary) return

    const activity: Activity = {
      id: `shop-${spot.id}`,
      name: spot.name,
      type: 'Shopping',
      startTime: '10:00',
      endTime: '18:00',
      location: spot.location,
      notes: `${spot.description}\n\nBest For: ${spot.bestFor}\nPrice Range: ${spot.priceRange}\n\nSpecialties: ${spot.specialties.join(', ')}\n\nTips: ${spot.tips.join(', ')}`,
    }

    onAddToItinerary(activity)
  }

  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">🛍️ Shopping Guide</h3>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-1 text-sm border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Types</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="anime">Anime</option>
          <option value="traditional">Traditional</option>
          <option value="department">Department</option>
          <option value="market">Market</option>
        </select>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
        <p className="text-xs text-blue-800">
          💡 Tip: Many stores offer tax-free shopping for tourists (spend over ¥5,000). Bring your passport!
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
                  <p>💰 Price Range: {spot.priceRange}</p>
                  <p>✨ Best For: {spot.bestFor}</p>
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

