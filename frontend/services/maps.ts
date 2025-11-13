import api from './api'

export interface RouteRequest {
  from: [number, number] // [lng, lat]
  to: [number, number]
  mode: 'walking' | 'transit' | 'driving'
}

export interface Route {
  distance: number // meters
  duration: number // seconds
  geometry: {
    type: 'LineString'
    coordinates: [number, number][]
  }
  steps?: RouteStep[]
}

export interface RouteStep {
  instruction: string
  distance: number
  duration: number
  coordinates: [number, number]
}

export interface AROverlay {
  waypoints: ARWaypoint[]
  landmarks: ARLandmark[]
}

export interface ARWaypoint {
  id: string
  coordinates: [number, number]
  name: string
  type: 'destination' | 'waypoint'
}

export interface ARLandmark {
  id: string
  coordinates: [number, number]
  name: string
  description?: string
}

/**
 * Get route data for Mapbox visualization
 */
export async function getRoute(
  from: string,
  to: string,
  mode: 'walking' | 'transit' | 'driving' = 'walking'
): Promise<Route> {
  const response = await api.get<{ route: Route }>('/maps/route', {
    params: { from, to, mode },
  })
  return response.data.route
}

/**
 * Get AR overlay data for WebXR
 */
export async function getAROverlay(
  coordinates: string
): Promise<AROverlay> {
  const response = await api.get<{ overlay: AROverlay }>('/maps/ar-overlay', {
    params: { coordinates },
  })
  return response.data.overlay
}

/**
 * Format coordinates as string (lng,lat)
 */
export function formatCoordinates(lng: number, lat: number): string {
  return `${lng},${lat}`
}

/**
 * Parse coordinates from string
 */
export function parseCoordinates(coords: string): [number, number] {
  const [lng, lat] = coords.split(',').map(Number)
  return [lng, lat]
}

