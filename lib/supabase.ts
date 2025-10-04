import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface SafetyTile {
  id: string
  lat: number
  lon: number
  crime_density: number
  offender_density: number
  safety_score: number
  created_at: string
  updated_at: string
}

export interface SafetyReport {
  id: string
  lat: number
  lon: number
  category: string
  comment: string
  timestamp: string
  created_at: string
}
