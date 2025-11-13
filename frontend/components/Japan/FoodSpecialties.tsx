'use client'

import { useState } from 'react'
import Button from '../UI/Button'
import type { Activity } from '../../services/itinerary'

interface FoodSpecialty {
  id: string
  name: string
  region: string
  city: string
  type: string
  description: string
  whereToFind: string
  priceRange: string
  bestTime: string
  mustTry: string[]
  culturalContext: string
  tags: string[]
}

const FOOD_SPECIALTIES: FoodSpecialty[] = [
  {
    id: 'food-1',
    name: 'Okonomiyaki',
    region: 'Kansai',
    city: 'Osaka',
    type: 'Savory Pancake',
    description: 'Japanese savory pancake with various ingredients',
    whereToFind: 'Dotonbori, local okonomiyaki restaurants',
    priceRange: '¥800-1500',
    bestTime: 'Dinner',
    mustTry: [
      'Osaka-style (mixed ingredients)',
      'Hiroshima-style (layered)',
      'With yakisoba noodles',
    ],
    culturalContext: 'Osaka\'s soul food, cooked on hot plate at your table',
    tags: ['local', 'street-food', 'interactive', 'osaka'],
  },
  {
    id: 'food-2',
    name: 'Takoyaki',
    region: 'Kansai',
    city: 'Osaka',
    type: 'Street Food',
    description: 'Octopus-filled batter balls, Osaka\'s signature snack',
    whereToFind: 'Street vendors, Dotonbori',
    priceRange: '¥400-800',
    bestTime: 'Anytime',
    mustTry: [
      'Fresh from the grill',
      'With takoyaki sauce and mayo',
      'Bonito flakes on top',
    ],
    culturalContext: 'Invented in Osaka, essential street food experience',
    tags: ['street-food', 'snack', 'osaka', 'quick'],
  },
  {
    id: 'food-3',
    name: 'Kaiseki',
    region: 'Kansai',
    city: 'Kyoto',
    type: 'Fine Dining',
    description: 'Traditional multi-course Japanese haute cuisine',
    whereToFind: 'High-end ryokan, traditional restaurants',
    priceRange: '¥10,000-50,000',
    bestTime: 'Dinner',
    mustTry: [
      'Seasonal ingredients',
      'Beautiful presentation',
      'Traditional atmosphere',
    ],
    culturalContext: 'Epitome of Japanese culinary art, reflects seasons',
    tags: ['fine-dining', 'traditional', 'luxury', 'seasonal'],
  },
  {
    id: 'food-4',
    name: 'Fugu (Pufferfish)',
    region: 'Kansai',
    city: 'Osaka',
    type: 'Delicacy',
    description: 'Carefully prepared pufferfish, potentially deadly if mishandled',
    whereToFind: 'Licensed fugu restaurants',
    priceRange: '¥5,000-20,000',
    bestTime: 'Dinner',
    mustTry: [
      'Sashimi (thinly sliced)',
      'Fugu hot pot',
      'Fugu sake',
    ],
    culturalContext: 'Requires special license, ultimate Japanese delicacy',
    tags: ['delicacy', 'unique', 'expensive', 'adventure'],
  },
  {
    id: 'food-5',
    name: 'Kobe Beef',
    region: 'Kansai',
    city: 'Kobe',
    type: 'Premium Meat',
    description: 'World-famous wagyu beef from Kobe',
    whereToFind: 'Kobe beef restaurants, teppanyaki',
    priceRange: '¥8,000-30,000',
    bestTime: 'Dinner',
    mustTry: [
      'Teppanyaki style',
      'Sukiyaki',
      'Shabu-shabu',
    ],
    culturalContext: 'Premium wagyu, known for marbling and flavor',
    tags: ['premium', 'meat', 'luxury', 'kobe'],
  },
  {
    id: 'food-6',
    name: 'Ramen',
    region: 'Various',
    city: 'Tokyo',
    type: 'Noodle Soup',
    description: 'Japanese noodle soup, regional variations',
    whereToFind: 'Ramen shops everywhere',
    priceRange: '¥600-1200',
    bestTime: 'Lunch, Late Night',
    mustTry: [
      'Tokyo shoyu (soy sauce)',
      'Sapporo miso',
      'Hakata tonkotsu',
      'Tsukemen (dipping noodles)',
    ],
    culturalContext: 'Comfort food, each region has unique style',
    tags: ['comfort-food', 'noodles', 'popular', 'regional'],
  },
  {
    id: 'food-7',
    name: 'Sushi',
    region: 'Various',
    city: 'Tokyo',
    type: 'Raw Fish',
    description: 'Fresh raw fish on rice, Japan\'s most famous export',
    whereToFind: 'Sushi restaurants, conveyor belt sushi',
    priceRange: '¥1,000-30,000',
    bestTime: 'Lunch, Dinner',
    mustTry: [
      'Omakase (chef\'s choice)',
      'Tsukiji/Toyosu market',
      'Conveyor belt (kaiten)',
      'Edomae style',
    ],
    culturalContext: 'Art form, respect the chef, eat with hands at high-end',
    tags: ['raw-fish', 'traditional', 'popular', 'variety'],
  },
  {
    id: 'food-8',
    name: 'Wagashi',
    region: 'Various',
    city: 'Kyoto',
    type: 'Traditional Sweets',
    description: 'Traditional Japanese confections, edible art',
    whereToFind: 'Wagashi shops, tea houses',
    priceRange: '¥300-1000',
    bestTime: 'Afternoon',
    mustTry: [
      'Matcha with wagashi',
      'Seasonal varieties',
      'Nerikiri (shaped sweets)',
      'Yokan (jellied dessert)',
    ],
    culturalContext: 'Reflects seasons, served with tea ceremony',
    tags: ['sweets', 'traditional', 'artistic', 'seasonal'],
  },
]

