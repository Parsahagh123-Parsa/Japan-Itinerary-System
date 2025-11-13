'use client'

import { useEffect, useState } from 'react'

interface WeatherData {
  temperature: number
  condition: string
  icon: string
  humidity?: number
  windSpeed?: number
}

interface WeatherWidgetProps {
  city: string
  date: string
  coordinates?: [number, number]
}

export default function WeatherWidget({
  city,
  date,
  coordinates,
}: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      if (!coordinates) {
        setLoading(false)
        return
      }

      try {
        // Using Next.js API route which proxies to backend
        const [lat, lng] = coordinates
        const response = await fetch(
          `/api/weather?lat=${lat}&lon=${lng}${date ? `&date=${date}` : ''}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch weather')
        }

        const data = await response.json()
        setWeather(data.weather)
      } catch (err: any) {
        setError(err.message || 'Weather unavailable')
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [coordinates, date])

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <div className="w-4 h-4 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        <span>Loading weather...</span>
      </div>
    )
  }

  if (error || !weather) {
    return (
      <div className="text-sm text-gray-500 italic">
        Weather unavailable for {city}
      </div>
    )
  }

  const getWeatherEmoji = (condition: string) => {
    const lower = condition.toLowerCase()
    if (lower.includes('sun') || lower.includes('clear')) return '☀️'
    if (lower.includes('cloud')) return '☁️'
    if (lower.includes('rain')) return '🌧️'
    if (lower.includes('snow')) return '❄️'
    if (lower.includes('storm')) return '⛈️'
    if (lower.includes('fog') || lower.includes('mist')) return '🌫️'
    return '🌤️'
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-lg">{getWeatherEmoji(weather.condition)}</span>
      <div>
        <span className="font-medium">{weather.temperature}°C</span>
        <span className="text-gray-600 ml-2">{weather.condition}</span>
      </div>
    </div>
  )
}

