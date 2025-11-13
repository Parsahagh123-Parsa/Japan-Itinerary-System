/**
 * Place model types
 */

export interface Place {
  id: string
  name: string
  address?: string
  coordinates?: [number, number] // [lng, lat]
  category: string
  rating?: number
  priceRange?: string
  imageUrl?: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

