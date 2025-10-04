import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock safety data for demo purposes
    // In production, this would fetch from crime APIs and process the data
    const mockSafetyData = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [-74.01, 40.71],
              [-74.00, 40.71],
              [-74.00, 40.72],
              [-74.01, 40.72],
              [-74.01, 40.71]
            ]]
          },
          properties: {
            safety_score: 85,
            crime_density: 2.3,
            offender_density: 1.1
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [-74.005, 40.715],
              [-74.004, 40.715],
              [-74.004, 40.716],
              [-74.005, 40.716],
              [-74.005, 40.715]
            ]]
          },
          properties: {
            safety_score: 45,
            crime_density: 8.7,
            offender_density: 4.2
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [-74.008, 40.708],
              [-74.007, 40.708],
              [-74.007, 40.709],
              [-74.008, 40.709],
              [-74.008, 40.708]
            ]]
          },
          properties: {
            safety_score: 72,
            crime_density: 4.1,
            offender_density: 2.3
          }
        }
      ]
    }

    return NextResponse.json(mockSafetyData)
  } catch (error) {
    console.error('Error fetching safety data:', error)
    return NextResponse.json({ error: 'Failed to fetch safety data' }, { status: 500 })
  }
}
