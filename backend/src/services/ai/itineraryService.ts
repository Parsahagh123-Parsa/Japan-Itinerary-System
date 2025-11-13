import { ChatOpenAI } from '@langchain/openai'
import { PromptTemplate } from 'langchain/prompts'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { z } from 'zod'

const openaiApiKey = process.env.OPENAI_API_KEY

if (!openaiApiKey) {
  throw new Error('OPENAI_API_KEY is not set')
}

const llm = new ChatOpenAI({
  modelName: 'gpt-4-turbo-preview',
  temperature: 0.7,
  openAIApiKey: openaiApiKey,
})

// Define schema for itinerary output
const itinerarySchema = z.object({
  days: z.array(
    z.object({
      day: z.number(),
      date: z.string(),
      activities: z.array(
        z.object({
          startTime: z.string(),
          endTime: z.string(),
          name: z.string(),
          type: z.string(),
          location: z.object({
            name: z.string(),
            address: z.string(),
            coordinates: z.tuple([z.number(), z.number()]),
          }),
          notes: z.string().optional(),
        })
      ),
    })
  ),
  totalCost: z.number().optional(),
})

type ItineraryOutput = z.infer<typeof itinerarySchema>

export interface ItineraryData {
  startDate: string
  endDate: string
  cities: string[]
  interests: string[]
  budget: 'budget' | 'moderate' | 'luxury'
  travelStyle?: 'relaxed' | 'moderate' | 'packed'
}

export interface Itinerary {
  id?: string
  userId?: string
  title?: string
  startDate: string
  endDate: string
  cities: string[]
  days: any[]
  totalCost?: number
}

export const aiService = {
  /**
   * Generate itinerary using OpenAI
   */
  async generateItinerary(data: ItineraryData): Promise<ItineraryOutput> {
    const prompt = PromptTemplate.fromTemplate(`
You are an expert Japan travel planner. Create a detailed day-by-day itinerary for a trip to Japan.

Travel Details:
- Start Date: {startDate}
- End Date: {endDate}
- Cities: {cities}
- Interests: {interests}
- Budget: {budget}
- Travel Style: {travelStyle}

Create a comprehensive itinerary with:
1. Daily schedules with specific times
2. Activities matching the user's interests
3. Restaurant recommendations for each day
4. Cultural experiences and local tips
5. Realistic travel times between locations
6. Backup options for each day

Return the itinerary as JSON with the following structure:
{{
  "days": [
    {{
      "day": 1,
      "date": "YYYY-MM-DD",
      "activities": [
        {{
          "startTime": "HH:mm",
          "endTime": "HH:mm",
          "name": "Activity name",
          "type": "attraction|restaurant|culture|nature|nightlife",
          "location": {{
            "name": "Location name",
            "address": "Full address",
            "coordinates": [longitude, latitude]
          }},
          "notes": "Helpful tips or information"
        }}
      ]
    }}
  ],
  "totalCost": estimated_total_cost_in_jpy
}}
`)

    const chain = prompt.pipe(llm)

    try {
      const response = await chain.invoke({
        startDate: data.startDate,
        endDate: data.endDate,
        cities: data.cities.join(', '),
        interests: data.interests.join(', '),
        budget: data.budget,
        travelStyle: data.travelStyle || 'moderate',
      })

      // Parse the response
      const content = response.content as string
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      
      if (!jsonMatch) {
        throw new Error('Failed to parse AI response')
      }

      const parsed = JSON.parse(jsonMatch[0])
      return itinerarySchema.parse(parsed)
    } catch (error) {
      console.error('Error generating itinerary:', error)
      throw new Error('Failed to generate itinerary with AI')
    }
  },

  /**
   * Adjust existing itinerary based on new conditions
   */
  async adjustItinerary(
    existing: Itinerary,
    reason: string,
    preferences?: Record<string, any>
  ): Promise<ItineraryOutput> {
    const prompt = PromptTemplate.fromTemplate(`
You are adjusting an existing Japan travel itinerary.

Current Itinerary:
{existingItinerary}

Reason for adjustment: {reason}

Preferences: {preferences}

Adjust the itinerary accordingly while maintaining the overall structure and key activities. 
Provide alternative activities that fit the new conditions (e.g., indoor activities for rainy weather, 
more relaxed schedule if time is limited, etc.).

Return the adjusted itinerary in the same JSON format as the original.
`)

    const chain = prompt.pipe(llm)

    try {
      const response = await chain.invoke({
        existingItinerary: JSON.stringify(existing.days, null, 2),
        reason,
        preferences: JSON.stringify(preferences || {}),
      })

      const content = response.content as string
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      
      if (!jsonMatch) {
        throw new Error('Failed to parse AI response')
      }

      const parsed = JSON.parse(jsonMatch[0])
      return itinerarySchema.parse(parsed)
    } catch (error) {
      console.error('Error adjusting itinerary:', error)
      throw new Error('Failed to adjust itinerary with AI')
    }
  },
}

