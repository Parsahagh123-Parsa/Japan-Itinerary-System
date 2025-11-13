import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// Create axios instance with default config
export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    // Get token from Supabase session
    if (typeof window !== 'undefined') {
      const { data: { session } } = await import('../lib/supabase').then(m => m.supabase.auth.getSession())
      
      if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`
        // Also store in localStorage for quick access
        localStorage.setItem('supabase.auth.token', session.access_token)
      } else {
        // Fallback to localStorage if session not available
        const token = localStorage.getItem('supabase.auth.token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api

