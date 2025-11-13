'use client'

import { useState } from 'react'
import Button from '../UI/Button'
import { useToast } from '../UI/ToastContainer'
import type { Itinerary } from '../../services/itinerary'

interface CalendarExportProps {
  itinerary: Itinerary
}

export default function CalendarExport({ itinerary }: CalendarExportProps) {
  const { showToast } = useToast()
  const [exporting, setExporting] = useState(false)

  const generateICS = () => {
    let ics = 'BEGIN:VCALENDAR\n'
    ics += 'VERSION:2.0\n'
    ics += 'PRODID:-//Japan Itinerary System//EN\n'
    ics += 'CALSCALE:GREGORIAN\n'
    ics += 'METHOD:PUBLISH\n'

    itinerary.days.forEach((day) => {
      day.activities.forEach((activity, index) => {
        const date = new Date(day.date)
        const [startHour, startMin] = activity.startTime.split(':').map(Number)
        const [endHour, endMin] = activity.endTime.split(':').map(Number)

        const startDateTime = new Date(date)
        startDateTime.setHours(startHour, startMin, 0, 0)

        const endDateTime = new Date(date)
        endDateTime.setHours(endHour, endMin, 0, 0)

        const formatDate = (d: Date) => {
          return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
        }

        ics += 'BEGIN:VEVENT\n'
        ics += `UID:${itinerary.id}-${day.day}-${index}@japan-itinerary.com\n`
        ics += `DTSTART:${formatDate(startDateTime)}\n`
        ics += `DTEND:${formatDate(endDateTime)}\n`
        ics += `SUMMARY:${activity.name}\n`
        ics += `DESCRIPTION:${activity.location.name}\\n${activity.location.address}${activity.notes ? '\\n\\n' + activity.notes : ''}\n`
        ics += `LOCATION:${activity.location.address}\n`
        ics += 'END:VEVENT\n'
      })
    })

    ics += 'END:VCALENDAR\n'
    return ics
  }

  const handleExport = async () => {
    setExporting(true)
    try {
      const icsContent = generateICS()
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${itinerary.title.replace(/\s+/g, '_')}.ics`
      link.click()
      URL.revokeObjectURL(url)
      showToast('Calendar exported successfully!', 'success')
    } catch (err) {
      showToast('Failed to export calendar', 'error')
    } finally {
      setExporting(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      isLoading={exporting}
    >
      📅 Export to Calendar
    </Button>
  )
}

