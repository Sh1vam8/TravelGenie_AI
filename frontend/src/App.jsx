import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MyTrips from './pages/MyTrips';
import About from './pages/About';
import { planTripAPI } from './services/api';

// Initial Mock Saved Data for Demonstration
const MOCK_SAVED_TRIPS = [
  {
    id: 'trip-1',
    destination: 'Goa',
    days: 5,
    budget: 30000,
    travelers: 2,
    interests: ['beaches', 'nightlife'],
    budgetData: {
      totalBudget: 30000,
      estimatedCost: 28500,
      items: [
        { category: 'Accommodation', amount: 8000 },
        { category: 'Transport', amount: 3000 },
        { category: 'Food', amount: 9000 },
        { category: 'Activities', amount: 3500 },
        { category: 'Nightlife', amount: 5000 },
      ]
    },
    itinerary: [
      {
        day: 1,
        title: "Arrival & Sunset Vibes",
        schedule: [
          { time: "morning", activity: "Arrival in Goa & hotel check-in" },
          { time: "afternoon", activity: "Local lunch at Anjuna Beach" },
          { time: "evening", activity: "Vagator Sunset viewpoint" },
          { time: "night", activity: "Explore North Goa nightlife" }
        ]
      },
      {
        day: 2,
        title: "Water Sports & Heritage",
        schedule: [
          { time: "morning", activity: "Calangute beach water sports" },
          { time: "afternoon", activity: "Visit Fort Aguada" },
          { time: "evening", activity: "Mandovi River Cruise" },
          { time: "night", activity: "Dinner at Tito's Lane" }
        ]
      }
    ]
  },
  {
    id: 'trip-2',
    destination: 'Manali',
    days: 4,
    budget: 25000,
    travelers: 2,
    interests: ['adventure', 'nature'],
    budgetData: {
      totalBudget: 25000,
      estimatedCost: 23200,
      items: [
        { category: 'Accommodation', amount: 7000 },
        { category: 'Transport', amount: 5000 },
        { category: 'Food', amount: 6200 },
        { category: 'Activities', amount: 5000 }
      ]
    },
    itinerary: [
      {
        day: 1,
        title: "Mountain Arrival & Mall Road",
        schedule: [
          { time: "morning", activity: "Check in at resort" },
          { time: "afternoon", activity: "Stroll on Mall Road" },
          { time: "evening", activity: "Visit Hadimba Temple" },
          { time: "night", activity: "Cozy dinner in Old Manali" }
        ]
      }
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('plan'); // 'plan', 'mytrips', 'about'
  const [loadingStep, setLoadingStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [tripResult, setTripResult] = useState(null);
  const [savedTrips, setSavedTrips] = useState(MOCK_SAVED_TRIPS);

  // Form State
  const [formData, setFormData] = useState({
    destination: '',
    days: 5,
    budget: 30000,
    travelers: 2,
    interests: ['beaches', 'nightlife'],
  });

  // Executes step-by-step progress loading animation
  const runProgressAnimation = async () => {
    setIsLoading(true);
    setLoadingStep(0);
    for (let step = 0; step < 4; step++) {
      setLoadingStep(step);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }
  };

  // Helper mock generation if backend POST fails/is disconnected during demo
  const generateFallbackResult = (data) => ({
    id: `trip-${Date.now()}`,
    destination: data.destination || 'Goa',
    days: Number(data.days) || 5,
    budget: Number(data.budget) || 30000,
    travelers: Number(data.travelers) || 2,
    interests: data.interests || ['beaches', 'nightlife'],
    budgetData: {
      totalBudget: Number(data.budget) || 30000,
      estimatedCost: Math.round((Number(data.budget) || 30000) * 0.95),
      items: [
        { category: 'Accommodation', amount: Math.round((Number(data.budget) || 30000) * 0.3) },
        { category: 'Transport', amount: Math.round((Number(data.budget) || 30000) * 0.1) },
        { category: 'Food', amount: Math.round((Number(data.budget) || 30000) * 0.3) },
        { category: 'Activities', amount: Math.round((Number(data.budget) || 30000) * 0.15) },
        { category: 'Nightlife', amount: Math.round((Number(data.budget) || 30000) * 0.1) },
      ]
    },
    itinerary: Array.from({ length: Math.min(Number(data.days) || 3, 5) }).map((_, i) => ({
      day: i + 1,
      title: i === 0 ? "Arrival & Local Exploration" : i === 1 ? "Sightseeing & Highlights" : "Shopping & Departure",
      schedule: [
        { time: "morning", activity: i === 0 ? `Arrival in ${data.destination || 'Goa'} & check-in` : "Morning breakfast & sight tour" },
        { time: "afternoon", activity: "Local lunch and exploration" },
        { time: "evening", activity: "Sunset view & cultural walk" },
        { time: "night", activity: "Dinner & local nightlife" }
      ]
    }))
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.destination) return;

    await runProgressAnimation();

    try {
      // Call FastAPI backend: POST http://127.0.0.1:8000/plan-trip
      const apiResponse = await planTripAPI(formData);
      setTripResult(apiResponse);
    } catch (error) {
      // If API server is not running, seamlessly fallback to structured local state
      const fallback = generateFallbackResult(formData);
      setTripResult(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemo = async () => {
    const demoData = {
      destination: 'Goa',
      days: 5,
      budget: 30000,
      travelers: 2,
      interests: ['beaches', 'nightlife', 'food']
    };
    setFormData(demoData);
    await runProgressAnimation();
    setTripResult(generateFallbackResult(demoData));
    setIsLoading(false);
  };

  const handleSaveTrip = (trip) => {
    if (!savedTrips.some((t) => t.id === trip.id)) {
      setSavedTrips([trip, ...savedTrips]);
    }
  };

  const handleDeleteTrip = (tripId) => {
    setSavedTrips(savedTrips.filter((t) => t.id !== tripId));
  };

  const isCurrentTripSaved = tripResult && savedTrips.some((t) => t.id === tripResult.id);

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans antialiased flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1">
        {activeTab === 'plan' && (
          <Home
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            handleDemo={handleDemo}
            isLoading={isLoading}
            loadingStep={loadingStep}
            tripResult={tripResult}
            onSaveTrip={handleSaveTrip}
            isSaved={isCurrentTripSaved}
            onPlanAnother={() => setTripResult(null)}
          />
        )}

        {activeTab === 'mytrips' && (
          <MyTrips
            savedTrips={savedTrips}
            onViewTrip={(trip) => {
              setTripResult(trip);
              setActiveTab('plan');
            }}
            onDeleteTrip={handleDeleteTrip}
            onNavigateToPlan={() => {
              setTripResult(null);
              setActiveTab('plan');
            }}
          />
        )}

        {activeTab === 'about' && <About />}
      </main>
    </div>
  );
}