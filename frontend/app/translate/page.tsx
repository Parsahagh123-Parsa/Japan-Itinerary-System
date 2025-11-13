'use client'

import { useState } from 'react'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import { translateText } from '../../services/translate'

export default function TranslatePage() {
  const [text, setText] = useState('')
  const [translation, setTranslation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sourceLang, setSourceLang] = useState('ja')
  const [targetLang, setTargetLang] = useState('en')

  const handleTranslate = async () => {
    if (!text.trim()) {
      setError('Please enter text to translate')
      return
    }

    setLoading(true)
    setError(null)
    setTranslation('')

    try {
      const result = await translateText(text, sourceLang, targetLang)
      setTranslation(result)
    } catch (err: any) {
      setError(err.message || 'Failed to translate text')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Translation</h1>

        <div className="bg-white rounded-card shadow-sm p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Language
              </label>
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="w-full px-4 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="ja">Japanese</option>
                <option value="en">English</option>
                <option value="ko">Korean</option>
                <option value="zh">Chinese</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Language
              </label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full px-4 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="en">English</option>
                <option value="ja">Japanese</option>
                <option value="ko">Korean</option>
                <option value="zh">Chinese</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text to Translate
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to translate..."
              className="w-full px-4 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary min-h-[150px]"
              rows={6}
            />
          </div>

          <Button
            onClick={handleTranslate}
            isLoading={loading}
            className="w-full"
            size="lg"
          >
            Translate
          </Button>

          {error && (
            <div className="p-4 bg-error/10 border border-error rounded-card text-error text-sm">
              {error}
            </div>
          )}

          {translation && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Translation
              </label>
              <div className="p-4 bg-gray-50 rounded-card border min-h-[150px]">
                <p className="text-gray-900 whitespace-pre-wrap">{translation}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

