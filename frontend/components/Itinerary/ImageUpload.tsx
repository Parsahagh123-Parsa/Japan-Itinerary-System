'use client'

import { useState, useRef } from 'react'
import Button from '../UI/Button'
import { useToast } from '../UI/ToastContainer'

interface ImageUploadProps {
  onUpload: (url: string) => void
  currentImage?: string
  label?: string
}

export default function ImageUpload({
  onUpload,
  currentImage,
  label = 'Upload Image',
}: ImageUploadProps) {
  const { showToast } = useToast()
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showToast('Please select an image file', 'error')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image size must be less than 5MB', 'error')
      return
    }

    setUploading(true)

    try {
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      // In production, upload to Supabase Storage or cloud storage
      // For now, we'll use the data URL as a placeholder
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(file)
      })

      onUpload(dataUrl)
      showToast('Image uploaded successfully', 'success')
    } catch (err) {
      showToast('Failed to upload image', 'error')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onUpload('')
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-card border border-gray-200"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 w-8 h-8 bg-error text-white rounded-full flex items-center justify-center hover:bg-error-dark"
          >
            ×
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-card p-8 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <div className="text-4xl mb-2">📷</div>
          <p className="text-sm text-gray-600 mb-2">
            Click to upload an image
          </p>
          <p className="text-xs text-gray-500">
            PNG, JPG up to 5MB
          </p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {!preview && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          isLoading={uploading}
          className="mt-2"
        >
          {uploading ? 'Uploading...' : 'Choose Image'}
        </Button>
      )}
    </div>
  )
}

