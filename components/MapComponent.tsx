'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MapPin, Route } from 'lucide-react'

interface MapComponentProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void
  showRoutePlanner: boolean
  onToggleRoutePlanner: () => void
}

export default function MapComponent({ onLocationSelect, showRoutePlanner, onToggleRoutePlanner }: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (map.current) return // initialize map only once

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.006, 40.7128], // NYC coordinates
      zoom: 12
    })

    map.current.on('load', () => {
      setMapLoaded(true)
      addSafetyHeatmap()
    })

    map.current.on('click', async (e) => {
      const { lng, lat } = e.lngLat
      
      // Reverse geocoding to get address
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      )
      const data = await response.json()
      const address = data.features[0]?.place_name || 'Unknown location'
      
      onLocationSelect({ lat, lng, address })
    })

    // Add navigation control
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')
  }, [])

  const addSafetyHeatmap = async () => {
    if (!map.current) return

    // Fetch safety data from our API
    try {
      const response = await fetch('/api/safety-data')
      const safetyData = await response.json()
      
      if (map.current.getSource('safety-heatmap')) {
        (map.current.getSource('safety-heatmap') as mapboxgl.GeoJSONSource).setData(safetyData)
      } else {
        map.current.addSource('safety-heatmap', {
          type: 'geojson',
          data: safetyData
        })

        map.current.addLayer({
          id: 'safety-heatmap',
          type: 'fill',
          source: 'safety-heatmap',
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'safety_score'],
              0, '#ef4444',    // Red for risky
              50, '#f59e0b',   // Yellow for moderate
              100, '#10b981'   // Green for safe
            ],
            'fill-opacity': 0.6
          }
        })
      }
    } catch (error) {
      console.error('Error loading safety data:', error)
    }
  }

  return (
    <div className="relative h-full">
      <div ref={mapContainer} className="h-full w-full" />
      
      {/* Map Controls */}
      <div className="absolute top-4 left-4 flex flex-col space-y-2">
        <button
          onClick={onToggleRoutePlanner}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg shadow-md transition-colors ${
            showRoutePlanner 
              ? 'bg-primary-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Route className="h-4 w-4" />
          <span>Route Planner</span>
        </button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-4">
        <h3 className="text-sm font-semibold mb-2">Safety Score</h3>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-safety-safe rounded"></div>
            <span className="text-xs">Safe (80-100)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-safety-moderate rounded"></div>
            <span className="text-xs">Moderate (50-79)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-safety-risky rounded"></div>
            <span className="text-xs">Risky (0-49)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
