'use client'

import { useState, useEffect } from 'react'
import Button from '../UI/Button'
import { useToast } from '../UI/ToastContainer'

interface ActivityReminderProps {
  activityId: string
  activityName: string
  startTime: string
  date: string
}

export default function ActivityReminder({
  activityId,
  activityName,
  startTime,
  date,
}: ActivityReminderProps) {
  const { showToast } = useToast()
  const [reminderSet, setReminderSet] = useState(false)
  const [reminderTime, setReminderTime] = useState('15') // minutes before

  useEffect(() => {
    // Check if reminder is already set
    const reminder = localStorage.getItem(`reminder-${activityId}`)
    if (reminder) {
      setReminderSet(true)
      const data = JSON.parse(reminder)
      setReminderTime(data.minutesBefore || '15')
    }
  }, [activityId])

  const handleSetReminder = () => {
    try {
      const reminderData = {
        activityId,
        activityName,
        startTime,
        date,
        minutesBefore: parseInt(reminderTime),
        createdAt: new Date().toISOString(),
      }

      localStorage.setItem(`reminder-${activityId}`, JSON.stringify(reminderData))
      setReminderSet(true)
      showToast(`Reminder set for ${reminderTime} minutes before`, 'success')
    } catch (err) {
      showToast('Failed to set reminder', 'error')
    }
  }

  const handleRemoveReminder = () => {
    localStorage.removeItem(`reminder-${activityId}`)
    setReminderSet(false)
    showToast('Reminder removed', 'success')
  }

  if (reminderSet) {
    return (
      <div className="mt-2 p-2 bg-success/10 border border-success rounded text-sm">
        <div className="flex items-center justify-between">
          <span className="text-success">
            ⏰ Reminder set ({reminderTime} min before)
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemoveReminder}
            className="text-xs"
          >
            Remove
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-2 flex items-center gap-2">
      <select
        value={reminderTime}
        onChange={(e) => setReminderTime(e.target.value)}
        className="px-2 py-1 border rounded text-sm"
      >
        <option value="5">5 min before</option>
        <option value="15">15 min before</option>
        <option value="30">30 min before</option>
        <option value="60">1 hour before</option>
      </select>
      <Button
        variant="outline"
        size="sm"
        onClick={handleSetReminder}
        className="text-xs"
      >
        Set Reminder
      </Button>
    </div>
  )
}

