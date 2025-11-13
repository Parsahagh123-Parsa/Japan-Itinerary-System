'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { Route } from '../../services/maps'

interface MapboxMapProps {
  center?: [number, number]
  zoom?: number
  route?: Route
  markers?: Array<{
    id: string
    coordinates: [number, number]
    name: string
    color?: string
  }>
  onMapLoad?: (map: mapboxgl.Map) => void
}

export default function MapboxMap({
  center = [139.6503, 35.6762], // Tokyo default
  zoom = 12,
  route,
  markers = [],
  onMapLoad,
}: MapboxMapProps) {
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

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center,
      zoom,
    })

    map.current.on('load', () => {
      setMapLoaded(true)
      if (onMapLoad && map.current) {
        onMapLoad(map.current)
      }
    })

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  // Update route when it changes
  useEffect(() => {
    if (!map.current || !mapLoaded || !route) return

    const source = map.current.getSource('route') as mapboxgl.GeoJSONSource

    if (source) {
      source.setData({
        type: 'Feature',
        geometry: route.geometry,
        properties: {},
      })
    } else {
      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: route.geometry,
            properties: {},
          },
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#1e3a8a',
          'line-width': 4,
          'line-opacity': 0.75,
        },
      })
    }
  }, [route, mapLoaded])

  // Update markers when they change
  useEffect(() => {
    if (!map.current || !mapLoaded) return

    // Remove existing markers
    const existingMarkers = document.querySelectorAll('.mapbox-marker')
    existingMarkers.forEach((marker) => marker.remove())

    // Add new markers
    markers.forEach((marker) => {
      const el = document.createElement('div')
      el.className = 'mapbox-marker'
      el.style.width = '32px'
      el.style.height = '32px'
      el.style.borderRadius = '50%'
      el.style.backgroundColor = marker.color || '#1e3a8a'
      el.style.border = '3px solid white'
      el.style.cursor = 'pointer'
      el.title = marker.name

      new mapboxgl.Marker(el)
        .setLngLat(marker.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div class="p-2"><strong>${marker.name}</strong></div>`
          )
        )
        .addTo(map.current!)
    })
  }, [markers, mapLoaded])

  // Update center when it changes
  useEffect(() => {
    if (map.current && mapLoaded) {
      map.current.flyTo({
        center,
        zoom,
        duration: 1000,
      })
    }
  }, [center, zoom, mapLoaded])

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainer} className="w-full h-full rounded-card" />
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-card">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  )
}

