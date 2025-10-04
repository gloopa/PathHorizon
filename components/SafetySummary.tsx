'use client'

import { useState, useEffect } from 'react'
import { X, Shield, AlertTriangle, Clock, MapPin, Flag } from 'lucide-react'

interface SafetySummaryProps {
  location: {
    lat: number
    lng: number
    address: string
  }
  onClose: () => void
  onReport: () => void
}

interface SafetyData {
  safety_score: number
  crime_incidents: number
  offender_density: number
  lighting_quality: string
  ai_summary: string
  last_updated: string
}

export default function SafetySummary({ location, onClose, onReport }: SafetySummaryProps) {
  const [safetyData, setSafetyData] = useState<SafetyData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSafetyData()
  }, [location])

  const fetchSafetyData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/safety-summary?lat=${location.lat}&lng=${location.lng}`)
      const data = await response.json()
      setSafetyData(data)
    } catch (error) {
      console.error('Error fetching safety data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getSafetyColor = (score: number) => {
    if (score >= 80) return 'text-safety-safe'
    if (score >= 50) return 'text-safety-moderate'
    return 'text-safety-risky'
  }

  const getSafetyLabel = (score: number) => {
    if (score >= 80) return 'Safe'
    if (score >= 50) return 'Moderate'
    return 'Risky'
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Safety Analysis</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 border-b">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Safety Analysis</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Location */}
        <div className="flex items-start space-x-2">
          <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-600">{location.address}</p>
          </div>
        </div>

        {/* Safety Score */}
        {safetyData && (
          <>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-gray-600" />
                  <span className="font-medium">Safety Score</span>
                </div>
                <span className={`text-2xl font-bold ${getSafetyColor(safetyData.safety_score)}`}>
                  {safetyData.safety_score}/100
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${getSafetyColor(safetyData.safety_score)}`}>
                  {getSafetyLabel(safetyData.safety_score)}
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      safetyData.safety_score >= 80 ? 'bg-safety-safe' :
                      safetyData.safety_score >= 50 ? 'bg-safety-moderate' : 'bg-safety-risky'
                    }`}
                    style={{ width: `${safetyData.safety_score}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* AI Summary */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">AI Safety Summary</h3>
              <p className="text-sm text-blue-800">{safetyData.ai_summary}</p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium">Crime Incidents</span>
                </div>
                <p className="text-lg font-bold text-red-600">{safetyData.crime_incidents}</p>
                <p className="text-xs text-gray-500">Last 30 days</p>
              </div>
              
              <div className="bg-white border rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">Lighting</span>
                </div>
                <p className="text-sm font-bold text-orange-600">{safetyData.lighting_quality}</p>
                <p className="text-xs text-gray-500">Quality rating</p>
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-xs text-gray-500 text-center">
              Last updated: {new Date(safetyData.last_updated).toLocaleString()}
            </div>

            {/* Report Button */}
            <button
              onClick={onReport}
              className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Flag className="h-4 w-4" />
              <span>Report Safety Issue</span>
            </button>
          </>
        )}
      </div>
    </div>
  )
}
