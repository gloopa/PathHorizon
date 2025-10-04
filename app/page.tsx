'use client'

import { useState } from 'react'
import MapComponent from '@/components/MapComponent'
import SafetySummary from '@/components/SafetySummary'
import RoutePlanner from '@/components/RoutePlanner'
import ReportModal from '@/components/ReportModal'
import Header from '@/components/Header'

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null)
  const [showRoutePlanner, setShowRoutePlanner] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
        <div className="flex h-screen">
        {/* Map Section */}
        <div className="flex-1 relative">
          <MapComponent 
            onLocationSelect={setSelectedLocation}
            showRoutePlanner={showRoutePlanner}
            onToggleRoutePlanner={() => setShowRoutePlanner(!showRoutePlanner)}
          />
        </div>

        {/* Sidebar */}
        <div className="w-96 bg-white shadow-lg flex flex-col">
          {selectedLocation && (
            <SafetySummary 
              location={selectedLocation}
              onClose={() => setSelectedLocation(null)}
              onReport={() => setShowReportModal(true)}
            />
          )}
          
          {showRoutePlanner && (
            <RoutePlanner 
              onClose={() => setShowRoutePlanner(false)}
            />
          )}
          
          {!selectedLocation && !showRoutePlanner && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Welcome to SaferSteps</h2>
              <p className="text-gray-600 mb-4">
                Click anywhere on the map to see safety information for that area.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => setShowRoutePlanner(true)}
                  className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Plan Safer Route
                </button>
                <button
                  onClick={() => setShowReportModal(true)}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Report Safety Issue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && selectedLocation && (
        <ReportModal
          location={selectedLocation}
          onClose={() => setShowReportModal(false)}
          onSuccess={() => {
            setShowReportModal(false)
            // Optionally refresh data or show success message
          }}
        />
      )}
    </main>
  )
}
