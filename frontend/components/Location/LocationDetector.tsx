'use client'

import { useState, useEffect } from 'react'
import Button from '../UI/Button'
import { useToast } from '../UI/ToastContainer'

interface LocationDetectorProps {
  onLocationDetected: (city: string, coordinates: [number, number]) => void
}

export default function LocationDetector({ onLocationDetected }: LocationDetectorProps) {
  const { showToast } = useToast()
  const [detecting, setDetecting] = useState(false)
  const [location, setLocation] = useState<{
    city: string
    coordinates: [number, number]
  } | null>(null)

  // Japan city mapping based on coordinates
  const getCityFromCoordinates = (lat: number, lng: number): string => {
    // Approximate city boundaries for major Japanese cities
    const cities = [
      { name: 'Tokyo', lat: 35.6762, lng: 139.6503, radius: 0.5 },
      { name: 'Kyoto', lat: 35.0116, lng: 135.7681, radius: 0.3 },
      { name: 'Osaka', lat: 34.6937, lng: 135.5023, radius: 0.4 },
      { name: 'Yokohama', lat: 35.4437, lng: 139.6380, radius: 0.3 },
      { name: 'Sapporo', lat: 43.0642, lng: 141.3469, radius: 0.4 },
      { name: 'Fukuoka', lat: 33.5904, lng: 130.4017, radius: 0.3 },
      { name: 'Hiroshima', lat: 34.3853, lng: 132.4553, radius: 0.2 },
      { name: 'Sendai', lat: 38.2682, lng: 140.8694, radius: 0.3 },
      { name: 'Nagoya', lat: 35.1815, lng: 136.9066, radius: 0.3 },
      { name: 'Nara', lat: 34.6851, lng: 135.8048, radius: 0.2 },
      { name: 'Kobe', lat: 34.6901, lng: 135.1956, radius: 0.2 },
      { name: 'Kanazawa', lat: 36.5613, lng: 136.6562, radius: 0.2 },
    ]

    for (const city of cities) {
      const distance = Math.sqrt(
        Math.pow(lat - city.lat, 2) + Math.pow(lng - city.lng, 2)
      )
      if (distance <= city.radius) {
        return city.name
      }
    }

    return 'Unknown'
  }

  const detectLocation = () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser', 'error')
      return
    }

    setDetecting(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const city = getCityFromCoordinates(latitude, longitude)
        const coords: [number, number] = [latitude, longitude]

        setLocation({ city, coordinates: coords })
        onLocationDetected(city, coords)
        showToast(`Location detected: ${city}`, 'success')
        setDetecting(false)
      },
      (error) => {
        let message = 'Failed to detect location'
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Location access denied. Please enable location permissions.'
            break
          case error.POSITION_UNAVAILABLE:
            message = 'Location information unavailable.'
            break
          case error.TIMEOUT:
            message = 'Location request timed out.'
            break
        }
        showToast(message, 'error')
        setDetecting(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  }

  return (
    <div className="flex items-center gap-2">
      {location ? (
        <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
          <span>📍</span>
          <span>{location.city}</span>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={detectLocation}
          isLoading={detecting}
        >
          📍 Detect Location
        </Button>
      )}
    </div>
  )
}

