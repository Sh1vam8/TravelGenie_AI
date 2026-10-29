import React from 'react';
import { Sun, Sunset, Moon, Coffee } from 'lucide-react';

export default function ItineraryTimeline({ days = [] }) {
  const getTimeIcon = (slot) => {
    switch (slot.toLowerCase()) {
      case 'morning': return <Coffee className="w-4 h-4 text-amber-500" />;
      case 'afternoon': return <Sun className="w-4 h-4 text-orange-500" />;
      case 'evening': return <Sunset className="w-4 h-4 text-indigo-500" />;
      case 'night': return <Moon className="w-4 h-4 text-purple-500" />;
      default: return <Sun className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
        <span>Day-by-Day Itinerary</span>
      </h3>

      <div className="space-y-6">
        {days.map((dayData, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
          >
            {/* Day Header */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 px-3 py-1 rounded-full">
                  Day {dayData.day || index + 1}
                </span>
                <h4 className="text-base font-bold text-white">
                  {dayData.title}
                </h4>
              </div>
            </div>

            {/* Time slots timeline */}
            <div className="p-6 space-y-4">
              {dayData.schedule.map((slot, sIdx) => (
                <div key={sIdx} className="flex items-start gap-4 text-sm group">
                  <div className="w-24 shrink-0 flex items-center gap-2 pt-0.5 font-medium text-slate-500">
                    {getTimeIcon(slot.time)}
                    <span className="capitalize">{slot.time}</span>
                  </div>
                  <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100 group-hover:border-indigo-100 group-hover:bg-indigo-50/30 transition-colors">
                    <p className="text-slate-800 font-medium">{slot.activity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}