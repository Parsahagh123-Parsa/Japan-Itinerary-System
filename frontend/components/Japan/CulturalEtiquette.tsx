'use client'

import { useState } from 'react'

interface EtiquetteRule {
  category: string
  rules: {
    title: string
    description: string
    importance: 'critical' | 'important' | 'nice-to-know'
  }[]
}

const ETIQUETTE_GUIDE: EtiquetteRule[] = [
  {
    category: 'Dining',
    rules: [
      {
        title: 'Chopstick Etiquette',
        description: 'Never stick chopsticks upright in rice (reserved for funerals), don\'t pass food chopstick-to-chopstick, don\'t point with chopsticks',
        importance: 'critical',
      },
      {
        title: 'Saying "Itadakimasu"',
        description: 'Say "itadakimasu" before eating and "gochisosama" after - shows gratitude',
        importance: 'important',
      },
      {
        title: 'Slurping Noodles',
        description: 'Slurping ramen/soba is acceptable and shows you\'re enjoying it',
        importance: 'nice-to-know',
      },
      {
        title: 'Drinking Etiquette',
        description: 'Never pour your own drink - pour for others and let them pour for you',
        importance: 'important',
      },
    ],
  },
  {
    category: 'Temples & Shrines',
    rules: [
      {
        title: 'Purification Ritual',
        description: 'Wash hands and mouth at chozuya before entering shrine',
        importance: 'critical',
      },
      {
        title: 'Bowing at Torii Gate',
        description: 'Bow slightly when entering and leaving through torii gate',
        importance: 'important',
      },
      {
        title: 'Photography Rules',
        description: 'No photos inside main halls, be respectful, no selfies in inappropriate places',
        importance: 'critical',
      },
      {
        title: 'Quiet and Respectful',
        description: 'Speak quietly, no loud conversations, turn off phone sounds',
        importance: 'critical',
      },
    ],
  },
  {
    category: 'Onsen (Hot Springs)',
    rules: [
      {
        title: 'Wash Before Entering',
        description: 'Thoroughly wash and rinse before entering the bath - this is mandatory',
        importance: 'critical',
      },
      {
        title: 'No Swimsuits',
        description: 'Bathing is nude (gender-separated) - use small towel for modesty but keep out of water',
        importance: 'critical',
      },
      {
        title: 'Tattoo Policy',
        description: 'Many onsen ban tattoos - check policy or use tattoo cover stickers',
        importance: 'important',
      },
      {
        title: 'No Photos',
        description: 'Never take photos in bathing areas',
        importance: 'critical',
      },
    ],
  },
  {
    category: 'Public Behavior',
    rules: [
      {
        title: 'Quiet on Trains',
        description: 'No phone calls, keep volume low, priority seats for elderly/pregnant',
        importance: 'critical',
      },
      {
        title: 'No Eating While Walking',
        description: 'Eating while walking is considered rude - eat at the shop or find a place to sit',
        importance: 'important',
      },
      {
        title: 'Garbage Disposal',
        description: 'Very few public trash cans - carry trash with you, separate by type',
        importance: 'important',
      },
      {
        title: 'Shoes Off',
        description: 'Remove shoes when entering homes, some restaurants, temples - look for shoe storage',
        importance: 'critical',
      },
    ],
  },
  {
    category: 'Social Interactions',
    rules: [
      {
        title: 'Bowing',
        description: 'Bowing is common greeting - deeper bow shows more respect',
        importance: 'important',
      },
      {
        title: 'Business Cards',
        description: 'Accept with both hands, study it, never write on it, treat with respect',
        importance: 'important',
      },
      {
        title: 'Gift Giving',
        description: 'Gifts are important - give/receive with both hands, don\'t open immediately',
        importance: 'nice-to-know',
      },
      {
        title: 'Saying "Sumimasen"',
        description: 'Use "sumimasen" for excuse me, sorry, thank you - very versatile word',
        importance: 'important',
      },
    ],
  },
  {
    category: 'Shopping',
    rules: [
      {
        title: 'Money Handling',
        description: 'Place money on tray at register, receive change on tray - no hand-to-hand',
        importance: 'important',
      },
      {
        title: 'Tax-Free Shopping',
        description: 'Show passport, spend over ¥5,000, items sealed in bag for export',
        importance: 'nice-to-know',
      },
      {
        title: 'Bargaining',
        description: 'Generally not done except at flea markets - fixed prices are standard',
        importance: 'nice-to-know',
      },
    ],
  },
]

export default function CulturalEtiquette() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedRules, setExpandedRules] = useState<Set<string>>(new Set())

  const categories = ETIQUETTE_GUIDE.map((g) => g.category)

  const filteredRules = ETIQUETTE_GUIDE.filter(
    (guide) => selectedCategory === 'all' || guide.category === selectedCategory
  )

  const toggleRule = (category: string, index: number) => {
    const key = `${category}-${index}`
    const newExpanded = new Set(expandedRules)
    if (newExpanded.has(key)) {
      newExpanded.delete(key)
    } else {
      newExpanded.add(key)
    }
    setExpandedRules(newExpanded)
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'important':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">📚 Cultural Etiquette Guide</h3>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-1 text-sm border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
        <p className="text-xs text-blue-800">
          💡 Understanding and respecting Japanese etiquette will greatly enhance your experience and show respect for the culture.
        </p>
      </div>

      <div className="space-y-4">
        {filteredRules.map((guide) => (
          <div key={guide.category} className="border border-gray-200 rounded-card p-4">
            <h4 className="font-semibold text-gray-900 mb-3">{guide.category}</h4>
            <div className="space-y-2">
              {guide.rules.map((rule, index) => {
                const key = `${guide.category}-${index}`
                const isExpanded = expandedRules.has(key)
                return (
                  <div
                    key={index}
                    className="border rounded p-2 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleRule(guide.category, index)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="text-sm font-medium text-gray-900">
                            {rule.title}
                          </h5>
                          <span
                            className={`px-2 py-0.5 rounded text-xs border ${getImportanceColor(rule.importance)}`}
                          >
                            {rule.importance}
                          </span>
                        </div>
                        {isExpanded && (
                          <p className="text-xs text-gray-600 mt-1">
                            {rule.description}
                          </p>
                        )}
                      </div>
                      <span className="text-xs text-gray-400 ml-2">
                        {isExpanded ? '−' : '+'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

