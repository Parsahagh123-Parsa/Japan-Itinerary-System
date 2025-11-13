'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { Itinerary } from '../../services/itinerary'

interface MapViewProps {
  itinerary: Itinerary
}

export default function MapView({ itinerary }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

    if (!mapboxToken) {
      console.error('MAPBOX_ACCESS_TOKEN is not set')
      return
    }

    mapboxgl.accessToken = mapboxToken

    // Get all coordinates from itinerary
    const allCoordinates: [number, number][] = []
    itinerary.days.forEach((day) => {
      day.activities.forEach((activity) => {
        allCoordinates.push(activity.location.coordinates)
      })
    })

    if (allCoordinates.length === 0) return

    // Calculate bounds
    const lngs = allCoordinates.map((c) => c[0])
    const lats = allCoordinates.map((c) => c[1])
    const bounds = new mapboxgl.LngLatBounds(
      [Math.min(...lngs), Math.min(...lats)],
      [Math.max(...lngs), Math.max(...lats)]
    )

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      bounds: bounds,
      fitBoundsOptions: { padding: 50 },
    })

    map.current.on('load', () => {
      setMapLoaded(true)

      // Add markers for each activity
      itinerary.days.forEach((day, dayIndex) => {
        day.activities.forEach((activity, actIndex) => {
          const el = document.createElement('div')
          el.className = 'map-marker'
          el.style.width = '32px'
          el.style.height = '32px'
          el.style.borderRadius = '50%'
          el.style.backgroundColor = '#1e3a8a'
          el.style.border = '3px solid white'
          el.style.cursor = 'pointer'
          el.style.display = 'flex'
          el.style.alignItems = 'center'
          el.style.justifyContent = 'center'
          el.style.fontSize = '12px'
          el.style.fontWeight = 'bold'
          el.style.color = 'white'
          el.textContent = `${day.day}`

          new mapboxgl.Marker(el)
            .setLngLat(activity.location.coordinates)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<div class="p-2">
                  <strong>Day ${day.day}</strong><br/>
                  <strong>${activity.name}</strong><br/>
                  <span class="text-sm">${activity.startTime} - ${activity.endTime}</span><br/>
                  <span class="text-sm text-gray-600">${activity.location.name}</span>
                </div>`
              )
            )
            .addTo(map.current!)
        })
      })

      // Add route line if there are multiple points
      if (allCoordinates.length > 1) {
        map.current!.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: allCoordinates,
            },
          },
        })

        map.current!.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#1e3a8a',
            'line-width': 3,
            'line-opacity': 0.6,
          },
        })
      }
    })

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [itinerary])

  if (!mapLoaded) {
    return (
      <div className="w-full h-[400px] bg-gray-100 rounded-card flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="w-full h-[400px] rounded-card overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  )
}

