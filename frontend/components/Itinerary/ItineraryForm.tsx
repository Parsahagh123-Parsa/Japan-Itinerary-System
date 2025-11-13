'use client'

import { useState, FormEvent } from 'react'
import Button from '../UI/Button'
import Input from '../UI/Input'
import { useItinerary } from '../../hooks/useItinerary'
import { useRouter } from 'next/navigation'
import type { ItineraryRequest } from '../../services/itinerary'

const INTERESTS = [
  'food',
  'culture',
  'nature',
  'nightlife',
  'shopping',
  'history',
  'art',
  'technology',
  'anime',
  'temples',
]

export default function ItineraryForm() {
  const router = useRouter()
  const { createItinerary, loading, error } = useItinerary()
  
  const [formData, setFormData] = useState<ItineraryRequest>(() => {
    if (initialData) {
      // Calculate dates if duration is provided
      let startDate = initialData.startDate || ''
      let endDate = initialData.endDate || ''
      
      if (initialData.duration && !startDate) {
        const start = new Date()
        startDate = start.toISOString().split('T')[0]
        const end = new Date(start)
        end.setDate(end.getDate() + (initialData.duration - 1))
        endDate = end.toISOString().split('T')[0]
      }
      
      return {
        startDate,
        endDate,
        cities: initialData.cities || [],
        interests: initialData.interests || [],
        budget: initialData.budget || 'moderate',
        travelStyle: initialData.travelStyle || 'moderate',
      }
    }
    
    return {
      startDate: '',
      endDate: '',
      cities: [],
      interests: [],
      budget: 'moderate',
      travelStyle: 'moderate',
    }
  })
  
  const [cityInput, setCityInput] = useState('')
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormErrors({})

    // Validation
    const errors: Record<string, string> = {}
    if (!formData.startDate) errors.startDate = 'Start date is required'
    if (!formData.endDate) errors.endDate = 'End date is required'
    if (formData.cities.length === 0) errors.cities = 'At least one city is required'
    if (formData.interests.length === 0) errors.interests = 'At least one interest is required'
    
    if (formData.startDate && formData.endDate) {
      if (new Date(formData.startDate) > new Date(formData.endDate)) {
        errors.endDate = 'End date must be after start date'
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    try {
      const itinerary = await createItinerary(formData)
      router.push(`/itinerary/${itinerary.id}`)
    } catch (err) {
      // Error is handled by the hook
    }
  }

  const addCity = () => {
    if (cityInput.trim() && !formData.cities.includes(cityInput.trim())) {
      setFormData({
        ...formData,
        cities: [...formData.cities, cityInput.trim()],
      })
      setCityInput('')
    }
  }

  const removeCity = (city: string) => {
    setFormData({
      ...formData,
      cities: formData.cities.filter((c) => c !== city),
    })
  }

  const toggleInterest = (interest: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.includes(interest)
        ? formData.interests.filter((i) => i !== interest)
        : [...formData.interests, interest],
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Start Date"
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          error={formErrors.startDate}
          required
        />
        <Input
          label="End Date"
          type="date"
          value={formData.endDate}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          error={formErrors.endDate}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cities to Visit
        </label>
        <div className="flex gap-2 mb-2">
          <Input
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addCity()
              }
            }}
            placeholder="Enter city name (e.g., Tokyo)"
          />
          <Button type="button" onClick={addCity} variant="outline">
            Add
          </Button>
        </div>
        {formErrors.cities && (
          <p className="mt-1 text-sm text-error">{formErrors.cities}</p>
        )}
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.cities.map((city) => (
            <span
              key={city}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
            >
              {city}
              <button
                type="button"
                onClick={() => removeCity(city)}
                className="ml-2 hover:text-primary-dark"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Interests
        </label>
        {formErrors.interests && (
          <p className="mb-2 text-sm text-error">{formErrors.interests}</p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {INTERESTS.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`px-4 py-2 rounded-button text-sm font-medium transition-colors ${
                formData.interests.includes(interest)
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {interest.charAt(0).toUpperCase() + interest.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget
          </label>
          <select
            value={formData.budget}
            onChange={(e) =>
              setFormData({
                ...formData,
                budget: e.target.value as 'budget' | 'moderate' | 'luxury',
              })
            }
            className="w-full px-4 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="budget">Budget</option>
            <option value="moderate">Moderate</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Travel Style
          </label>
          <select
            value={formData.travelStyle}
            onChange={(e) =>
              setFormData({
                ...formData,
                travelStyle: e.target.value as 'relaxed' | 'moderate' | 'packed',
              })
            }
            className="w-full px-4 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="relaxed">Relaxed</option>
            <option value="moderate">Moderate</option>
            <option value="packed">Packed</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-error/10 border border-error rounded-card text-error">
          {error}
        </div>
      )}

      <Button type="submit" isLoading={loading} size="lg" className="w-full">
        Generate Itinerary
      </Button>
    </form>
  )
}