interface FoodSpecialtiesProps {
  city?: string
  onAddToItinerary?: (activity: Activity) => void
}

export default function FoodSpecialties({
  city,
  onAddToItinerary,
}: FoodSpecialtiesProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('all')

  const filteredFoods = FOOD_SPECIALTIES.filter(
    (food) => !city || food.city === city
  ).filter(
    (food) => selectedRegion === 'all' || food.region === selectedRegion
  )

  const handleAddToItinerary = (food: FoodSpecialty) => {
    if (!onAddToItinerary) return

    const activity: Activity = {
      id: `food-${food.id}`,
      name: `Try ${food.name}`,
      type: 'Food Experience',
      startTime: '12:00',
      endTime: '14:00',
      location: {
        name: food.whereToFind,
        address: food.city,
        coordinates: [0, 0],
      },
      notes: `${food.description}\n\nWhere: ${food.whereToFind}\nPrice: ${food.priceRange}\nBest Time: ${food.bestTime}\n\nMust Try: ${food.mustTry.join(', ')}\n\nCultural Context: ${food.culturalContext}`,
    }

    onAddToItinerary(activity)
  }

  const regions = Array.from(new Set(FOOD_SPECIALTIES.map((f) => f.region)))

  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">🍜 Regional Food Specialties</h3>
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

      <div className="space-y-4">
        {filteredFoods.map((food) => (
          <div
            key={food.id}
            className="border border-gray-200 rounded-card p-4 hover:border-primary transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{food.name}</h4>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs">
                    {food.type}
                  </span>
                  <span className="text-xs text-gray-500">
                    {food.city}, {food.region}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{food.description}</p>
                <div className="bg-orange-50 border border-orange-200 rounded p-2 mb-2">
                  <p className="text-xs font-medium text-orange-800">
                    🍽️ {food.culturalContext}
                  </p>
                </div>
                <div className="text-xs text-gray-600 space-y-1 mb-2">
                  <p>📍 Where: {food.whereToFind}</p>
                  <p>💰 Price: {food.priceRange}</p>
                  <p>🕐 Best: {food.bestTime}</p>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-700 mb-1">
                    Must Try:
                  </p>
                  <ul className="text-xs text-gray-600 space-y-0.5">
                    {food.mustTry.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-1">
                  {food.tags.map((tag) => (
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
                  onClick={() => handleAddToItinerary(food)}
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

