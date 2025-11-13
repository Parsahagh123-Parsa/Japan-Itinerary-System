import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')
  const date = searchParams.get('date')

  if (!lat || !lon) {
    return NextResponse.json(
      { error: 'Missing required parameters: lat, lon' },
      { status: 400 }
    )
  }

  try {
    // Proxy request to backend API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
    const response = await fetch(
      `${apiUrl}/api/weather?lat=${lat}&lon=${lon}${date ? `&date=${date}` : ''}`,
      {
        headers: {
          Authorization: request.headers.get('Authorization') || '',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch weather')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch weather', message: error.message },
      { status: 500 }
    )
  }
}

