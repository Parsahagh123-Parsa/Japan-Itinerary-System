-- Migration: Add favorite_itineraries to user_preferences
-- Run this in your Supabase SQL editor

-- Add favorite_itineraries column to user_preferences table
ALTER TABLE user_preferences
ADD COLUMN IF NOT EXISTS favorite_itineraries UUID[] DEFAULT '{}';

-- Add comment for documentation
COMMENT ON COLUMN user_preferences.favorite_itineraries IS 'Array of itinerary IDs that the user has favorited';

