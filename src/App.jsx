import { useState } from 'react'
import ItineraryBoard from './components/ItineraryBoard'
import { mockItinerary } from './data/mockData'

function App() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)' }}>
      <header className="bg-white shadow-sm">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-primary">Travel</span><span className="text-secondary">Planner</span>
          </h1>
          <div className="flex gap-4">
            <button className="btn btn-primary">
              Save Itinerary
            </button>
            <button className="btn btn-outline">
              New Itinerary
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-6">
        <ItineraryBoard initialItinerary={mockItinerary} />
      </main>
      
      <footer className="bg-white shadow-sm mt-8 py-4">
        <div className="container mx-auto text-center text-muted">
          <p>Created for the Vibe Coding Hackathon 2025</p>
        </div>
      </footer>
    </div>
  )
}

export default App
