'use client'

import { useState } from 'react'
import Button from '../UI/Button'
import type { Activity } from '../../services/itinerary'

interface CulturalExperience {
  id: string
  name: string
  type: string
  city: string
  description: string
  duration: number
  location: {
    name: string
    address: string
    coordinates: [number, number]
  }
  cost: number
  bookingRequired: boolean
  whatToExpect: string[]
  culturalSignificance: string
  tags: string[]
}

const CULTURAL_EXPERIENCES: CulturalExperience[] = [
  {
    id: 'culture-1',
    name: 'Tea Ceremony Experience',
    type: 'Traditional',
    city: 'Kyoto',
    description: 'Learn the art of Japanese tea ceremony (sado)',
    duration: 60,
    location: {
      name: 'Various Tea Houses',
      address: 'Kyoto',
      coordinates: [35.0116, 135.7681],
    },
    cost: 3000,
    bookingRequired: true,
    whatToExpect: [
      'Learn proper tea ceremony etiquette',
      'Make matcha tea yourself',
      'Enjoy traditional wagashi sweets',
      'Understand the philosophy behind the ceremony',
    ],
    culturalSignificance: 'Tea ceremony embodies harmony, respect, purity, and tranquility - core Japanese values',
    tags: ['traditional', 'meditation', 'culture', 'hands-on'],
  },
  {
    id: 'culture-2',
    name: 'Calligraphy Workshop',
    type: 'Art',
    city: 'Tokyo',
    description: 'Learn Japanese calligraphy (shodo) from a master',
    duration: 90,
    location: {
      name: 'Calligraphy Schools',
      address: 'Tokyo',
      coordinates: [35.6762, 139.6503],
    },
    cost: 4000,
    bookingRequired: true,
    whatToExpect: [
      'Learn basic brush techniques',
      'Write your name in kanji',
      'Create your own calligraphy artwork',
      'Take home your creation',
    ],
    culturalSignificance: 'Calligraphy is considered a meditative art form and spiritual practice',
    tags: ['art', 'hands-on', 'traditional', 'creative'],
  },
  {
    id: 'culture-3',
    name: 'Kimono Rental & Photo Session',
    type: 'Traditional',
    city: 'Kyoto',
    description: 'Wear traditional kimono and explore historic districts',
    duration: 240,
    location: {
      name: 'Kimono Rental Shops',
      address: 'Gion, Kyoto',
      coordinates: [35.0038, 135.7750],
    },
    cost: 5000,
    bookingRequired: true,
    whatToExpect: [
      'Professional kimono fitting',
      'Hair styling included',
      'Photo session in traditional settings',
      'Walk through Gion district',
    ],
    culturalSignificance: 'Kimono represents Japanese aesthetics and cultural identity',
    tags: ['photography', 'traditional', 'fashion', 'experience'],
  },
  {
    id: 'culture-4',
    name: 'Sake Tasting & Brewery Tour',
    type: 'Food & Drink',
    city: 'Various',
    description: 'Learn about sake production and taste different varieties',
    duration: 120,
    location: {
      name: 'Sake Breweries',
      address: 'Various locations',
      coordinates: [35.6762, 139.6503],
    },
    cost: 3500,
    bookingRequired: true,
    whatToExpect: [
      'Tour of traditional brewery',
      'Learn sake-making process',
      'Taste 5-7 different sakes',
      'Learn proper tasting techniques',
    ],
    culturalSignificance: 'Sake is deeply woven into Japanese culture and religious ceremonies',
    tags: ['food', 'drinking', 'education', 'local'],
  },
  {
    id: 'culture-5',
    name: 'Ikebana (Flower Arranging)',
    type: 'Art',
    city: 'Tokyo',
    description: 'Learn the art of Japanese flower arrangement',
    duration: 90,
    location: {
      name: 'Ikebana Schools',
      address: 'Tokyo',
      coordinates: [35.6762, 139.6503],
    },
    cost: 3500,
    bookingRequired: true,
    whatToExpect: [
      'Learn basic ikebana principles',
      'Create your own arrangement',
      'Understand symbolism of flowers',
      'Take home your creation',
    ],
    culturalSignificance: 'Ikebana emphasizes harmony, balance, and the beauty of simplicity',
    tags: ['art', 'nature', 'meditation', 'hands-on'],
  },
  {
    id: 'culture-6',
    name: 'Traditional Pottery Making',
    type: 'Craft',
    city: 'Kyoto',
    description: 'Hands-on pottery workshop in traditional style',
    duration: 180,
    location: {
      name: 'Pottery Studios',
      address: 'Kyoto',
      coordinates: [35.0116, 135.7681],
    },
    cost: 6000,
    bookingRequired: true,
    whatToExpect: [
      'Learn wheel throwing techniques',
      'Create your own piece',
      'Glazing and finishing',
      'Ship finished piece home',
    ],
    culturalSignificance: 'Japanese pottery (yakimono) reflects wabi-sabi aesthetics',
    tags: ['craft', 'hands-on', 'traditional', 'creative'],
  },
  {
    id: 'culture-7',
    name: 'Zen Meditation Session',
    type: 'Spiritual',
    city: 'Kyoto',
    description: 'Experience zazen meditation at a Zen temple',
    duration: 60,
    location: {
      name: 'Zen Temples',
      address: 'Kyoto',
      coordinates: [35.0116, 135.7681],
    },
    cost: 2000,
    bookingRequired: true,
    whatToExpect: [
      'Introduction to Zen philosophy',
      'Guided meditation session',
      'Temple garden tour',
      'Q&A with monk',
    ],
    culturalSignificance: 'Zen Buddhism has deeply influenced Japanese culture and aesthetics',
    tags: ['spiritual', 'meditation', 'peaceful', 'education'],
  },
  {
    id: 'culture-8',
    name: 'Wagashi Making Class',
    type: 'Food',
    city: 'Tokyo',
    description: 'Learn to make traditional Japanese sweets',
    duration: 90,
    location: {
      name: 'Cooking Schools',
      address: 'Tokyo',
      coordinates: [35.6762, 139.6503],
    },
    cost: 4000,
    bookingRequired: true,
    whatToExpect: [
      'Learn wagashi techniques',
      'Make 3-4 different types',
      'Understand seasonal variations',
      'Enjoy your creations with tea',
    ],
    culturalSignificance: 'Wagashi are edible art, reflecting seasons and Japanese aesthetics',
    tags: ['food', 'hands-on', 'traditional', 'sweet'],
  },
]

