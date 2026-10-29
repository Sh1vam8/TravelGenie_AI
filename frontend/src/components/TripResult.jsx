import React from 'react';
import { MapPin, Calendar, Users, Wallet, Bookmark, Download, RotateCcw, Check } from 'lucide-react';
import BudgetBreakdown from './BudgetBreakdown';
import ItineraryTimeline from './ItineraryTimeline';

export default function TripResult({ trip, onSaveTrip, isSaved, onPlanAnother }) {
  if (!trip) return null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-100">
              AI Generated Itinerary
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Your {trip.destination} Adventure
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onSaveTrip(trip)}
              disabled={isSaved}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                isSaved
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200'
              }`}
            >
              {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              <span>{isSaved ? 'Saved to Dashboard' : 'Save Trip'}</span>
            </button>

            <button
              onClick={() => alert("Downloading Itinerary PDF...")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>

            <button
              onClick={onPlanAnother}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium text-sm transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Plan Another</span>
            </button>
          </div>
        </div>

        {/* Quick Parameters Summary Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-medium block">Destination</span>
              <span className="text-sm font-bold text-slate-800">{trip.destination}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-medium block">Duration</span>
              <span className="text-sm font-bold text-slate-800">{trip.days} Days</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-medium block">Travelers</span>
              <span className="text-sm font-bold text-slate-800">{trip.travelers} Persons</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-medium block">Budget</span>
              <span className="text-sm font-bold text-slate-800">₹{Number(trip.budget).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ItineraryTimeline days={trip.itinerary} />
        </div>
        <div className="lg:col-span-1">
          <BudgetBreakdown budgetData={trip.budgetData} />
        </div>
      </div>
    </div>
  );
}