'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ItineraryForm from '../../../components/Itinerary/ItineraryForm'
import ItineraryTemplates from '../../../components/Itinerary/ItineraryTemplates'
import Button from '../../../components/UI/Button'

export default function CreateItineraryPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showTemplates, setShowTemplates] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)

  useEffect(() => {
    // Check if template params are in URL
    const templateId = searchParams.get('template')
    if (templateId) {
      setShowTemplates(false)
    }
  }, [searchParams])

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template)
    setShowTemplates(false)
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            ← Back
          </Button>
          <h1 className="text-4xl font-bold mb-2">Create New Itinerary</h1>
          <p className="text-lg text-gray-600">
            {showTemplates
              ? 'Start with a template or create from scratch'
              : "Tell us about your trip and we'll generate a personalized itinerary"}
          </p>
        </div>

        {showTemplates ? (
          <div className="space-y-6">
            <ItineraryTemplates onSelectTemplate={handleTemplateSelect} />
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => setShowTemplates(false)}
                size="lg"
              >
                Create from Scratch Instead
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-card shadow-sm p-8">
            {selectedTemplate && (
              <div className="mb-6 p-4 bg-primary/10 border border-primary rounded-card">
                <p className="text-sm text-primary">
                  Using template: <strong>{selectedTemplate.name}</strong>
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowTemplates(true)
                    setSelectedTemplate(null)
                  }}
                  className="mt-2"
                >
                  Choose Different Template
                </Button>
              </div>
            )}
            <ItineraryForm initialData={selectedTemplate} />
          </div>
        )}
      </div>
    </main>
  )
}

