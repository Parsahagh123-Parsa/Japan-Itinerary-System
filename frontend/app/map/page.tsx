'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import MapboxMap from '../../components/Map/MapboxMap'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import { getRoute } from '../../services/maps'
import type { Route } from '../../services/maps'

export default function MapPage() {
  const searchParams = useSearchParams()
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [mode, setMode] = useState<'walking' | 'transit' | 'driving'>('walking')
  const [route, setRoute] = useState<Route | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [center, setCenter] = useState<[number, number]>([139.6503, 35.6762])

  useEffect(() => {
    // Get coordinates from URL params if available
    const fromParam = searchParams.get('from')
    const toParam = searchParams.get('to')

    if (fromParam) {
      const [lng, lat] = fromParam.split(',').map(Number)
      setFrom(fromParam)
      setCenter([lng, lat])
    }
    if (toParam) {
      setTo(toParam)
    }
  }, [searchParams])

  const handleGetRoute = async () => {
    if (!from || !to) {
      setError('Please provide both start and end locations')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const routeData = await getRoute(from, to, mode)
      setRoute(routeData)

      // Update center to show the route
      const fromCoords = from.split(',').map(Number) as [number, number]
      setCenter(fromCoords)
    } catch (err: any) {
      setError(err.message || 'Failed to get route')
    } finally {
      setLoading(false)
    }
  }

  const markers = route
    ? [
        {
          id: 'start',
          coordinates: from.split(',').map(Number) as [number, number],
          name: 'Start',
          color: '#10b981',
        },
        {
          id: 'end',
          coordinates: to.split(',').map(Number) as [number, number],
          name: 'End',
          color: '#ef4444',
        },
      ]
    : []

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Map & Navigation</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-card shadow-sm p-6 space-y-4">
              <h2 className="text-xl font-semibold mb-4">Route Planner</h2>

              <Input
                label="From (lng,lat)"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="139.6503,35.6762"
              />

              <Input
                label="To (lng,lat)"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="139.6917,35.6895"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mode
                </label>
                <select
                  value={mode}
                  onChange={(e) =>
                    setMode(e.target.value as 'walking' | 'transit' | 'driving')
                  }
                  className="w-full px-4 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="walking">Walking</option>
                  <option value="transit">Transit</option>
                  <option value="driving">Driving</option>
                </select>
              </div>

              <Button
                onClick={handleGetRoute}
                isLoading={loading}
                className="w-full"
                size="lg"
              >
                Get Route
              </Button>

              {error && (
                <div className="p-4 bg-error/10 border border-error rounded-card text-error text-sm">
                  {error}
                </div>
              )}

              {route && (
                <div className="mt-4 p-4 bg-gray-50 rounded-card">
                  <h3 className="font-semibold mb-2">Route Info</h3>
                  <p className="text-sm text-gray-600">
                    Distance: {(route.distance / 1000).toFixed(2)} km
                  </p>
                  <p className="text-sm text-gray-600">
                    Duration: {Math.round(route.duration / 60)} minutes
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-card shadow-sm p-4 h-[600px]">
              <MapboxMap center={center} route={route || undefined} markers={markers} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

