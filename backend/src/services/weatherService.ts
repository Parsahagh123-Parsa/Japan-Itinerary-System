import axios from 'axios'

const openWeatherApiKey = process.env.OPENWEATHER_API_KEY

export interface WeatherData {
  temperature: number
  condition: string
  icon: string
  humidity?: number
  windSpeed?: number
  description?: string
}

export const weatherService = {
  /**
   * Get weather data for a location
   */
  async getWeather(
    lat: number,
    lon: number,
    date?: string
  ): Promise<WeatherData> {
    // For now, return current weather
    // In production, you might want to use a weather API that supports historical/forecast data
    if (!openWeatherApiKey) {
      // Fallback to mock data if API key is not set
      return {
        temperature: 22,
        condition: 'Partly Cloudy',
        icon: 'partly-cloudy',
        humidity: 65,
        windSpeed: 10,
        description: 'Partly cloudy with light winds',
      }
    }

    try {
      const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            lat,
            lon,
            appid: openWeatherApiKey,
            units: 'metric',
          },
        }
      )

      const weather = response.data.weather[0]
      return {
        temperature: Math.round(response.data.main.temp),
        condition: weather.main,
        icon: weather.icon,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind?.speed || 0,
        description: weather.description,
      }
    } catch (error: any) {
      console.error('Error fetching weather:', error)
      // Return fallback data on error
      return {
        temperature: 22,
        condition: 'Unknown',
        icon: 'unknown',
        description: 'Weather data unavailable',
      }
    }
  },
}

