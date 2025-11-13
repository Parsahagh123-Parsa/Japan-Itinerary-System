'use client'

import { useState } from 'react'
import Button from '../UI/Button'

interface CityInsight {
  city: string
  bestTime: string
  weather: string
  highlights: string[]
  tips: string[]
}

const CITY_INSIGHTS: Record<string, CityInsight> = {
  Tokyo: {
    city: 'Tokyo',
    bestTime: 'March-May, September-November',
    weather: 'Mild spring and autumn, hot humid summer',
    highlights: [
      'Senso-ji Temple in Asakusa',
      'Shibuya Crossing - world\'s busiest intersection',
      'Tsukiji Outer Market for fresh sushi',
      'Meiji Shrine for traditional architecture',
    ],
    tips: [
      'Get a JR Pass for unlimited train travel',
      'Learn basic Japanese phrases',
      'Carry cash - many places don\'t accept cards',
      'Respect quiet zones on trains',
    ],
  },
  Kyoto: {
    city: 'Kyoto',
    bestTime: 'March-May, October-November',
    weather: 'Mild climate, beautiful cherry blossoms in spring',
    highlights: [
      'Fushimi Inari Shrine with thousands of torii gates',
      'Arashiyama Bamboo Grove',
      'Kiyomizu-dera Temple',
      'Gion district for geisha culture',
    ],
    tips: [
      'Visit temples early to avoid crowds',
      'Wear comfortable shoes for walking',
      'Try kaiseki (traditional multi-course meal)',
      'Respect temple etiquette - remove shoes',
    ],
  },
  Osaka: {
    city: 'Osaka',
    bestTime: 'March-May, September-November',
    weather: 'Mild spring and autumn, hot summer',
    highlights: [
      'Osaka Castle - historic landmark',
      'Dotonbori for street food',
      'Universal Studios Japan',
      'Osaka Aquarium Kaiyukan',
    ],
    tips: [
      'Osaka is known as "Japan\'s kitchen" - try takoyaki',
      'Get an Osaka Amazing Pass for discounts',
      'Visit during cherry blossom season',
      'Explore the nightlife in Namba',
    ],
  },
}

interface CityInsightsProps {
  city: string
}

export default function CityInsights({ city }: CityInsightsProps) {
  const [expanded, setExpanded] = useState(false)
  const insight = CITY_INSIGHTS[city]

  if (!insight) {
    return null
  }

  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">🗾 {city} Insights</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show Less' : 'Show More'}
        </Button>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-gray-700">Best Time to Visit</p>
          <p className="text-sm text-gray-600">{insight.bestTime}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700">Weather</p>
          <p className="text-sm text-gray-600">{insight.weather}</p>
        </div>

        {expanded && (
          <>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Must-See Highlights
              </p>
              <ul className="space-y-1">
                {insight.highlights.map((highlight, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Travel Tips
              </p>
              <ul className="space-y-1">
                {insight.tips.map((tip, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="mr-2">💡</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

