import React from 'react';
import { PieChart, DollarSign, Hotel, Bus, Utensils, Compass, Music } from 'lucide-react';

export default function BudgetBreakdown({ budgetData }) {
  if (!budgetData) return null;

  const { totalBudget = 30000, estimatedCost = 28500, items = [] } = budgetData;
  const remaining = totalBudget - estimatedCost;
  const percentUsed = Math.min(100, Math.round((estimatedCost / totalBudget) * 100));

  const getItemIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'accommodation': return <Hotel className="w-4 h-4 text-indigo-600" />;
      case 'transport': return <Bus className="w-4 h-4 text-blue-600" />;
      case 'food': return <Utensils className="w-4 h-4 text-amber-600" />;
      case 'activities': return <Compass className="w-4 h-4 text-emerald-600" />;
      case 'nightlife': return <Music className="w-4 h-4 text-purple-600" />;
      default: return <DollarSign className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <PieChart className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-slate-900">Budget Summary</h3>
        </div>
        <span className="text-xs bg-slate-100 text-slate-600 font-medium px-2.5 py-1 rounded-full">
          Estimated Analysis
        </span>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
          <span className="text-xs text-slate-500 font-medium block">Estimated Cost</span>
          <span className="text-lg font-bold text-slate-900">₹{estimatedCost.toLocaleString('en-IN')}</span>
        </div>
        <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/50">
          <span className="text-xs text-indigo-600 font-medium block">Budget Used</span>
          <span className="text-lg font-bold text-indigo-700">{percentUsed}%</span>
        </div>
        <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/50">
          <span className="text-xs text-emerald-600 font-medium block">Remaining</span>
          <span className="text-lg font-bold text-emerald-700">₹{remaining.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Visual Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-slate-500">
          <span>₹0</span>
          <span>Budget: ₹{totalBudget.toLocaleString('en-IN')}</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              percentUsed > 90 ? 'bg-amber-500' : 'bg-indigo-600'
            }`}
            style={{ width: `${percentUsed}%` }}
          />
        </div>
      </div>

      {/* Detailed Categories Breakdown */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Category Expenses
        </h4>
        <div className="space-y-2">
          {items.map((item, index) => {
            const itemPercent = Math.round((item.amount / estimatedCost) * 100);
            return (
              <div key={index} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white shadow-2xs border border-slate-100">
                    {getItemIcon(item.category)}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-800 block leading-none">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-slate-400">{itemPercent}% of total</span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-slate-900">
                  ₹{item.amount.toLocaleString('en-IN')}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}