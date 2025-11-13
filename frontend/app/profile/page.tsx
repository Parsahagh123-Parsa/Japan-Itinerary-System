'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'

interface UserPreferences {
  interests: string[]
  budgetRange: 'budget' | 'moderate' | 'luxury'
  travelStyle: 'relaxed' | 'moderate' | 'packed'
}

const INTERESTS = [
  'food',
  'culture',
  'nature',
  'nightlife',
  'shopping',
  'history',
  'art',
  'technology',
  'anime',
  'temples',
]

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [preferences, setPreferences] = useState<UserPreferences>({
    interests: [],
    budgetRange: 'moderate',
    travelStyle: 'moderate',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      // Load preferences
      if (user) {
        const { data, error } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('id', user.id)
          .single()

        if (data && !error) {
          setPreferences({
            interests: data.interests || [],
            budgetRange: data.budget_range || 'moderate',
            travelStyle: data.travel_style || 'moderate',
          })
        }
      }

      setLoading(false)
    }

    loadUser()
  }, [])

  const toggleInterest = (interest: string) => {
    setPreferences({
      ...preferences,
      interests: preferences.interests.includes(interest)
        ? preferences.interests.filter((i) => i !== interest)
        : [...preferences.interests, interest],
    })
  }

  const handleSave = async () => {
    if (!user) return

    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          id: user.id,
          interests: preferences.interests,
          budget_range: preferences.budgetRange,
          travel_style: preferences.travelStyle,
        })

      if (error) throw error

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to save preferences')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Profile & Preferences</h1>

        <div className="bg-white rounded-card shadow-sm p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Account Information</h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Email:</span> {user?.email}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">User ID:</span> {user?.id}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-semibold mb-4">Travel Preferences</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interests
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {INTERESTS.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2 rounded-button text-sm font-medium transition-colors ${
                        preferences.interests.includes(interest)
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {interest.charAt(0).toUpperCase() + interest.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range
                  </label>
                  <select
                    value={preferences.budgetRange}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        budgetRange: e.target.value as 'budget' | 'moderate' | 'luxury',
                      })
                    }
                    className="w-full px-4 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="budget">Budget</option>
                    <option value="moderate">Moderate</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travel Style
                  </label>
                  <select
                    value={preferences.travelStyle}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        travelStyle: e.target.value as 'relaxed' | 'moderate' | 'packed',
                      })
                    }
                    className="w-full px-4 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="relaxed">Relaxed</option>
                    <option value="moderate">Moderate</option>
                    <option value="packed">Packed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-error/10 border border-error rounded-card text-error text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="p-4 bg-success/10 border border-success rounded-card text-success text-sm">
              Preferences saved successfully!
            </div>
          )}

          <Button
            onClick={handleSave}
            isLoading={saving}
            className="w-full"
            size="lg"
          >
            Save Preferences
          </Button>
        </div>
      </div>
    </main>
  )
}

