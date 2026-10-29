import React from 'react';
import { MapPin, Calendar, Users, Wallet, Sparkles, Play } from 'lucide-react';
import InterestChips from './InterestChips';

export default function TripForm({ formData, setFormData, handleSubmit, handleDemo }) {
  const toggleInterest = (id) => {
    setFormData((prev) => {
      const current = prev.interests;
      const exists = current.includes(id);
      return {
        ...prev,
        interests: exists ? current.filter((item) => item !== id) : [...current, id],
      };
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-8 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Destination Input */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">Destination</label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              required
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              placeholder="Where do you want to go? (e.g. Goa, Manali, Jaipur)"
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-sm"
            />
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Days */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Number of Days</label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="number"
                min="1"
                max="30"
                required
                value={formData.days}
                onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-sm"
              />
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Budget (INR ₹)</label>
            <div className="relative">
              <Wallet className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="number"
                min="1000"
                step="500"
                required
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-sm"
              />
            </div>
          </div>

          {/* Travelers */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">Travelers</label>
            <div className="relative">
              <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="number"
                min="1"
                max="20"
                required
                value={formData.travelers}
                onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-sm"
              />
            </div>
          </div>
        </div>

        {/* Interest Chips */}
        <InterestChips
          selectedInterests={formData.interests}
          toggleInterest={toggleInterest}
        />

        {/* Form CTA Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="submit"
            className="w-full sm:flex-1 py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all flex items-center justify-center gap-2 group text-sm"
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>Plan My Trip</span>
          </button>

          <button
            type="button"
            onClick={handleDemo}
            className="w-full sm:w-auto py-3.5 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Play className="w-4 h-4 text-slate-500" />
            <span>Explore Demo</span>
          </button>
        </div>
      </form>
    </div>
  );
}