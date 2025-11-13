import axios from 'axios'

const jrApiKey = process.env.JR_API_KEY
const googleMapsKey = process.env.GOOGLE_MAPS_API_KEY

export interface TransitRoute {
  id: string
  from: string
  to: string
  departureTime: string
  arrivalTime: string
  duration: number
  transfers: TransitTransfer[]
  price?: number
}

export interface TransitTransfer {
  from: string
  to: string
  line: string
  platform?: string
  departureTime: string
  arrivalTime: string
}

export const transitService = {
  /**
   * Get Japan Rail schedule
   */
  async getSchedule(
    from: string,
    to: string,
    date: string,
    time?: string
  ): Promise<TransitRoute[]> {
    // TODO: Integrate with Japan Rail API
    // For now, use Google Maps Directions API as fallback

    if (!googleMapsKey) {
      throw new Error('GOOGLE_MAPS_API_KEY is not set')
    }

    try {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/directions/json',
        {
          params: {
            origin: from,
            destination: to,
            mode: 'transit',
            departure_time: time ? new Date(`${date}T${time}`).getTime() / 1000 : undefined,
            key: googleMapsKey,
          },
        }
      )

      if (response.data.status !== 'OK') {
        throw new Error(`Google Maps API error: ${response.data.status}`)
      }

      return response.data.routes.map((route: any, index: number) => {
        const leg = route.legs[0]
        const steps = leg.steps.filter((step: any) => step.travel_mode === 'TRANSIT')

        return {
          id: `route-${index}`,
          from,
          to,
          departureTime: leg.departure_time.value,
          arrivalTime: leg.arrival_time.value,
          duration: leg.duration.value / 60, // Convert to minutes
          transfers: steps.map((step: any, stepIndex: number) => ({
            from: step.transit_details?.departure_stop?.name || '',
            to: step.transit_details?.arrival_stop?.name || '',
            line: step.transit_details?.line?.name || '',
            platform: step.transit_details?.departure_stop?.platform || undefined,
            departureTime: step.transit_details?.departure_time?.value || '',
            arrivalTime: step.transit_details?.arrival_time?.value || '',
          })),
        }
      })
    } catch (error: any) {
      console.error('Error fetching transit schedule:', error)
      throw new Error('Failed to fetch transit schedule')
    }
  },
}

