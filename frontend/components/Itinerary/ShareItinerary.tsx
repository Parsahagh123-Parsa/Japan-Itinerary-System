'use client'

import { useState } from 'react'
import Button from '../UI/Button'
import { useToast } from '../UI/ToastContainer'

interface ShareItineraryProps {
  itineraryId: string
  title: string
}

export default function ShareItinerary({ itineraryId, title }: ShareItineraryProps) {
  const { showToast } = useToast()
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/itinerary/${itineraryId}`
    : ''

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      showToast('Link copied to clipboard!', 'success')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      showToast('Failed to copy link', 'error')
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out my Japan itinerary: ${title}`,
          text: `I created a Japan travel itinerary: ${title}`,
          url: shareUrl,
        })
        showToast('Shared successfully!', 'success')
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          showToast('Failed to share', 'error')
        }
      }
    } else {
      handleCopy()
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
      >
        {copied ? '✓ Copied!' : 'Copy Link'}
      </Button>
      {navigator.share && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
        >
          Share
        </Button>
      )}
    </div>
  )
}

