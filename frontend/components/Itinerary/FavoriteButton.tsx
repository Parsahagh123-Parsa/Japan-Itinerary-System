'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useToast } from '../UI/ToastContainer'
import Button from '../UI/Button'

interface FavoriteButtonProps {
  itineraryId: string
}

export default function FavoriteButton({ itineraryId }: FavoriteButtonProps) {
  const { showToast } = useToast()
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkFavorite = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setLoading(false)
        return
      }

      // Check if itinerary is in favorites
      // For now, we'll use a simple approach with user preferences
      // In production, you might want a separate favorites table
      const { data } = await supabase
        .from('user_preferences')
        .select('favorite_itineraries')
        .eq('id', user.id)
        .single()

      if (data?.favorite_itineraries) {
        setIsFavorite(data.favorite_itineraries.includes(itineraryId))
      }

      setLoading(false)
    }

    checkFavorite()
  }, [itineraryId])

  const toggleFavorite = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      showToast('Please sign in to favorite itineraries', 'info')
      return
    }

    try {
      const { data: current } = await supabase
        .from('user_preferences')
        .select('favorite_itineraries')
        .eq('id', user.id)
        .single()

      const favorites = current?.favorite_itineraries || []
      const newFavorites = isFavorite
        ? favorites.filter((id: string) => id !== itineraryId)
        : [...favorites, itineraryId]

      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          id: user.id,
          favorite_itineraries: newFavorites,
        })

      if (error) throw error

      setIsFavorite(!isFavorite)
      showToast(
        isFavorite ? 'Removed from favorites' : 'Added to favorites',
        'success'
      )
    } catch (err: any) {
      showToast('Failed to update favorites', 'error')
    }
  }

  if (loading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        ⭐
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleFavorite}
      className={isFavorite ? 'text-warning' : ''}
    >
      {isFavorite ? '⭐' : '☆'}
    </Button>
  )
}