interface CulturalExperiencesProps {
  city?: string
  onAddToItinerary?: (activity: Activity) => void
}

export default function CulturalExperiences({
  city,
  onAddToItinerary,
}: CulturalExperiencesProps) {
  const [selectedType, setSelectedType] = useState<string>('all')

  const filteredExperiences = CULTURAL_EXPERIENCES.filter(
    (exp) => !city || exp.city === city || exp.city === 'Various'
  ).filter(
    (exp) => selectedType === 'all' || exp.type === selectedType
  )

  const handleAddToItinerary = (exp: CulturalExperience) => {
    if (!onAddToItinerary) return

    const activity: Activity = {
      id: `culture-${exp.id}`,
      name: exp.name,
      type: exp.type,
      startTime: '10:00',
      endTime: `${String(Math.floor(exp.duration / 60) + 10).padStart(2, '0')}:${String(exp.duration % 60).padStart(2, '0')}`,
      location: exp.location,
      notes: `${exp.description}\n\nCultural Significance: ${exp.culturalSignificance}\n\nWhat to Expect: ${exp.whatToExpect.join(', ')}\n\nBooking Required: ${exp.bookingRequired ? 'Yes' : 'No'}`,
    }

    onAddToItinerary(activity)
  }

  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">🎌 Cultural Experiences</h3>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-1 text-sm border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Types</option>
          <option value="Traditional">Traditional</option>
          <option value="Art">Art</option>
          <option value="Food">Food</option>
          <option value="Craft">Craft</option>
          <option value="Spiritual">Spiritual</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredExperiences.map((exp) => (
          <div
            key={exp.id}
            className="border border-gray-200 rounded-card p-4 hover:border-primary transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{exp.name}</h4>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs">
                    {exp.type}
                  </span>
                  <span className="text-xs text-gray-500">{exp.city}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{exp.description}</p>
                <div className="bg-blue-50 border border-blue-200 rounded p-2 mb-2">
                  <p className="text-xs font-medium text-blue-800">
                    🎌 {exp.culturalSignificance}
                  </p>
                </div>
                <div className="text-xs text-gray-600 space-y-1 mb-2">
                  <p>📍 {exp.location.address}</p>
                  <p>⏱️ {exp.duration} minutes</p>
                  <p>💰 ¥{exp.cost.toLocaleString()}</p>
                  <p>
                    {exp.bookingRequired ? '📞 Booking Required' : '✅ Walk-in OK'}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-700 mb-1">
                    What to Expect:
                  </p>
                  <ul className="text-xs text-gray-600 space-y-0.5">
                    {exp.whatToExpect.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-1">
                  {exp.tags.map((tag) => (
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
                  onClick={() => handleAddToItinerary(exp)}
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

