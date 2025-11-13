# System Architecture

## High-Level Overview

```
┌─────────────────┐
│   Next.js App   │ (Frontend - Vercel)
│  (TypeScript)   │
└────────┬────────┘
         │ HTTPS
         ▼
┌─────────────────┐
│  Express API    │ (Backend - Railway)
│  (Node.js)      │
└────────┬────────┘
         │
    ┌────┴────┬──────────┬──────────┬──────────┐
    ▼         ▼          ▼          ▼          ▼
┌────────┐ ┌──────┐ ┌────────┐ ┌──────┐ ┌────────┐
│Supabase│ │OpenAI│ │Mapbox  │ │Japan │ │Booking │
│  DB    │ │ API  │ │  API   │ │ Rail │ │  APIs  │
└────────┘ └──────┘ └────────┘ └──────┘ └────────┘
```

## Component Architecture

### Frontend (Next.js)

```
pages/
├── index.tsx              # Landing page
├── dashboard.tsx          # User dashboard
├── itinerary/
│   ├── [id].tsx          # Itinerary detail view
│   └── create.tsx        # Itinerary creation
├── map.tsx               # AR map view
└── api/                  # Next.js API routes (proxies)

components/
├── Itinerary/
│   ├── ItineraryCard.tsx
│   ├── DaySchedule.tsx
│   └── ActivityItem.tsx
├── Map/
│   ├── MapboxMap.tsx
│   └── AROverlay.tsx
├── Booking/
│   ├── HotelCard.tsx
│   └── BookingForm.tsx
└── UI/
    ├── Button.tsx
    ├── Input.tsx
    └── Modal.tsx

services/
├── api.ts                # Axios instance
├── itinerary.ts          # Itinerary API calls
├── bookings.ts           # Booking API calls
├── maps.ts               # Map API calls
└── transit.ts            # Transit API calls
```

### Backend (Express)

```
routes/
├── itinerary.ts          # Itinerary routes
├── bookings.ts           # Booking routes
├── maps.ts               # Map routes
├── transit.ts            # Transit routes
└── translate.ts          # Translation routes

controllers/
├── itineraryController.ts
├── bookingController.ts
├── mapController.ts
└── transitController.ts

services/
├── ai/
│   ├── itineraryService.ts    # LangChain + OpenAI
│   └── replanService.ts       # Adaptive replanning
├── integrations/
│   ├── bookingService.ts      # Booking.com
│   ├── klookService.ts        # Klook
│   ├── jrService.ts           # Japan Rail
│   └── restaurantService.ts   # Hotpepper/Gurunavi
└── maps/
    ├── mapboxService.ts       # Mapbox integration
    └── arService.ts           # AR overlay generation

models/
├── User.ts
├── Itinerary.ts
├── Booking.ts
└── Place.ts
```

## Data Flow

### Itinerary Generation Flow

1. User submits form → Frontend service call
2. Frontend → Backend `/api/itinerary/generate`
3. Backend → LangChain → OpenAI API
4. OpenAI returns structured itinerary
5. Backend enriches with real-time data (JR schedules, availability)
6. Backend saves to Supabase
7. Backend returns complete itinerary
8. Frontend displays itinerary with Mapbox visualization

### AR Navigation Flow

1. User selects activity → Frontend requests route
2. Frontend → Backend `/api/maps/route`
3. Backend → Mapbox API for route data
4. Backend → `/api/maps/ar-overlay` for AR markers
5. Frontend renders Mapbox GL map
6. WebXR overlay shows AR waypoints
7. Real-time location updates route

## Database Schema (Supabase)

```sql
-- Users table (handled by Supabase Auth)
-- Additional user preferences
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  interests TEXT[],
  budget_range TEXT,
  travel_style TEXT
);

-- Itineraries
CREATE TABLE itineraries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT,
  start_date DATE,
  end_date DATE,
  cities TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- Activities
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  itinerary_id UUID REFERENCES itineraries(id),
  day_number INTEGER,
  start_time TIME,
  end_time TIME,
  place_id UUID REFERENCES places(id),
  activity_type TEXT,
  notes TEXT
);

-- Places
CREATE TABLE places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  address TEXT,
  coordinates POINT,
  category TEXT,
  rating DECIMAL,
  price_range TEXT
);

-- Bookings
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  activity_id UUID REFERENCES activities(id),
  booking_type TEXT, -- 'hotel', 'restaurant', 'activity'
  external_id TEXT, -- ID from booking platform
  status TEXT,
  booked_at TIMESTAMP DEFAULT NOW()
);
```

## Security

- JWT authentication via Supabase
- Row-level security (RLS) in Supabase
- API rate limiting
- Input validation with Zod
- CORS configuration
- Environment variable protection

## Performance Optimizations

- Frontend: Next.js SSR/SSG for static pages
- API: Response caching for transit schedules
- Database: Indexed queries, connection pooling
- Maps: Tile caching, offline map support
- Images: Next.js Image optimization

