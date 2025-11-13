'use client'

import { useState, FormEvent } from 'react'
import Button from '../UI/Button'
import Input from '../UI/Input'
import { useToast } from '../UI/ToastContainer'
import { supabase } from '../../lib/supabase'

interface CollaborateModalProps {
  itineraryId: string
  onClose: () => void
}

export default function CollaborateModal({
  itineraryId,
  onClose,
}: CollaborateModalProps) {
  const { showToast } = useToast()
  const [email, setEmail] = useState('')
  const [permission, setPermission] = useState<'view' | 'edit'>('view')
  const [loading, setLoading] = useState(false)

  const handleInvite = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      showToast('Please enter an email address', 'error')
      return
    }

    setLoading(true)

    try {
      // In production, this would:
      // 1. Check if user exists
      // 2. Send invitation email
      // 3. Create collaboration record in database
      
      // For now, we'll simulate the invitation
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      showToast(`Invitation sent to ${email}`, 'success')
      setEmail('')
      onClose()
    } catch (err) {
      showToast('Failed to send invitation', 'error')
    } finally {
      setLoading(false)
    }
  }

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/itinerary/${itineraryId}`
    : ''

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      showToast('Link copied to clipboard!', 'success')
    } catch (err) {
      showToast('Failed to copy link', 'error')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-card shadow-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4">Collaborate</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Invite by Email</h3>
            <form onSubmit={handleInvite} className="space-y-3">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="friend@example.com"
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permission Level
                </label>
                <select
                  value={permission}
                  onChange={(e) => setPermission(e.target.value as 'view' | 'edit')}
                  className="w-full px-4 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="view">View Only</option>
                  <option value="edit">Can Edit</option>
                </select>
              </div>

              <Button type="submit" isLoading={loading} className="w-full">
                Send Invitation
              </Button>
            </form>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-semibold mb-3">Share Link</h3>
            <div className="flex gap-2">
              <Input
                value={shareUrl}
                readOnly
                className="flex-1"
              />
              <Button variant="outline" onClick={handleCopyLink}>
                Copy
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Anyone with this link can view the itinerary
            </p>
          </div>
        </div>

        <div className="mt-6">
          <Button variant="outline" onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

