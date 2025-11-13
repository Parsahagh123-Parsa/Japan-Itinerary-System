# API Reference

## Base URL
- **Development**: `http://localhost:3001/api`
- **Production**: `https://api.yourdomain.com/api`

## Authentication
Most endpoints require authentication via Supabase JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Itinerary

#### `POST /api/itinerary/generate`
Generate a new AI-powered itinerary.

**Request Body:**
```json
{
  "startDate": "2024-04-01",
  "endDate": "2024-04-07",
  "cities": ["Tokyo", "Kyoto"],
  "interests": ["food", "culture", "nature"],
  "budget": "moderate",
  "travelStyle": "relaxed"
}
```

**Response:**
```json
{
  "itinerary": {
    "id": "uuid",
    "days": [...],
    "totalCost": 150000,
    "createdAt": "2024-03-15T10:00:00Z"
  }
}
```

#### `PUT /api/itinerary/:id/adjust`
Adjust an existing itinerary based on new conditions.

**Request Body:**
```json
{
  "reason": "rainy_weather",
  "preferences": {
    "indoorActivities": true
  }
}
```

### Bookings

#### `POST /api/bookings/hotel`
Book a hotel through Booking.com integration.

#### `POST /api/bookings/restaurant`
Reserve a restaurant through Hotpepper/Gurunavi.

#### `POST /api/bookings/activity`
Book an activity through Klook.

### Maps

#### `GET /api/maps/route`
Get route data for Mapbox visualization.

**Query Parameters:**
- `from`: Starting coordinates
- `to`: Destination coordinates
- `mode`: `walking` | `transit` | `driving`

#### `GET /api/maps/ar-overlay`
Get AR overlay data for WebXR.

### Transit

#### `GET /api/transit/schedule`
Get Japan Rail schedule information.

**Query Parameters:**
- `from`: Station name
- `to`: Station name
- `date`: ISO date string
- `time`: Time string

### Translation

#### `POST /api/translate/text`
Translate text using DeepL API.

#### `POST /api/translate/image`
Translate text from an image (menu, sign, etc.).

