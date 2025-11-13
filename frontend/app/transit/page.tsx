'use client'

import { useState } from 'react'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import { getTransitSchedule } from '../../services/transit'
import type { TransitRoute } from '../../services/transit'

export default function TransitPage() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [time, setTime] = useState('')
  const [routes, setRoutes] = useState<TransitRoute[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGetSchedule = async () => {
    if (!from || !to || !date) {
      setError('Please provide from, to, and date')
      return
    }

    setLoading(true)
    setError(null)
    setRoutes([])

    try {
      const schedule = await getTransitSchedule(from, to, date, time || undefined)
      setRoutes(schedule)
    } catch (err: any) {
      setError(err.message || 'Failed to get transit schedule')
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (timestamp: string | number) => {
    const date = new Date(typeof timestamp === 'string' ? parseInt(timestamp) * 1000 : timestamp * 1000)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Transit Schedule</h1>

        <div className="bg-white rounded-card shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="From Station"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="e.g., Tokyo Station"
            />

            <Input
              label="To Station"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="e.g., Kyoto Station"
            />

            <Input
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <Input
              label="Time (optional)"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <Button
            onClick={handleGetSchedule}
            isLoading={loading}
            className="w-full"
            size="lg"
          >
            Get Schedule
          </Button>

          {error && (
            <div className="mt-4 p-4 bg-error/10 border border-error rounded-card text-error text-sm">
              {error}
            </div>
          )}
        </div>

        {routes.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">
              Available Routes ({routes.length})
            </h2>
            {routes.map((route, index) => (
              <div
                key={route.id || index}
                className="bg-white rounded-card shadow-sm p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Route {index + 1}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {formatTime(route.departureTime)} → {formatTime(route.arrivalTime)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-primary">
                      {Math.round(route.duration)} min
                    </p>
                    {route.price && (
                      <p className="text-sm text-gray-600">
                        ¥{route.price.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>

                {route.transfers && route.transfers.length > 0 && (
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Transfers:
                    </h4>
                    <div className="space-y-2">
                      {route.transfers.map((transfer, tIndex) => (
                        <div
                          key={tIndex}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          <span>
                            {transfer.from} → {transfer.to}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({transfer.line})
                          </span>
                          {transfer.platform && (
                            <span className="text-xs text-gray-500">
                              Platform {transfer.platform}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

