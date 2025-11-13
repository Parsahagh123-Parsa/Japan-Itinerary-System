# Japan Itinerary System — Codebase Documentation

## Overview

An all-in-one AI-driven Japan travel system with itinerary automation, booking, AR navigation, and transit logic.

## System Flow

1. User enters travel dates, interests, cities, and budget.
2. Backend AI (LangChain) creates a day-by-day itinerary with timing, restaurants, and nearby events.
3. The itinerary syncs with real-time APIs (Japan Rail, Klook, etc.).
4. The frontend Mapbox AR view displays the next destination in AR.
5. User can adjust or re-plan mid-trip (AI agent modifies plan).
6. Supabase stores user data, itineraries, and bookings securely.

## API Modules

- **/api/itinerary/** → AI itinerary generation
- **/api/bookings/** → Hotel, restaurant, and activity bookings
- **/api/maps/** → Mapbox route + AR overlay data
- **/api/transit/** → JR/Metro schedule lookups
- **/api/translate/** → Text + image translation endpoint

## Database Models

- **User** - User profiles, preferences, authentication
- **Itinerary** - Trip plans with dates, cities, activities
- **Booking** - Hotel, restaurant, activity reservations
- **Place** - Points of interest, restaurants, attractions
- **Activity** - Scheduled activities with timing and details
- **TransitRoute** - Train/bus routes and schedules
- **Review** - User reviews and ratings

## Key Dependencies

- **Frontend**: Next.js, TypeScript, TailwindCSS, Mapbox GL, WebXR
- **Backend**: Node.js, Express, TypeScript, Supabase, LangChain, OpenAI
- **APIs**: Google Maps, Japan Rail, Booking.com, Klook, DeepL, Hotpepper, Gurunavi
- **Utilities**: Axios, Zod (validation), date-fns

## Architecture Patterns

- **Frontend**: Component-based architecture with custom hooks for API calls
- **Backend**: RESTful API with controller-service-repository pattern
- **State Management**: React Context + hooks for global state
- **API Communication**: Axios-based service layer with error handling
- **Type Safety**: Full TypeScript coverage with shared types

## File Organization

### Frontend (`/frontend`)
- `pages/` - Next.js pages and API routes
- `components/` - Reusable UI components
- `services/` - API service functions
- `hooks/` - Custom React hooks
- `types/` - TypeScript type definitions
- `utils/` - Helper functions
- `styles/` - Global styles and Tailwind config

### Backend (`/backend`)
- `routes/` - Express route definitions
- `controllers/` - Request handlers
- `services/` - Business logic
- `models/` - Database models and types
- `utils/` - Utilities and helpers
- `middlewares/` - Express middlewares
- `config/` - Configuration files

## Environment Variables

See `.env.example` files in frontend and backend directories for required environment variables.

