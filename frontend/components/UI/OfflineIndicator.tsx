'use client'

import { useOffline } from '../../hooks/useOffline'
import { useToast } from './ToastContainer'
import { useEffect } from 'react'

export default function OfflineIndicator() {
  const { isOnline, wasOffline } = useOffline()
  const { showToast } = useToast()

  useEffect(() => {
    if (!isOnline) {
      showToast('You are offline. Some features may be limited.', 'warning')
    } else if (wasOffline) {
      showToast('Connection restored!', 'success')
    }
  }, [isOnline, wasOffline, showToast])

  if (isOnline) return null

  return (
    <div className="fixed bottom-4 right-4 bg-warning text-white px-4 py-2 rounded-card shadow-lg z-50 flex items-center gap-2">
      <span>📡</span>
      <span className="text-sm font-medium">Offline Mode</span>
    </div>
  )
}

