import axios from 'axios'

const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN

export interface Route {
  distance: number
  duration: number
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

export const mapService = {
  /**
   * Get route data from Mapbox
   */
  async getRoute(
    from: string,
    to: string,
    mode: 'walking' | 'transit' | 'driving' = 'walking'
  ): Promise<Route> {
    if (!mapboxToken) {
      throw new Error('MAPBOX_ACCESS_TOKEN is not set')
    }

    try {
      // Parse coordinates (expecting "lng,lat" format)
      const fromCoords = from.split(',').map(Number)
      const toCoords = to.split(',').map(Number)

      const profile = mode === 'transit' ? 'driving' : mode // Mapbox uses 'driving' for transit

      const response = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/${profile}/${fromCoords[0]},${fromCoords[1]};${toCoords[0]},${toCoords[1]}`,
        {
          params: {
            access_token: mapboxToken,
            geometries: 'geojson',
            steps: true,
            overview: 'full',
          },
        }
      )

      const route = response.data.routes[0]
      const leg = route.legs[0]

      return {
        distance: leg.distance,
        duration: leg.duration,
        geometry: route.geometry,
        steps: leg.steps.map((step: any) => ({
          instruction: step.maneuver.instruction,
          distance: step.distance,
          duration: step.duration,
          coordinates: step.maneuver.location,
        })),
      }
    } catch (error: any) {
      console.error('Error fetching route from Mapbox:', error)
      throw new Error('Failed to fetch route')
    }
  },

  /**
   * Get AR overlay data
   */
  async getAROverlay(coordinates: string): Promise<AROverlay> {
    // TODO: Implement AR overlay generation
    // This would fetch nearby landmarks and waypoints
    // For now, return empty overlay

    const [lng, lat] = coordinates.split(',').map(Number)

    return {
      waypoints: [],
      landmarks: [],
    }
  },
}

