'use client'

import { useState } from 'react'
import Button from '../UI/Button'

interface TransportPass {
  id: string
  name: string
  region: string
  description: string
  validity: string
  price: string
  coverage: string[]
  bestFor: string
  whereToBuy: string
  tips: string[]
  savings: string
}

const TRANSPORT_PASSES: TransportPass[] = [
  {
    id: 'pass-1',
    name: 'Japan Rail Pass (JR Pass)',
    region: 'Nationwide',
    description: 'Unlimited travel on JR trains, buses, and ferries',
    validity: '7, 14, or 21 days',
    price: '¥29,650 - ¥60,450',
    coverage: [
      'All JR trains (including Shinkansen)',
      'JR buses',
      'JR ferries',
      'Tokyo Monorail',
      'Narita Express',
    ],
    bestFor: 'Multi-city travel, long-distance trips',
    whereToBuy: 'Must buy BEFORE arriving in Japan (online or travel agency)',
    tips: [
      'Cannot be purchased in Japan',
      'Activate at JR office upon arrival',
      'Reserve seats for free',
      'Not valid on Nozomi/Mizuho Shinkansen',
      'Calculate if it saves money for your itinerary',
    ],
    savings: 'Can save thousands of yen on multi-city trips',
  },
  {
    id: 'pass-2',
    name: 'Tokyo Subway Ticket',
    region: 'Tokyo',
    description: 'Unlimited rides on Tokyo Metro and Toei Subway',
    validity: '24, 48, or 72 hours',
    price: '¥800 - ¥1,500',
    coverage: [
      'Tokyo Metro lines',
      'Toei Subway lines',
      'Not valid on JR lines',
    ],
    bestFor: 'Tokyo city exploration',
    whereToBuy: 'Airports, major stations, tourist information centers',
    tips: [
      'Great value for Tokyo-only trips',
      'Activate on first use',
      'Keep ticket safe - cannot be replaced',
      'Works with IC cards',
    ],
    savings: 'Saves money if taking 3+ subway trips per day',
  },
  {
    id: 'pass-3',
    name: 'Kansai Thru Pass',
    region: 'Kansai',
    description: 'Unlimited travel on non-JR trains, buses, and subways in Kansai',
    validity: '2 or 3 days (non-consecutive)',
    price: '¥4,300 - ¥5,300',
    coverage: [
      'Osaka, Kyoto, Nara, Kobe subways',
      'Private railways',
      'Buses',
      'Not valid on JR lines',
    ],
    bestFor: 'Kansai region exploration',
    whereToBuy: 'Kansai Airport, major stations, tourist centers',
    tips: [
      'Non-consecutive days are flexible',
      'Great for day trips',
      'Includes discounts at attractions',
      'Can use on different days',
    ],
    savings: 'Excellent value for Kansai region travel',
  },
  {
    id: 'pass-4',
    name: 'IC Cards (Suica/PASMO/ICOCA)',
    region: 'Various',
    description: 'Rechargeable smart cards for trains, buses, and shopping',
    validity: 'No expiration (10 years)',
    price: '¥500 deposit + recharge',
    coverage: [
      'Most trains and buses',
      'Convenience stores',
      'Vending machines',
      'Some taxis',
    ],
    bestFor: 'Convenience, short trips, everyday use',
    whereToBuy: 'Train stations, airports',
    tips: [
      'Tap in and out automatically',
      'Can get deposit back (minus fee)',
      'Works across regions',
      'Most convenient option',
    ],
    savings: 'No discount but maximum convenience',
  },
  {
    id: 'pass-5',
    name: 'Hakone Free Pass',
    region: 'Hakone',
    description: 'Unlimited travel in Hakone area including cable cars and boats',
    validity: '2 or 3 days',
    price: '¥5,000 - ¥5,500',
    coverage: [
      'Trains to Hakone',
      'Cable cars',
      'Ropeway',
      'Pirate ship cruise',
      'Buses',
    ],
    bestFor: 'Hakone day trips, Mount Fuji area',
    whereToBuy: 'Odawara Station, Shinjuku Station',
    tips: [
      'Includes round trip from Tokyo',
      'Great for Mount Fuji views',
      'Covers all Hakone transport',
      'Includes some attraction discounts',
    ],
    savings: 'Saves money on Hakone exploration',
  },
  {
    id: 'pass-6',
    name: 'Kyoto City Bus Pass',
    region: 'Kyoto',
    description: 'Unlimited rides on Kyoto city buses',
    validity: '1 day',
    price: '¥600',
    coverage: [
      'All Kyoto city buses',
      'Not valid on subways or private railways',
    ],
    bestFor: 'Kyoto temple hopping',
    whereToBuy: 'Bus terminals, tourist information centers',
    tips: [
      'Great for visiting temples',
      'Buses are main transport in Kyoto',
      'Buy on first bus ride',
      'Show to driver when boarding',
    ],
    savings: 'Saves money if taking 3+ bus rides',
  },
]

export default function TransportationGuide() {
  const [selectedRegion, setSelectedRegion] = useState<string>('all')

  const filteredPasses = TRANSPORT_PASSES.filter(
    (pass) => selectedRegion === 'all' || pass.region === selectedRegion
  )

  const regions = Array.from(new Set(TRANSPORT_PASSES.map((p) => p.region)))

  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">🚅 Transportation Passes & Guides</h3>
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

      <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
        <p className="text-xs text-blue-800">
          💡 Tip: Calculate your expected travel costs before buying passes. Some passes only save money if you travel extensively.
        </p>
      </div>

      <div className="space-y-4">
        {filteredPasses.map((pass) => (
          <div
            key={pass.id}
            className="border border-gray-200 rounded-card p-4 hover:border-primary transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{pass.name}</h4>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs">
                    {pass.region}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{pass.description}</p>
                <div className="grid grid-cols-2 gap-3 text-xs mb-2">
                  <div>
                    <p className="font-medium text-gray-700">Validity:</p>
                    <p className="text-gray-600">{pass.validity}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Price:</p>
                    <p className="text-gray-600">{pass.price}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Best For:</p>
                    <p className="text-gray-600">{pass.bestFor}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Savings:</p>
                    <p className="text-green-600">{pass.savings}</p>
                  </div>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-700 mb-1">
                    Coverage:
                  </p>
                  <ul className="text-xs text-gray-600 space-y-0.5">
                    {pass.coverage.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-700 mb-1">
                    Where to Buy:
                  </p>
                  <p className="text-xs text-gray-600">{pass.whereToBuy}</p>
                </div>
                <div className="mb-2">
                  <p className="text-xs font-medium text-gray-700 mb-1">Tips:</p>
                  <ul className="text-xs text-gray-600 space-y-0.5">
                    {pass.tips.map((tip, index) => (
                      <li key={index}>💡 {tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

