import React from 'react';
import { Sparkles } from 'lucide-react';
import TripForm from '../components/TripForm';
import LoadingState from '../components/LoadingState';
import TripResult from '../components/TripResult';

export default function Home({
  formData,
  setFormData,
  handleSubmit,
  handleDemo,
  isLoading,
  loadingStep,
  tripResult,
  onSaveTrip,
  isSaved,
  onPlanAnother
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* If loading, show progress indicator */}
      {isLoading ? (
        <LoadingState loadingStep={loadingStep} />
      ) : tripResult ? (
        /* If trip generated, show results */
        <TripResult
          trip={tripResult}
          onSaveTrip={onSaveTrip}
          isSaved={isSaved}
          onPlanAnother={onPlanAnother}
        />
      ) : (
        /* Default: Hero Section + Main Form */
        <div className="space-y-10 max-w-3xl mx-auto">
          {/* Hero Heading */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Powered by AI</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Plan Your Journey. <br />
              <span className="text-indigo-600">Let AI Handle the Rest.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto font-normal">
              Create personalized travel itineraries based on your destination, budget, duration and interests.
            </p>
          </div>

          {/* Form Component */}
          <TripForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            handleDemo={handleDemo}
          />
        </div>
      )}
    </div>
  );
}