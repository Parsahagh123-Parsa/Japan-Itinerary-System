'use client'

import { useState } from 'react'
import Button from '../UI/Button'
import { useToast } from '../UI/ToastContainer'

interface ItineraryTagsProps {
  itineraryId: string
  tags: string[]
  onUpdate?: (tags: string[]) => void
}

const SUGGESTED_TAGS = [
  'food',
  'culture',
  'nature',
  'shopping',
  'nightlife',
  'family',
  'romantic',
  'budget',
  'luxury',
  'adventure',
  'relaxation',
  'photography',
  'history',
  'art',
  'music',
]

export default function ItineraryTags({
  itineraryId,
  tags: initialTags,
  onUpdate,
}: ItineraryTagsProps) {
  const { showToast } = useToast()
  const [tags, setTags] = useState<string[]>(initialTags || [])
  const [inputValue, setInputValue] = useState('')
  const [editing, setEditing] = useState(false)

  const handleAddTag = (tag: string) => {
    const normalizedTag = tag.trim().toLowerCase()
    if (normalizedTag && !tags.includes(normalizedTag)) {
      const newTags = [...tags, normalizedTag]
      setTags(newTags)
      onUpdate?.(newTags)
      setInputValue('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(newTags)
    onUpdate?.(newTags)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      handleAddTag(inputValue)
    }
  }

  const availableTags = SUGGESTED_TAGS.filter((tag) => !tags.includes(tag))

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">Tags</label>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setEditing(!editing)}
        >
          {editing ? 'Done' : 'Edit'}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
          >
            {tag}
            {editing && (
              <button
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-error"
              >
                ×
              </button>
            )}
          </span>
        ))}
      </div>

      {editing && (
        <div className="space-y-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Add a tag..."
            className="w-full px-4 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {availableTags.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Suggested:</p>
              <div className="flex flex-wrap gap-1">
                {availableTags.slice(0, 8).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleAddTag(tag)}
                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-button"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

