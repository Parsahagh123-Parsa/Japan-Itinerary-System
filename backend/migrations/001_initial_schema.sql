-- Japan Itinerary System Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User preferences table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  interests TEXT[] DEFAULT '{}',
  budget_range TEXT CHECK (budget_range IN ('budget', 'moderate', 'luxury')),
  travel_style TEXT CHECK (travel_style IN ('relaxed', 'moderate', 'packed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Places table (points of interest, restaurants, attractions)
CREATE TABLE IF NOT EXISTS places (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT,
  coordinates POINT, -- PostgreSQL point type (longitude, latitude)
  category TEXT, -- 'attraction', 'restaurant', 'hotel', 'activity', etc.
  rating DECIMAL(3, 2),
  price_range TEXT,
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on coordinates for spatial queries
CREATE INDEX IF NOT EXISTS idx_places_coordinates ON places USING GIST (coordinates);

-- Itineraries table
CREATE TABLE IF NOT EXISTS itineraries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  cities TEXT[] NOT NULL DEFAULT '{}',
  days JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of day schedules
  total_cost DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_itineraries_user_id ON itineraries(user_id);
CREATE INDEX IF NOT EXISTS idx_itineraries_dates ON itineraries(start_date, end_date);

-- Activities table (individual activities within an itinerary)
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  itinerary_id UUID NOT NULL REFERENCES itineraries(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  start_time TIME,
  end_time TIME,
  place_id UUID REFERENCES places(id) ON DELETE SET NULL,
  activity_type TEXT, -- 'attraction', 'restaurant', 'culture', 'nature', 'nightlife'
  name TEXT NOT NULL,
  notes TEXT,
  location JSONB, -- Store location details as JSON
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on itinerary_id for faster queries
CREATE INDEX IF NOT EXISTS idx_activities_itinerary_id ON activities(itinerary_id);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(id) ON DELETE SET NULL,
  booking_type TEXT NOT NULL CHECK (booking_type IN ('hotel', 'restaurant', 'activity')),
  external_id TEXT, -- ID from external booking platform (Booking.com, Klook, etc.)
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  booking_details JSONB, -- Store booking-specific details
  booked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes on bookings
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_activity_id ON bookings(activity_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- Transit routes table (cached transit information)
CREATE TABLE IF NOT EXISTS transit_routes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_station TEXT NOT NULL,
  to_station TEXT NOT NULL,
  departure_time TIMESTAMP WITH TIME ZONE NOT NULL,
  arrival_time TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER NOT NULL,
  transfers JSONB, -- Array of transfer information
  price DECIMAL(10, 2),
  route_data JSONB, -- Full route data from API
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE -- For cache expiration
);

-- Create index on transit routes
CREATE INDEX IF NOT EXISTS idx_transit_routes_stations ON transit_routes(from_station, to_station);
CREATE INDEX IF NOT EXISTS idx_transit_routes_departure ON transit_routes(departure_time);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  place_id UUID REFERENCES places(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes on reviews
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_place_id ON reviews(place_id);

-- Enable Row Level Security (RLS)
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can only see and modify their own data
CREATE POLICY "Users can view own preferences" ON user_preferences
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own preferences" ON user_preferences
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own preferences" ON user_preferences
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own itineraries" ON itineraries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own itineraries" ON itineraries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own itineraries" ON itineraries
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own itineraries" ON itineraries
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own activities" ON activities
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM itineraries
      WHERE itineraries.id = activities.itinerary_id
      AND itineraries.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings" ON bookings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own reviews" ON reviews
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Places and transit_routes are public read, but only admins can modify
CREATE POLICY "Anyone can view places" ON places
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view transit routes" ON transit_routes
  FOR SELECT USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_places_updated_at BEFORE UPDATE ON places
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_itineraries_updated_at BEFORE UPDATE ON itineraries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

