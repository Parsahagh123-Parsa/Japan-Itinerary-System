'use client'

import { useState } from 'react'
import Button from '../UI/Button'
import Input from '../UI/Input'
import { useToast } from '../UI/ToastContainer'
import type { Activity } from '../../services/itinerary'

interface QuickAddActivityProps {
  day: number
  date: string
  onAdd: (activity: Activity) => void
}

const QUICK_ACTIVITIES = [
  { name: 'Breakfast', type: 'Meal', duration: 60 },
  { name: 'Lunch', type: 'Meal', duration: 60 },
  { name: 'Dinner', type: 'Meal', duration: 90 },
  { name: 'Coffee Break', type: 'Meal', duration: 30 },
  { name: 'Shopping', type: 'Shopping', duration: 120 },
  { name: 'Free Time', type: 'Leisure', duration: 60 },
  { name: 'Rest', type: 'Leisure', duration: 60 },
]

export default function QuickAddActivity({
  day,
  date,
  onAdd,
}: QuickAddActivityProps) {
  const { showToast } = useToast()
  const [showForm, setShowForm] = useState(false)
  const [activityName, setActivityName] = useState('')
  const [activityType, setActivityType] = useState('Activity')
  const [startTime, setStartTime] = useState('10:00')
  const [duration, setDuration] = useState(60)

  const handleQuickAdd = (quickActivity: typeof QUICK_ACTIVITIES[0]) => {
    const start = new Date(`${date}T${startTime}`)
    const end = new Date(start.getTime() + quickActivity.duration * 60000)

    const activity: Activity = {
      id: `quick-${Date.now()}`,
      name: quickActivity.name,
      type: quickActivity.type,
      startTime: startTime,
      endTime: `${String(end.getHours()).padStart(2, '0')}:${String(end.getMinutes()).padStart(2, '0')}`,
      location: {
        name: 'TBD',
        address: 'To be determined',
        coordinates: [0, 0],
      },
    }

    onAdd(activity)
    showToast(`${quickActivity.name} added to Day ${day}`, 'success')
  }

  const handleCustomAdd = () => {
    if (!activityName.trim()) {
      showToast('Please enter an activity name', 'error')
      return
    }

    const start = new Date(`${date}T${startTime}`)
    const end = new Date(start.getTime() + duration * 60000)

    const activity: Activity = {
      id: `custom-${Date.now()}`,
      name: activityName,
      type: activityType,
      startTime: startTime,
      endTime: `${String(end.getHours()).padStart(2, '0')}:${String(end.getMinutes()).padStart(2, '0')}`,
      location: {
        name: 'TBD',
        address: 'To be determined',
        coordinates: [0, 0],
      },
    }

    onAdd(activity)
    showToast(`${activityName} added to Day ${day}`, 'success')
    setActivityName('')
    setShowForm(false)
  }

  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-700">Quick Add Activity</h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Hide' : 'Custom'}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {QUICK_ACTIVITIES.map((activity, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => handleQuickAdd(activity)}
          >
            + {activity.name}
          </Button>
        ))}
      </div>

      {showForm && (
        <div className="bg-gray-50 rounded-card p-4 space-y-3">
          <Input
            label="Activity Name"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
            placeholder="Enter activity name"
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
                className="w-full px-4 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Activity</option>
                <option>Meal</option>
                <option>Shopping</option>
                <option>Leisure</option>
                <option>Transport</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="15"
              step="15"
              className="w-full px-4 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button onClick={handleCustomAdd} className="w-full">
            Add Activity
          </Button>
        </div>
      )}
    </div>
  )
}

