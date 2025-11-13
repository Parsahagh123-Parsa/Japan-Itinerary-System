'use client'

import Link from 'next/link'
import Button from '../UI/Button'

export default function QuickActions() {
  const actions = [
    {
      title: 'Create Itinerary',
      description: 'Generate a new AI-powered travel plan',
      href: '/itinerary/create',
      icon: '✨',
      variant: 'primary' as const,
    },
    {
      title: 'View Map',
      description: 'Explore routes and navigation',
      href: '/map',
      icon: '🗺️',
      variant: 'outline' as const,
    },
    {
      title: 'My Bookings',
      description: 'Manage your reservations',
      href: '/bookings',
      icon: '📅',
      variant: 'outline' as const,
    },
    {
      title: 'Translate',
      description: 'Translate text and menus',
      href: '/translate',
      icon: '🌐',
      variant: 'outline' as const,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {actions.map((action) => (
        <Link key={action.href} href={action.href}>
          <div className="bg-white rounded-card shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer h-full">
            <div className="text-4xl mb-3">{action.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {action.title}
            </h3>
            <p className="text-sm text-gray-600">{action.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

