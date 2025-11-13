'use client'

import { useState, FormEvent } from 'react'
import Button from '../UI/Button'
import Input from '../UI/Input'
import type { Itinerary } from '../../services/itinerary'

interface AdvancedSearchProps {
  onSearch: (results: Itinerary[]) => void
  itineraries: Itinerary[]
}

export default function AdvancedSearch({
  onSearch,
  itineraries,
}: AdvancedSearchProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [city, setCity] = useState('')
  const [minCost, setMinCost] = useState('')
  const [maxCost, setMaxCost] = useState('')
  const [tags, setTags] = useState('')

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()

    let results = [...itineraries]

    // Text search
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      results = results.filter(
        (it) =>
          it.title.toLowerCase().includes(term) ||
          it.description?.toLowerCase().includes(term) ||
          it.days.some((day) =>
            day.activities.some((act) =>
              act.name.toLowerCase().includes(term) ||
              act.location.name.toLowerCase().includes(term)
            )
          )
      )
    }

    // Date range filter
    if (dateFrom) {
      const from = new Date(dateFrom)
      results = results.filter((it) => {
        const startDate = new Date(it.startDate)
        return startDate >= from
      })
    }

    if (dateTo) {
      const to = new Date(dateTo)
      results = results.filter((it) => {
        const endDate = new Date(it.endDate)
        return endDate <= to
      })
    }

    // City filter
    if (city) {
      const cityLower = city.toLowerCase()
      results = results.filter((it) =>
        it.days.some((day) =>
          day.activities.some((act) =>
            act.location.city?.toLowerCase().includes(cityLower)
          )
        )
      )
    }

    // Cost range filter
    if (minCost) {
      const min = parseFloat(minCost)
      results = results.filter((it) => it.totalCost >= min)
    }

    if (maxCost) {
      const max = parseFloat(maxCost)
      results = results.filter((it) => it.totalCost <= max)
    }

    // Tags filter (comma-separated)
    if (tags) {
      const tagList = tags.split(',').map((t) => t.trim().toLowerCase())
      results = results.filter((it) => {
        const itTags = (it.tags || []).map((t) => t.toLowerCase())
        return tagList.some((tag) => itTags.includes(tag))
      })
    }

    onSearch(results)
  }

  const handleReset = () => {
    setSearchTerm('')
    setDateFrom('')
    setDateTo('')
    setCity('')
    setMinCost('')
    setMaxCost('')
    setTags('')
    onSearch(itineraries)
  }

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-card shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Advanced Search</h3>

      <div className="space-y-4">
        <Input
          label="Search Text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search titles, descriptions, activities..."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="From Date"
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
          <Input
            label="To Date"
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </div>

        <Input
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Tokyo, Kyoto, Osaka..."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Min Cost (¥)"
            type="number"
            value={minCost}
            onChange={(e) => setMinCost(e.target.value)}
            placeholder="0"
          />
          <Input
            label="Max Cost (¥)"
            type="number"
            value={maxCost}
            onChange={(e) => setMaxCost(e.target.value)}
            placeholder="100000"
          />
        </div>

        <Input
          label="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="food, culture, nature"
        />
      </div>

      <div className="flex gap-2 mt-6">
        <Button type="submit" className="flex-1">
          Search
        </Button>
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </form>
  )
}

