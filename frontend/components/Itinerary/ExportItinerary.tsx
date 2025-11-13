'use client'

import { useState } from 'react'
import Button from '../UI/Button'
import { useToast } from '../UI/ToastContainer'
import type { Itinerary } from '../../services/itinerary'

interface ExportItineraryProps {
  itinerary: Itinerary
}

export default function ExportItinerary({ itinerary }: ExportItineraryProps) {
  const { showToast } = useToast()
  const [exporting, setExporting] = useState(false)

  const exportAsJSON = () => {
    try {
      const dataStr = JSON.stringify(itinerary, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${itinerary.title.replace(/\s+/g, '_')}.json`
      link.click()
      URL.revokeObjectURL(url)
      showToast('Itinerary exported as JSON', 'success')
    } catch (err) {
      showToast('Failed to export itinerary', 'error')
    }
  }

  const exportAsText = () => {
    try {
      setExporting(true)
      let text = `${itinerary.title}\n`
      text += `Cities: ${itinerary.cities.join(', ')}\n`
      text += `Dates: ${itinerary.startDate} to ${itinerary.endDate}\n`
      if (itinerary.totalCost) {
        text += `Estimated Cost: ¥${itinerary.totalCost.toLocaleString()}\n`
      }
      text += '\n' + '='.repeat(50) + '\n\n'

      itinerary.days.forEach((day) => {
        text += `Day ${day.day} - ${day.date}\n`
        text += '-'.repeat(50) + '\n'
        day.activities.forEach((activity) => {
          text += `\n${activity.startTime} - ${activity.endTime}\n`
          text += `${activity.name} (${activity.type})\n`
          text += `Location: ${activity.location.name}\n`
          text += `Address: ${activity.location.address}\n`
          if (activity.notes) {
            text += `Notes: ${activity.notes}\n`
          }
          text += '\n'
        })
        text += '\n'
      })

      const dataBlob = new Blob([text], { type: 'text/plain' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${itinerary.title.replace(/\s+/g, '_')}.txt`
      link.click()
      URL.revokeObjectURL(url)
      showToast('Itinerary exported as text', 'success')
    } catch (err) {
      showToast('Failed to export itinerary', 'error')
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={exportAsJSON}
        disabled={exporting}
      >
        Export JSON
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={exportAsText}
        isLoading={exporting}
      >
        Export Text
      </Button>
    </div>
  )
}

