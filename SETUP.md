# Setup Guide

This guide will help you get the Japan Itinerary System up and running.

## Prerequisites

- Node.js 18+ and npm/yarn
- A Supabase account (free tier works)
- API keys for:
  - OpenAI (required for AI features)
  - Mapbox (required for maps)
  - Google Maps (optional, for transit fallback)
  - DeepL (optional, for translation)

## Step 1: Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd Japan-Itinerary-System

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Step 2: Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the migration file:
   - Copy contents of `backend/migrations/001_initial_schema.sql`
   - Paste and execute in Supabase SQL Editor
3. Get your Supabase credentials:
   - Project URL
   - Anon key
   - Service role key (keep this secret!)

## Step 3: Configure Environment Variables

### Backend (`backend/.env`)

```env
PORT=3001
NODE_ENV=development

SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key

OPENAI_API_KEY=your_openai_key
MAPBOX_ACCESS_TOKEN=your_mapbox_token
GOOGLE_MAPS_API_KEY=your_google_maps_key
DEEPL_API_KEY=your_deepl_key

ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Step 4: Run the Application

### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:3001`

### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:3000`

## Step 5: Seed Data (Optional)

```bash
cd scripts
npm install
npm run seed
```

This will populate the database with sample places.

## Step 6: Test the Setup

1. Open `http://localhost:3000` in your browser
2. Check backend health: `http://localhost:3001/health`
3. You should see a JSON response: `{"status":"ok","timestamp":"..."}`

## Troubleshooting

### Backend won't start
- Check that all environment variables are set
- Ensure port 3001 is not in use
- Check Supabase connection with your credentials

### Frontend won't start
- Check that backend is running first
- Verify `NEXT_PUBLIC_API_URL` points to backend
- Clear `.next` folder and try again: `rm -rf .next`

### Database errors
- Verify Supabase migration ran successfully
- Check RLS policies are enabled
- Ensure service role key has proper permissions

### API errors
- Check browser console for CORS issues
- Verify authentication tokens are being sent
- Check backend logs for detailed error messages

## Next Steps

1. Set up authentication (Supabase Auth)
2. Create your first itinerary
3. Explore the API endpoints
4. Customize the UI to your preferences

## Development Tips

- Use `npm run type-check` to verify TypeScript
- Use `npm run lint` to check code quality
- Check `PROGRESS_SUMMARY.md` for development status
- Refer to `CODEBASE_DOCUMENTATION.md` for architecture details

