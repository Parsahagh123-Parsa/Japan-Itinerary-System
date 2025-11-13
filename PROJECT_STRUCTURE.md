# Project Structure

Complete overview of the Japan Itinerary System codebase.

```
Japan-Itinerary-System/
│
├── 📁 frontend/                    # Next.js 14 Frontend Application
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home page
│   │   └── globals.css            # Global styles
│   ├── components/                 # React components
│   │   └── UI/                    # Reusable UI components
│   │       ├── Button.tsx
│   │       └── Input.tsx
│   ├── services/                   # API service functions
│   │   ├── api.ts                 # Axios instance
│   │   ├── itinerary.ts           # Itinerary API calls
│   │   ├── bookings.ts            # Booking API calls
│   │   ├── maps.ts                # Map API calls
│   │   └── transit.ts             # Transit API calls
│   ├── hooks/                      # Custom React hooks
│   │   └── useItinerary.ts        # Itinerary management hook
│   ├── types/                      # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/                      # Utility functions
│   │   └── cn.ts                  # Class name utility
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── .eslintrc.json
│
├── 📁 backend/                     # Express.js Backend API
│   ├── src/
│   │   ├── server.ts              # Express server entry point
│   │   ├── config/                # Configuration files
│   │   │   └── supabase.ts        # Supabase client setup
│   │   ├── routes/                # API route definitions
│   │   │   ├── itinerary.ts
│   │   │   ├── bookings.ts
│   │   │   ├── maps.ts
│   │   │   ├── transit.ts
│   │   │   └── translate.ts
│   │   ├── controllers/           # Request handlers
│   │   │   ├── itineraryController.ts
│   │   │   ├── bookingController.ts
│   │   │   ├── mapController.ts
│   │   │   ├── transitController.ts
│   │   │   └── translateController.ts
│   │   ├── services/              # Business logic
│   │   │   ├── ai/                # AI services
│   │   │   │   └── itineraryService.ts  # LangChain + OpenAI
│   │   │   ├── itineraryService.ts
│   │   │   ├── bookingService.ts
│   │   │   ├── mapService.ts
│   │   │   ├── transitService.ts
│   │   │   └── translateService.ts
│   │   ├── models/                # TypeScript models
│   │   │   ├── Itinerary.ts
│   │   │   ├── Booking.ts
│   │   │   ├── Place.ts
│   │   │   └── User.ts
│   │   ├── middlewares/           # Express middlewares
│   │   │   └── auth.ts            # Authentication middleware
│   │   └── utils/                 # Utility functions
│   │       ├── errors.ts          # Custom error classes
│   │       └── validation.ts      # Zod validation schemas
│   ├── migrations/                # Database migrations
│   │   └── 001_initial_schema.sql # Initial Supabase schema
│   ├── package.json
│   ├── tsconfig.json
│   └── .eslintrc.json
│
├── 📁 docs/                        # Documentation
│   ├── API_REFERENCE.md           # API endpoint documentation
│   ├── SYSTEM_ARCHITECTURE.md     # Architecture diagrams
│   └── DESIGN_NOTES.md            # UI/UX guidelines
│
├── 📁 scripts/                     # Utility scripts
│   ├── data-seed.ts               # Database seeding script
│   └── package.json
│
├── 📁 mobile/                      # React Native app (future)
│   └── README.md
│
├── 📄 .cursorrules                 # Cursor AI configuration
├── 📄 .gitignore                   # Git ignore rules
├── 📄 README.md                    # Main project README
├── 📄 SETUP.md                     # Setup instructions
├── 📄 CODEBASE_DOCUMENTATION.md    # Codebase overview
├── 📄 PROGRESS_SUMMARY.md          # Development progress
└── 📄 PROJECT_STRUCTURE.md         # This file
```

## Key Files

### Configuration
- `.cursorrules` - Cursor AI context and rules
- `frontend/.env.example` - Frontend environment variables template
- `backend/.env.example` - Backend environment variables template

### Documentation
- `README.md` - Project overview and getting started
- `SETUP.md` - Detailed setup instructions
- `CODEBASE_DOCUMENTATION.md` - System architecture and flow
- `docs/API_REFERENCE.md` - Complete API documentation
- `docs/SYSTEM_ARCHITECTURE.md` - Architecture diagrams
- `docs/DESIGN_NOTES.md` - UI/UX design guidelines

### Database
- `backend/migrations/001_initial_schema.sql` - Initial database schema with RLS policies

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Maps**: Mapbox GL
- **State**: React Hooks + Context
- **HTTP**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **AI**: LangChain + OpenAI
- **Validation**: Zod

## Getting Started

1. See `SETUP.md` for detailed setup instructions
2. Run database migrations in Supabase
3. Configure environment variables
4. Start backend: `cd backend && npm run dev`
5. Start frontend: `cd frontend && npm run dev`

## Development Workflow

1. Make changes to code
2. TypeScript will type-check automatically
3. ESLint will check code quality
4. Update `PROGRESS_SUMMARY.md` with changes
5. Commit and push

## Next Steps

- [ ] Set up Supabase project and run migrations
- [ ] Configure all API keys
- [ ] Implement authentication UI
- [ ] Build itinerary creation flow
- [ ] Integrate Mapbox maps
- [ ] Add booking integrations
- [ ] Implement AR navigation
- [ ] Add offline support

