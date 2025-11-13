/**
 * Data seeding script for development
 * Run with: tsx scripts/data-seed.ts
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: './backend/.env' })

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedPlaces() {
  console.log('Seeding places...')

  const places = [
    {
      name: 'Senso-ji Temple',
      address: '2 Chome-3-1 Asakusa, Taito City, Tokyo 111-0032, Japan',
      coordinates: { x: 139.7947, y: 35.7148 }, // lng, lat
      category: 'attraction',
      rating: 4.5,
      price_range: 'free',
      description: 'Tokyo\'s oldest temple, dating back to 628 AD',
    },
    {
      name: 'Tsukiji Outer Market',
      address: '4 Chome-16-2 Tsukiji, Chuo City, Tokyo 104-0045, Japan',
      coordinates: { x: 139.7719, y: 35.6654 },
      category: 'attraction',
      rating: 4.3,
      price_range: 'moderate',
      description: 'Famous fish market with fresh seafood and street food',
    },
    {
      name: 'Sukiyabashi Jiro',
      address: '4 Chome-2-15 Ginza, Chuo City, Tokyo 104-0061, Japan',
      coordinates: { x: 139.7614, y: 35.6698 },
      category: 'restaurant',
      rating: 4.8,
      price_range: 'luxury',
      description: 'World-famous sushi restaurant',
    },
    {
      name: 'Fushimi Inari Shrine',
      address: '68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto, 612-0882, Japan',
      coordinates: { x: 135.7727, y: 34.9671 },
      category: 'attraction',
      rating: 4.6,
      price_range: 'free',
      description: 'Famous shrine with thousands of torii gates',
    },
    {
      name: 'Kiyomizu-dera',
      address: '1 Chome-294 Kiyomizu, Higashiyama Ward, Kyoto, 605-0862, Japan',
      coordinates: { x: 135.7850, y: 34.9949 },
      category: 'attraction',
      rating: 4.5,
      price_range: 'moderate',
      description: 'Historic wooden temple with panoramic city views',
    },
  ]

  const { data, error } = await supabase
    .from('places')
    .upsert(places, { onConflict: 'name' })
    .select()

  if (error) {
    console.error('Error seeding places:', error)
  } else {
    console.log(`✅ Seeded ${data?.length || 0} places`)
  }
}

async function main() {
  console.log('🌱 Starting data seed...\n')

  try {
    await seedPlaces()
    console.log('\n✅ Data seeding completed!')
  } catch (error) {
    console.error('❌ Error during seeding:', error)
    process.exit(1)
  }
}

main()

