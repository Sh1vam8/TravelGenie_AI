import React from 'react';
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';

export default function LoadingState({ loadingStep }) {
  const steps = [
    "Understanding your preferences",
    "Planning activities",
    "Optimizing your budget",
    "Creating your itinerary"
  ];

  return (
    <div className="py-16 px-4 flex flex-col items-center justify-center min-h-[400px]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center space-y-6">
        <div className="relative inline-block">
          <div className="w-16 h-16 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mx-auto">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
            <Loader2 className="w-3 h-3 text-white animate-spin" />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900">
            TravelGenie is planning your trip...
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Analyzing destination data and building your perfect itinerary
          </p>
        </div>

        {/* Progress List */}
        <div className="space-y-3 text-left pt-2 border-t border-slate-100">
          {steps.map((step, idx) => {
            const isDone = idx < loadingStep;
            const isCurrent = idx === loadingStep;

            return (
              <div key={idx} className="flex items-center gap-3 text-sm">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-indigo-600 animate-spin shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-200 shrink-0" />
                )}
                <span
                  className={`font-medium ${
                    isDone
                      ? 'text-slate-800 line-through/30'
                      : isCurrent
                      ? 'text-indigo-600 font-semibold'
                      : 'text-slate-400'
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}