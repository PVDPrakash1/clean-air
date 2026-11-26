import React, { useState, useMemo } from 'react';
import { Train, Users, Home, Car, Building2 } from 'lucide-react';
import { calculateCommuteMetrics } from '../utils/airQualityEngine';

const COMMUTE_ICONS = {
  metro: Train,
  carpool: Users,
  wfh: Home,
  solo_car: Car,
};

export default function RoutineTab({ commuteKm, safeWindow }) {
  const [selectedCommute, setSelectedCommute] = useState('metro');
  const commuteOptions = useMemo(() => calculateCommuteMetrics(commuteKm), [commuteKm]);

  return (
    <div id="panel-routine" role="tabpanel" aria-labelledby="tab-routine" className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Low-Emission Commute & Exposure Comparator</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Based on your <strong>{commuteKm * 2} km round trip</strong> ({commuteKm} km each way). Compare estimated tailpipe CO2 reductions vs. solo car driving.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {commuteOptions.map((opt) => {
              const OptIcon = COMMUTE_ICONS[opt.id] || Train;
              const isSelected = selectedCommute === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCommute(opt.id)}
                  className={`text-left p-4 rounded-2xl border-2 transition focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                    isSelected
                      ? 'border-emerald-700 bg-emerald-50/40 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      aria-hidden="true"
                      className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800"
                    >
                      <OptIcon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-800">
                      {opt.badge}
                    </span>
                  </div>

                  <div className="font-bold text-sm text-slate-900">{opt.name}</div>
                  <div className="mt-2 space-y-1 text-xs">
                    <div className="flex justify-between text-slate-700">
                      <span>Est. Trip Emissions:</span>
                      <span className="font-bold text-slate-900">{opt.co2Kg} kg CO2</span>
                    </div>
                    <div className="flex justify-between text-emerald-800">
                      <span>Est. CO2 Avoided:</span>
                      <span className="font-bold">+{opt.savedVsCar} kg</span>
                    </div>
                    <div className="pt-1 border-t border-slate-100 text-[11px] text-slate-600">
                      Exposure: <strong className="text-slate-800">{opt.exposureRisk}</strong>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Building2 aria-hidden="true" className="w-4 h-4 text-emerald-700" />
            Smart School & Office Schedule
          </h3>

          <div className="space-y-3 text-xs">
            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="font-bold text-rose-800 block">07:30 – 09:30 AM • School & Office Departure</span>
              <p className="text-slate-700 mt-1">
                Keep car AC on <strong>recirculate mode</strong> in traffic; kids waiting at open bus stops benefit from a well-fitted N95/KN95 mask when AQI &gt; 150.
              </p>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="font-bold text-emerald-800 block">{safeWindow} • Midday Errands & Walk</span>
              <p className="text-slate-700 mt-1">
                Lowest particulate density of the day. Ideal window for senior citizens’ walk, grocery runs, and airing out bedrooms.
              </p>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200">
              <span className="font-bold text-amber-800 block">05:30 – 08:30 PM • Evening Return & Activities</span>
              <p className="text-slate-700 mt-1">
                Choose indoor sports/tuition centers over roadside playgrounds as evening cooling traps exhaust particles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
