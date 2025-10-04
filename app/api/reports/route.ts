import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { lat, lng, category, comment } = await request.json()

    if (!lat || !lng || !category) {
      return NextResponse.json({ error: 'Latitude, longitude, and category are required' }, { status: 400 })
    }

    // Insert report into database
    const { data, error } = await supabase
      .from('reports')
      .insert([
        {
          lat: parseFloat(lat),
          lon: parseFloat(lng),
          category,
          comment: comment || null,
        }
      ])
      .select()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to save report' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      report: data[0],
      message: 'Report submitted successfully' 
    })
  } catch (error) {
    console.error('Error submitting report:', error)
    return NextResponse.json({ error: 'Failed to submit report' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const radius = searchParams.get('radius') || '0.01' // ~1km radius

    if (!lat || !lng) {
      return NextResponse.json({ error: 'Latitude and longitude are required' }, { status: 400 })
    }

    // Fetch reports within radius
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .gte('lat', parseFloat(lat) - parseFloat(radius))
      .lte('lat', parseFloat(lat) + parseFloat(radius))
      .gte('lon', parseFloat(lng) - parseFloat(radius))
      .lte('lon', parseFloat(lng) + parseFloat(radius))
      .order('timestamp', { ascending: false })
      .limit(50)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error fetching reports:', error)
    return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 })
  }
}
