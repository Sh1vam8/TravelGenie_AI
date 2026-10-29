import React from 'react';
import { Code, Server, Layout, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
          MCA Mini Project
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          TravelGenie AI System Architecture
        </h1>
        <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
          An AI-powered automated travel itinerary generator built with modern web technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Frontend Architecture Card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
              <Layout className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Frontend Layer</h3>
              <p className="text-xs text-slate-500">User Interface & Presentation</p>
            </div>
          </div>
          <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
            <li>Built with <strong>React + Vite</strong></li>
            <li>Tailwind CSS for responsive UI design</li>
            <li><strong>Axios</strong> for Async REST API Communication</li>
            <li>Lucide React icons for clean visual indicators</li>
          </ul>
        </div>

        {/* Backend Architecture Card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Backend API Endpoint</h3>
              <p className="text-xs text-slate-500">FastAPI Architecture</p>
            </div>
          </div>
          <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
            <li><strong>Endpoint:</strong> <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600">POST http://127.0.0.1:8000/plan-trip</code></li>
            <li>JSON payload: destination, days, budget, travelers, interests</li>
            <li>Fast Python execution & JSON serialization</li>
          </ul>
        </div>
      </div>
    </div>
  );
}