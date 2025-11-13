'use client'

import { useEffect } from 'react'
import { clsx } from 'clsx'

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

interface ToastProps {
  toast: Toast
  onRemove: (id: string) => void
}

export default function Toast({ toast, onRemove }: ToastProps) {
  useEffect(() => {
    const duration = toast.duration || 3000
    const timer = setTimeout(() => {
      onRemove(toast.id)
    }, duration)

    return () => clearTimeout(timer)
  }, [toast.id, toast.duration, onRemove])

  const styles = {
    success: 'bg-success/10 border-success text-success',
    error: 'bg-error/10 border-error text-error',
    info: 'bg-primary/10 border-primary text-primary',
    warning: 'bg-warning/10 border-warning text-warning',
  }

  return (
    <div
      className={clsx(
        'p-4 rounded-card border shadow-lg mb-2 flex items-center justify-between min-w-[300px] max-w-md',
        styles[toast.type]
      )}
    >
      <p className="text-sm font-medium">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="ml-4 text-current opacity-70 hover:opacity-100"
      >
        ×
      </button>
    </div>
  )
}

