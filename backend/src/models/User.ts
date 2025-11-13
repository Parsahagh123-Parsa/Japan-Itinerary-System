/**
 * User model types
 */

export interface User {
  id: string
  email: string
  name?: string
  preferences?: UserPreferences
}

export interface UserPreferences {
  interests: string[]
  budgetRange: 'budget' | 'moderate' | 'luxury'
  travelStyle: 'relaxed' | 'moderate' | 'packed'
}

