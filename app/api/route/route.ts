import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { start, end } = await request.json()

    if (!start || !end) {
      return NextResponse.json({ error: 'Start and end addresses are required' }, { status: 400 })
    }

    // Mock route data for demo
    // In production, this would use Mapbox Directions API with safety weighting
    const mockRouteData = {
      fastest: {
        duration: Math.floor(Math.random() * 30) + 15, // 15-45 minutes
        distance: Math.floor(Math.random() * 2000) + 1000, // 1-3 km
        safety_score: Math.floor(Math.random() * 30) + 40 // 40-70
      },
      safest: {
        duration: Math.floor(Math.random() * 20) + 20, // 20-40 minutes
        distance: Math.floor(Math.random() * 1500) + 1200, // 1.2-2.7 km
        safety_score: Math.floor(Math.random() * 20) + 70 // 70-90
      }
    }

    // Ensure safest route is actually safer
    if (mockRouteData.safest.safety_score <= mockRouteData.fastest.safety_score) {
      mockRouteData.safest.safety_score = mockRouteData.fastest.safety_score + 15
    }

    return NextResponse.json(mockRouteData)
  } catch (error) {
    console.error('Error planning route:', error)
    return NextResponse.json({ error: 'Failed to plan route' }, { status: 500 })
  }
}
