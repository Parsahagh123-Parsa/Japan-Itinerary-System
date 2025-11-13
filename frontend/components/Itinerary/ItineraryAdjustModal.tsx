'use client'

import { useState, FormEvent } from 'react'
import Button from '../UI/Button'
import Input from '../UI/Input'
import { useToast } from '../UI/ToastContainer'
import { adjustItinerary } from '../../services/itinerary'

interface ItineraryAdjustModalProps {
  itineraryId: string
  onClose: () => void
  onSuccess: () => void
}

const ADJUSTMENT_REASONS = [
  { value: 'weather', label: 'Weather conditions' },
  { value: 'time_constraint', label: 'Time constraint' },
  { value: 'budget_change', label: 'Budget change' },
  { value: 'preference_change', label: 'Preference change' },
  { value: 'crowd_avoidance', label: 'Avoid crowds' },
  { value: 'indoor_activities', label: 'Prefer indoor activities' },
  { value: 'other', label: 'Other' },
]

export default function ItineraryAdjustModal({
  itineraryId,
  onClose,
  onSuccess,
}: ItineraryAdjustModalProps) {
  const { showToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [reason, setReason] = useState('')
  const [customReason, setCustomReason] = useState('')
  const [preferences, setPreferences] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!reason) {
      showToast('Please select a reason for adjustment', 'error')
      return
    }

    setLoading(true)

    try {
      const adjustmentReason = reason === 'other' ? customReason : reason
      const adjustmentPreferences = preferences
        ? JSON.parse(preferences)
        : undefined

      await adjustItinerary(itineraryId, adjustmentReason, adjustmentPreferences)
      
      showToast('Itinerary adjusted successfully!', 'success')
      onSuccess()
      onClose()
    } catch (err: any) {
      showToast(err.message || 'Failed to adjust itinerary', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-card shadow-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4">Adjust Itinerary</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Adjustment
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select a reason...</option>
              {ADJUSTMENT_REASONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {reason === 'other' && (
            <Input
              label="Custom Reason"
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="Describe the reason..."
              required
            />
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Preferences (JSON, optional)
            </label>
            <textarea
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              placeholder='{"indoorActivities": true, "budget": "moderate"}'
              className="w-full px-4 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
              rows={3}
            />
            <p className="text-xs text-gray-500 mt-1">
              Optional: Provide additional preferences as JSON
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={loading} className="flex-1">
              Adjust Itinerary
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

