'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        if (data.session) {
          // Store token for API calls
          localStorage.setItem('supabase.auth.token', data.session.access_token)
          router.push('/')
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })

        if (error) throw error

        if (data.session) {
          localStorage.setItem('supabase.auth.token', data.session.access_token)
          router.push('/')
        } else {
          setError('Please check your email to confirm your account')
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-card shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-2 text-center">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </h1>
          <p className="text-gray-600 text-center mb-6">
            {isLogin
              ? 'Welcome back to Japan Itinerary System'
              : 'Create your account to start planning'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              minLength={6}
            />

            {error && (
              <div className="p-4 bg-error/10 border border-error rounded-card text-error text-sm">
                {error}
              </div>
            )}

            <Button type="submit" isLoading={loading} className="w-full" size="lg">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin)
                setError(null)
              }}
              className="text-primary hover:text-primary-dark text-sm font-medium"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

