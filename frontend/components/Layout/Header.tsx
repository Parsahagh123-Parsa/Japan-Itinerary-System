'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import Button from '../UI/Button'
import NotificationCenter from '../Notifications/NotificationCenter'

export default function Header() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('supabase.auth.token')
    router.push('/login')
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            Japan Itinerary
          </Link>

          <nav className="flex items-center gap-4">
            {user ? (
              <>
                <Link href="/">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Link href="/map">
                  <Button variant="ghost">Map</Button>
                </Link>
                <Link href="/bookings">
                  <Button variant="ghost">Bookings</Button>
                </Link>
                <Link href="/translate">
                  <Button variant="ghost">Translate</Button>
                </Link>
                <Link href="/transit">
                  <Button variant="ghost">Transit</Button>
                </Link>
                <Link href="/itinerary/create">
                  <Button variant="primary">Create Itinerary</Button>
                </Link>
                <Link href="/profile">
                  <Button variant="ghost">Profile</Button>
                </Link>
                <NotificationCenter />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{user.email}</span>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <Link href="/login">
                <Button variant="primary">Sign In</Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

