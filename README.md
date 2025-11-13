# Japan Itinerary System

An all-in-one AI-powered Japan travel platform where users can automatically generate trip itineraries, book accommodations and activities, navigate with AR maps, and dynamically adjust plans using AI.

## 🎯 Features

- **AI Itinerary Engine** - Automatically generates day-by-day schedules with restaurants, attractions, and activities
- **Integrated Bookings** - Book hotels, restaurants, and activities directly in-app (Booking.com, Klook, Hotpepper, Gurunavi)
- **AR Navigation** - Real-time AR map overlay with walking paths and landmarks
- **Transit Planning** - Live Japan Rail schedules, platforms, and transfer information
- **Adaptive Re-planning** - AI adjusts itinerary based on weather, mood, crowds, or schedule changes
- **Offline Mode** - Access itineraries and maps offline
- **Translation** - Real-time Japanese-English translation with image-based menu translation

## 🧱 Tech Stack

### Frontend
- **Next.js 14** (TypeScript) - React framework with App Router
- **TailwindCSS** - Utility-first CSS framework
- **Mapbox GL** - Interactive maps
- **WebXR** - AR overlay capabilities

### Backend
- **Node.js** (TypeScript) - Runtime environment
- **Express** - Web framework
- **Supabase** - PostgreSQL database + Authentication
- **LangChain** - AI orchestration
- **OpenAI API** - GPT-4 for itinerary generation

### Integrations
- Google Maps & Japan Rail APIs (transit)
- Booking.com & Airbnb APIs (lodging)
- Klook & GetYourGuide APIs (activities)
- Hotpepper & Gurunavi APIs (food)
- DeepL API (translation)

## 📁 Project Structure

```
Japan-Itinerary-System/
├── frontend/               # Next.js application
│   ├── app/               # Next.js App Router pages
│   ├── components/        # React components
│   ├── services/          # API service functions
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
├── backend/               # Express API server
│   ├── routes/            # API routes
│   ├── controllers/       # Request handlers
│   ├── services/          # Business logic
│   ├── models/            # Database models
│   └── middlewares/       # Express middlewares
├── docs/                  # Documentation
├── scripts/               # Utility scripts
└── mobile/                # React Native app (optional)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account
- API keys for:
  - OpenAI
  - Mapbox
  - Google Maps
  - Japan Rail
  - Booking.com, Klook, etc. (optional for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Japan-Itinerary-System.git
   cd Japan-Itinerary-System
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your API keys
   npm run dev
   ```

3. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   cp .env.example .env.local
   # Edit .env.local with your API keys
   npm run dev
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the SQL migrations from `backend/migrations/`
   - Copy your Supabase URL and anon key to `.env` files

5. **Open the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 📚 Documentation

- [Codebase Documentation](./CODEBASE_DOCUMENTATION.md) - System overview and architecture
- [API Reference](./docs/API_REFERENCE.md) - API endpoint documentation
- [System Architecture](./docs/SYSTEM_ARCHITECTURE.md) - Detailed architecture diagrams
- [Design Notes](./docs/DESIGN_NOTES.md) - UI/UX guidelines
- [Progress Summary](./PROGRESS_SUMMARY.md) - Development progress tracking

## 🔧 Development

### Running in Development Mode

```bash
# Backend (from backend/)
npm run dev

# Frontend (from frontend/)
npm run dev
```

### Building for Production

```bash
# Backend
npm run build
npm start

# Frontend
npm run build
npm start
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📝 Environment Variables

See `.env.example` files in `frontend/` and `backend/` directories for required environment variables.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Japan Rail for transit data
- Mapbox for mapping services
- OpenAI for AI capabilities
- All the amazing open-source libraries used in this project
