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
export async function getRoute(request: RouteRequest): Promise<Route> {
  const response = await api.get<{ route: Route }>('/maps/route', {
    params: request,
  })
  return response.data.route
}

/**
 * Get AR overlay data for WebXR
 */
export async function getAROverlay(
  coordinates: [number, number]
): Promise<AROverlay> {
  const response = await api.get<{ overlay: AROverlay }>('/maps/ar-overlay', {
    params: { coordinates },
  })
  return response.data.overlay
}

