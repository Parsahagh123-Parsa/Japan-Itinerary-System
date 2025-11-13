'use client'

import { useState } from 'react'

interface EmergencyContact {
  service: string
  number: string
  description: string
  whenToUse: string
}

const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    service: 'Police',
    number: '110',
    description: 'Emergency police services',
    whenToUse: 'Crime, accidents, immediate danger',
  },
  {
    service: 'Fire/Ambulance',
    number: '119',
    description: 'Fire department and ambulance',
    whenToUse: 'Medical emergencies, fires',
  },
  {
    service: 'Japan Helpline',
    number: '0570-000-911',
    description: '24/7 multilingual support',
    whenToUse: 'General help, translation, guidance',
  },
  {
    service: 'Tourist Hotline',
    number: '050-3816-2787',
    description: 'Tourist information and assistance',
    whenToUse: 'Travel questions, lost items, general help',
  },
]

interface EmergencyInfo {
  category: string
  items: {
    title: string
    content: string
    important?: boolean
  }[]
}

const EMERGENCY_INFO: EmergencyInfo[] = [
  {
    category: 'Important Numbers',
    items: [
      {
        title: 'Emergency Services',
        content: 'Police: 110 | Fire/Ambulance: 119 | Japan Helpline: 0570-000-911',
        important: true,
      },
      {
        title: 'Embassy Contacts',
        content: 'Keep your country\'s embassy contact information handy',
        important: true,
      },
      {
        title: 'Travel Insurance',
        content: 'Keep insurance policy number and emergency contact',
        important: true,
      },
    ],
  },
  {
    category: 'Medical Emergencies',
    items: [
      {
        title: 'Call 119 for Ambulance',
        content: 'Ambulance service is free. Operator may not speak English - use translation app or ask hotel staff to call',
        important: true,
      },
      {
        title: 'Hospitals with English',
        content: 'Major cities have international hospitals. Ask hotel concierge for nearest English-speaking hospital',
      },
      {
        title: 'Pharmacies',
        content: 'Drug stores (kusuri-ya) are common. Some medications require prescription. Bring your own if possible',
      },
      {
        title: 'Travel Insurance',
        content: 'Ensure you have comprehensive travel insurance covering medical emergencies',
        important: true,
      },
    ],
  },
  {
    category: 'Natural Disasters',
    items: [
      {
        title: 'Earthquakes',
        content: 'Japan experiences frequent earthquakes. Drop, cover, hold on. Follow local instructions',
        important: true,
      },
      {
        title: 'Tsunami Warnings',
        content: 'If near coast and earthquake occurs, move to higher ground immediately',
        important: true,
      },
      {
        title: 'Typhoons',
        content: 'Check weather forecasts. Stay indoors during severe weather. Follow evacuation orders',
      },
      {
        title: 'Emergency Alerts',
        content: 'Enable emergency alerts on your phone. J-Alert system sends warnings in multiple languages',
      },
    ],
  },
  {
    category: 'Lost Items',
    items: [
      {
        title: 'Lost Property Offices',
        content: 'Check nearest train station\'s lost property office. Items are usually turned in',
      },
      {
        title: 'Lost Passport',
        content: 'Contact your embassy immediately. Report to police and get a report for insurance',
        important: true,
      },
      {
        title: 'Lost Wallet',
        content: 'Cancel credit cards immediately. Check with police and lost property offices',
      },
    ],
  },
  {
    category: 'Safety Tips',
    items: [
      {
        title: 'Japan is Very Safe',
        content: 'Japan has very low crime rates. However, always be aware of your surroundings',
      },
      {
        title: 'Keep Copies',
        content: 'Keep copies of passport, insurance, and important documents separate from originals',
      },
      {
        title: 'Register with Embassy',
        content: 'Register your travel with your country\'s embassy before departure',
      },
      {
        title: 'Emergency Kit',
        content: 'Carry emergency contact info, insurance details, and basic first aid',
      },
    ],
  },
]

export default function EmergencyInfo() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const categories = EMERGENCY_INFO.map((info) => info.category)

  const filteredInfo = EMERGENCY_INFO.filter(
    (info) => selectedCategory === 'all' || info.category === selectedCategory
  )

  const toggleItem = (category: string, index: number) => {
    const key = `${category}-${index}`
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(key)) {
      newExpanded.delete(key)
    } else {
      newExpanded.add(key)
    }
    setExpandedItems(newExpanded)
  }

  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">🚨 Emergency Information</h3>
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

      <div className="bg-red-50 border-2 border-red-300 rounded p-4 mb-4">
        <h4 className="font-semibold text-red-900 mb-2">Emergency Numbers</h4>
        <div className="space-y-2">
          {EMERGENCY_CONTACTS.map((contact) => (
            <div key={contact.service} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-red-900">{contact.service}</p>
                <p className="text-xs text-red-700">{contact.description}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-red-900">{contact.number}</p>
                <p className="text-xs text-red-600">{contact.whenToUse}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredInfo.map((info) => (
          <div key={info.category} className="border border-gray-200 rounded-card p-4">
            <h4 className="font-semibold text-gray-900 mb-3">{info.category}</h4>
            <div className="space-y-2">
              {info.items.map((item, index) => {
                const key = `${info.category}-${index}`
                const isExpanded = expandedItems.has(key)
                return (
                  <div
                    key={index}
                    className={`border rounded p-2 cursor-pointer transition-colors ${
                      item.important
                        ? 'bg-red-50 border-red-200 hover:bg-red-100'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => toggleItem(info.category, index)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-medium text-gray-900">
                            {item.title}
                          </h5>
                          {item.important && (
                            <span className="px-2 py-0.5 bg-red-200 text-red-800 rounded text-xs">
                              Important
                            </span>
                          )}
                        </div>
                        {isExpanded && (
                          <p className="text-xs text-gray-600 mt-1">
                            {item.content}
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

