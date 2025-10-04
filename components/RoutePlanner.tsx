'use client'

import { useState } from 'react'
import { X, MapPin, Clock, Shield, Route } from 'lucide-react'

interface RoutePlannerProps {
  onClose: () => void
}

interface RouteData {
  fastest: {
    duration: number
    distance: number
    safety_score: number
  }
  safest: {
    duration: number
    distance: number
    safety_score: number
  }
}

export default function RoutePlanner({ onClose }: RoutePlannerProps) {
  const [startAddress, setStartAddress] = useState('')
  const [endAddress, setEndAddress] = useState('')
  const [routeData, setRouteData] = useState<RouteData | null>(null)
  const [loading, setLoading] = useState(false)

  const handlePlanRoute = async () => {
    if (!startAddress || !endAddress) return

    setLoading(true)
    try {
      const response = await fetch('/api/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          start: startAddress,
          end: endAddress,
        }),
      })
      const data = await response.json()
      setRouteData(data)
    } catch (error) {
      console.error('Error planning route:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const formatDistance = (meters: number) => {
    const km = meters / 1000
    return `${km.toFixed(1)} km`
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Route Planner</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Input Fields */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Starting Point
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={startAddress}
                onChange={(e) => setStartAddress(e.target.value)}
                placeholder="Enter starting address"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destination
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={endAddress}
                onChange={(e) => setEndAddress(e.target.value)}
                placeholder="Enter destination"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            onClick={handlePlanRoute}
            disabled={loading || !startAddress || !endAddress}
            className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Planning Route...' : 'Plan Route'}
          </button>
        </div>

        {/* Route Comparison */}
        {routeData && (
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Route Comparison</h3>
            
            {/* Fastest Route */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Route className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">Fastest Route</span>
                </div>
                <span className="text-sm text-gray-500">Red line on map</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600">Time</span>
                  </div>
                  <p className="font-medium">{formatDuration(routeData.fastest.duration)}</p>
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600">Distance</span>
                  </div>
                  <p className="font-medium">{formatDistance(routeData.fastest.distance)}</p>
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <Shield className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600">Safety</span>
                  </div>
                  <p className="font-medium">{routeData.fastest.safety_score}/100</p>
                </div>
              </div>
            </div>

            {/* Safest Route */}
            <div className="border border-safety-safe rounded-lg p-4 bg-green-50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-safety-safe" />
                  <span className="font-medium text-safety-safe">Safest Route</span>
                </div>
                <span className="text-sm text-gray-500">Green line on map</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600">Time</span>
                  </div>
                  <p className="font-medium">{formatDuration(routeData.safest.duration)}</p>
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600">Distance</span>
                  </div>
                  <p className="font-medium">{formatDistance(routeData.safest.distance)}</p>
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <Shield className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600">Safety</span>
                  </div>
                  <p className="font-medium text-safety-safe">{routeData.safest.safety_score}/100</p>
                </div>
              </div>
            </div>

            {/* Comparison Summary */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Route Analysis</h4>
              <p className="text-sm text-blue-800">
                The safest route takes {formatDuration(routeData.safest.duration - routeData.fastest.duration)} longer 
                but is {routeData.safest.safety_score - routeData.fastest.safety_score} points safer.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
