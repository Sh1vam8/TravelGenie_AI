import React from 'react';
import { Compass, Bookmark, Info } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div
          onClick={() => setActiveTab('plan')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
            ✈
          </div>

          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              TravelGenie <span className="text-indigo-600">AI</span>
            </span>

            <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full uppercase border border-indigo-100">
              MCA Project
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">

          {/* Plan Trip */}
          <button
            onClick={() => setActiveTab('plan')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'plan' || activeTab === 'result'
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span className="hidden sm:inline">Plan Trip</span>
          </button>

          {/* My Trips */}
          <button
            onClick={() => setActiveTab('mytrips')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'mytrips'
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>My Trips</span>
          </button>

          {/* About */}
          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'about'
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>About</span>
          </button>

        </nav>
      </div>
    </header>
  );
}