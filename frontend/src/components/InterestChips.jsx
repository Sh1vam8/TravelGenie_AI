import React from 'react';

export const AVAILABLE_INTERESTS = [
  { id: 'beaches', label: '🏖 Beaches' },
  { id: 'nightlife', label: '🌙 Nightlife' },
  { id: 'adventure', label: '🏔 Adventure' },
  { id: 'food', label: '🍜 Food' },
  { id: 'culture', label: '🏛 Culture' },
  { id: 'nature', label: '🌿 Nature' },
  { id: 'shopping', label: '🛍 Shopping' },
  { id: 'photography', label: '📸 Photography' },
];

export default function InterestChips({ selectedInterests, toggleInterest }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        Travel Interests
      </label>
      <div className="flex flex-wrap gap-2">
        {AVAILABLE_INTERESTS.map((chip) => {
          const isSelected = selectedInterests.includes(chip.id);
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => toggleInterest(chip.id)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all border ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-200'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}