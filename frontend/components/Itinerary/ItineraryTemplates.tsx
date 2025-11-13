'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '../UI/Button'

interface Template {
  id: string
  name: string
  description: string
  cities: string[]
  duration: number
  interests: string[]
  budget: 'budget' | 'moderate' | 'luxury'
}

const TEMPLATES: Template[] = [
  {
    id: 'tokyo-essentials',
    name: 'Tokyo Essentials',
    description: 'Perfect 5-day introduction to Tokyo',
    cities: ['Tokyo'],
    duration: 5,
    interests: ['culture', 'food', 'technology'],
    budget: 'moderate',
  },
  {
    id: 'golden-route',
    name: 'Golden Route',
    description: 'Classic Tokyo-Kyoto-Osaka route',
    cities: ['Tokyo', 'Kyoto', 'Osaka'],
    duration: 10,
    interests: ['culture', 'history', 'food'],
    budget: 'moderate',
  },
  {
    id: 'nature-escape',
    name: 'Nature Escape',
    description: 'Explore Japan\'s natural beauty',
    cities: ['Hakone', 'Fuji', 'Nikko'],
    duration: 7,
    interests: ['nature', 'culture', 'relaxation'],
    budget: 'moderate',
  },
  {
    id: 'food-adventure',
    name: 'Food Adventure',
    description: 'Culinary journey through Japan',
    cities: ['Tokyo', 'Osaka', 'Kyoto'],
    duration: 8,
    interests: ['food', 'culture'],
    budget: 'luxury',
  },
  {
    id: 'budget-backpacker',
    name: 'Budget Backpacker',
    description: 'Affordable Japan travel experience',
    cities: ['Tokyo', 'Kyoto'],
    duration: 7,
    interests: ['culture', 'food', 'shopping'],
    budget: 'budget',
  },
]

interface ItineraryTemplatesProps {
  onSelectTemplate?: (template: Template) => void
}

export default function ItineraryTemplates({ onSelectTemplate }: ItineraryTemplatesProps) {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const handleUseTemplate = (template: Template) => {
    if (onSelectTemplate) {
      onSelectTemplate(template)
    } else {
      // Navigate to create page with template data
      const params = new URLSearchParams({
        template: template.id,
        cities: template.cities.join(','),
        duration: template.duration.toString(),
        interests: template.interests.join(','),
        budget: template.budget,
      })
      router.push(`/itinerary/create?${params.toString()}`)
    }
  }

  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-4">Quick Start Templates</h3>
      <p className="text-sm text-gray-600 mb-6">
        Start with a pre-made itinerary template and customize it to your needs
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TEMPLATES.map((template) => (
          <div
            key={template.id}
            className={`border-2 rounded-card p-4 cursor-pointer transition-all ${
              selectedTemplate === template.id
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-primary/50 hover:shadow-md'
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <h4 className="font-semibold text-gray-900 mb-1">{template.name}</h4>
            <p className="text-sm text-gray-600 mb-3">{template.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {template.cities.map((city) => (
                <span
                  key={city}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {city}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {template.duration} days • {template.budget}
              </div>
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleUseTemplate(template)
                }}
              >
                Use Template
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

