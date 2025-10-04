import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')

    if (!lat || !lng) {
      return NextResponse.json({ error: 'Latitude and longitude are required' }, { status: 400 })
    }

    // Mock data for demo - in production, fetch from crime APIs
    const mockCrimeData = {
      crime_incidents: Math.floor(Math.random() * 10),
      offender_density: Math.floor(Math.random() * 5),
      lighting_quality: ['Poor', 'Fair', 'Good', 'Excellent'][Math.floor(Math.random() * 4)],
      recent_incidents: [
        'Theft reported 3 days ago',
        'Assault reported 1 week ago',
        'Vandalism reported 2 weeks ago'
      ].slice(0, Math.floor(Math.random() * 3))
    }

    // Generate AI summary
    const prompt = `Summarize this area's safety in 2 sentences:
Crime incidents nearby: ${mockCrimeData.crime_incidents} in the last 30 days
Registered offenders: ${mockCrimeData.offender_density} in the area
Lighting quality: ${mockCrimeData.lighting_quality}
Recent incidents: ${mockCrimeData.recent_incidents.join(', ')}

Provide a concise, helpful summary for someone considering walking through this area.`

    let aiSummary = "This area has moderate safety with some recent incidents reported. Consider taking well-lit routes and staying alert, especially during evening hours."

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
        temperature: 0.7,
      })
      aiSummary = completion.choices[0]?.message?.content || aiSummary
    } catch (error) {
      console.error('OpenAI API error:', error)
      // Use fallback summary
    }

    // Calculate safety score
    const safetyScore = Math.max(0, Math.min(100, 
      100 - (mockCrimeData.crime_incidents * 8) - (mockCrimeData.offender_density * 5) - 
      (mockCrimeData.lighting_quality === 'Poor' ? 20 : mockCrimeData.lighting_quality === 'Fair' ? 10 : 0)
    ))

    const response = {
      safety_score: Math.round(safetyScore),
      crime_incidents: mockCrimeData.crime_incidents,
      offender_density: mockCrimeData.offender_density,
      lighting_quality: mockCrimeData.lighting_quality,
      ai_summary: aiSummary,
      last_updated: new Date().toISOString()
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error generating safety summary:', error)
    return NextResponse.json({ error: 'Failed to generate safety summary' }, { status: 500 })
  }
}
