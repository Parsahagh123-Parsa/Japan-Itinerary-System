'use client'

import { useState } from 'react'
import Button from '../UI/Button'

interface Phrase {
  english: string
  japanese: string
  romaji: string
  category: string
  pronunciation?: string
}

const ESSENTIAL_PHRASES: Phrase[] = [
  {
    english: 'Hello',
    japanese: 'こんにちは',
    romaji: 'Konnichiwa',
    category: 'Greetings',
    pronunciation: 'kon-nee-chee-wah',
  },
  {
    english: 'Thank you',
    japanese: 'ありがとうございます',
    romaji: 'Arigatou gozaimasu',
    category: 'Greetings',
    pronunciation: 'ah-ree-gah-toh goh-zah-ee-mahs',
  },
  {
    english: 'Excuse me / Sorry',
    japanese: 'すみません',
    romaji: 'Sumimasen',
    category: 'Common',
    pronunciation: 'soo-mee-mah-sen',
  },
  {
    english: 'Yes',
    japanese: 'はい',
    romaji: 'Hai',
    category: 'Common',
    pronunciation: 'high',
  },
  {
    english: 'No',
    japanese: 'いいえ',
    romaji: 'Iie',
    category: 'Common',
    pronunciation: 'ee-eh',
  },
  {
    english: 'Please',
    japanese: 'お願いします',
    romaji: 'Onegaishimasu',
    category: 'Common',
    pronunciation: 'oh-neh-gah-ee-shee-mahs',
  },
  {
    english: 'Do you speak English?',
    japanese: '英語を話せますか？',
    romaji: 'Eigo wo hanasemasu ka?',
    category: 'Communication',
    pronunciation: 'ay-goh wo hah-nah-seh-mahs kah',
  },
  {
    english: 'I don\'t understand',
    japanese: 'わかりません',
    romaji: 'Wakarimasen',
    category: 'Communication',
    pronunciation: 'wah-kah-ree-mah-sen',
  },
  {
    english: 'How much?',
    japanese: 'いくらですか？',
    romaji: 'Ikura desu ka?',
    category: 'Shopping',
    pronunciation: 'ee-koo-rah dess kah',
  },
  {
    english: 'Where is...?',
    japanese: '...はどこですか？',
    romaji: '...wa doko desu ka?',
    category: 'Directions',
    pronunciation: 'wah doh-koh dess kah',
  },
  {
    english: 'Bathroom',
    japanese: 'お手洗い',
    romaji: 'Otearai',
    category: 'Directions',
    pronunciation: 'oh-teh-ah-rah-ee',
  },
  {
    english: 'Help!',
    japanese: '助けて！',
    romaji: 'Tasukete!',
    category: 'Emergency',
    pronunciation: 'tah-soo-keh-teh',
  },
  {
    english: 'I\'m lost',
    japanese: '迷子です',
    romaji: 'Maigo desu',
    category: 'Emergency',
    pronunciation: 'my-goh dess',
  },
  {
    english: 'Check, please',
    japanese: 'お会計お願いします',
    romaji: 'Okaikei onegaishimasu',
    category: 'Dining',
    pronunciation: 'oh-kah-ee-keh-ee oh-neh-gah-ee-shee-mahs',
  },
  {
    english: 'Delicious',
    japanese: '美味しい',
    romaji: 'Oishii',
    category: 'Dining',
    pronunciation: 'oh-ee-shee',
  },
  {
    english: 'Water, please',
    japanese: 'お水お願いします',
    romaji: 'Omizu onegaishimasu',
    category: 'Dining',
    pronunciation: 'oh-mee-zoo oh-neh-gah-ee-shee-mahs',
  },
]

interface LanguageHelperProps {
  onPhraseSelect?: (phrase: Phrase) => void
}

export default function LanguageHelper({ onPhraseSelect }: LanguageHelperProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showPronunciation, setShowPronunciation] = useState(true)

  const categories = Array.from(
    new Set(ESSENTIAL_PHRASES.map((p) => p.category))
  )

  const filteredPhrases = ESSENTIAL_PHRASES.filter(
    (phrase) => selectedCategory === 'all' || phrase.category === selectedCategory
  )

  const handlePhraseClick = (phrase: Phrase) => {
    if (onPhraseSelect) {
      onPhraseSelect(phrase)
    }
  }

  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">🗣️ Essential Japanese Phrases</h3>
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1 text-sm border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPronunciation(!showPronunciation)}
          >
            {showPronunciation ? 'Hide' : 'Show'} Pron.
          </Button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
        <p className="text-xs text-blue-800">
          💡 Tip: Even basic Japanese phrases are greatly appreciated by locals. Don&apos;t worry about perfect pronunciation!
        </p>
      </div>

      <div className="space-y-3">
        {filteredPhrases.map((phrase, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-card p-4 hover:border-primary transition-colors cursor-pointer"
            onClick={() => handlePhraseClick(phrase)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded">
                    {phrase.category}
                  </span>
                </div>
                <p className="font-medium text-gray-900 mb-1">{phrase.english}</p>
                <p className="text-lg text-gray-800 mb-1">{phrase.japanese}</p>
                <p className="text-sm text-gray-600 italic mb-1">
                  {phrase.romaji}
                </p>
                {showPronunciation && phrase.pronunciation && (
                  <p className="text-xs text-gray-500">
                    🔊 {phrase.pronunciation}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

