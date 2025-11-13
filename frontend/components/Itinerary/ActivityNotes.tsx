'use client'

import { useState } from 'react'
import Button from '../UI/Button'
import { useToast } from '../UI/ToastContainer'

interface ActivityNotesProps {
  activityId: string
  initialNotes?: string
  onSave?: (notes: string) => void
}

export default function ActivityNotes({
  activityId,
  initialNotes = '',
  onSave,
}: ActivityNotesProps) {
  const { showToast } = useToast()
  const [notes, setNotes] = useState(initialNotes)
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      // In a real app, this would save to the backend
      // For now, we'll just call the onSave callback
      if (onSave) {
        onSave(notes)
      }
      
      // Save to localStorage as a fallback
      localStorage.setItem(`activity-notes-${activityId}`, notes)
      
      setIsEditing(false)
      showToast('Notes saved', 'success')
    } catch (err) {
      showToast('Failed to save notes', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (!isEditing && !notes) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="text-sm text-primary hover:text-primary-dark"
      >
        + Add notes
      </button>
    )
  }

  if (!isEditing) {
    return (
      <div className="mt-2">
        <p className="text-sm text-gray-700 italic mb-2">{notes}</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditing(true)}
        >
          Edit notes
        </Button>
      </div>
    )
  }

  return (
    <div className="mt-2">
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add your personal notes, reminders, or tips..."
        className="w-full px-3 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        rows={3}
      />
      <div className="flex gap-2 mt-2">
        <Button
          size="sm"
          onClick={handleSave}
          isLoading={saving}
        >
          Save
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setNotes(initialNotes)
            setIsEditing(false)
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

