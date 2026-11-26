import React, { useState, useMemo } from 'react';
import { Check, Award } from 'lucide-react';
import { calculateSustainabilityImpact } from '../utils/airQualityEngine';

export default function ImpactTab({ commuteKm, cityName, impactDisclaimer }) {
  const [completedHabits, setCompletedHabits] = useState({
    publicTransit: true,
    indoorWorkout: true,
    peakWindowClose: true,
    wetMopping: false,
    noIncenseSmoke: false,
  });

  const impactStats = useMemo(
    () => calculateSustainabilityImpact(completedHabits, commuteKm),
    [completedHabits, commuteKm]
  );

  const habitItems = useMemo(
    () => [
      {
        key: 'publicTransit',
        title: `Used Metro / Bus / Carpool for ${commuteKm * 2} km commute`,
        tag: `Est. ${(commuteKm * 2 * 0.143).toFixed(2)} kg CO2 avoided`,
      },
      {
        key: 'indoorWorkout',
        title: 'Chose indoor exercise / play during high-pollution morning hours',
        tag: 'High PM2.5 inhalation avoided',
      },
      {
        key: 'peakWindowClose',
        title: 'Closed road-facing windows during morning/evening rush peaks',
        tag: 'Cleaner indoor baseline',
      },
      {
        key: 'wetMopping',
        title: 'Wet-mopped indoor floors instead of dry sweeping',
        tag: 'Zero dust resuspension',
      },
      {
        key: 'noIncenseSmoke',
        title: 'Avoided indoor smoke (incense, coils, waste burning)',
        tag: 'Zero indoor combustion spikes',
      },
    ],
    [commuteKm]
  );

  return (
    <div id="panel-impact" role="tabpanel" aria-labelledby="tab-impact" className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-3.5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Daily Clean-Air & Sustainability Action Log</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Check off the actions your family took today to calculate personal exposure protection and estimated carbon savings.
            </p>
          </div>

          <div className="space-y-2.5">
            {habitItems.map((habit) => {
              const checked = completedHabits[habit.key];
              return (
                <button
                  key={habit.key}
                  type="button"
                  aria-pressed={checked}
                  onClick={() =>
                    setCompletedHabits((prev) => ({ ...prev, [habit.key]: !prev[habit.key] }))
                  }
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                    checked ? 'bg-emerald-50/80 border-emerald-400' : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      aria-hidden="true"
                      className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        checked ? 'bg-emerald-700 border-emerald-700 text-white' : 'border-slate-400 bg-white'
                      }`}
                    >
                      {checked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">{habit.title}</div>
                      <div className="text-[11px] text-emerald-800 font-medium">{habit.tag}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div
            aria-live="polite"
            className="rounded-2xl bg-gradient-to-br from-emerald-700 to-teal-800 text-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">
                Household Impact Summary
              </span>
              <Award aria-hidden="true" className="w-6 h-6 text-amber-300" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-3.5">
                <div className="text-xs text-emerald-100">Est. CO2 Avoided Today</div>
                <div className="text-2xl font-extrabold mt-1">{impactStats.dailyCo2} kg</div>
                <div className="text-[11px] text-emerald-100 mt-0.5">
                  ~{impactStats.monthlyProjectedCo2} kg / month pace
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-3.5">
                <div className="text-xs text-emerald-100">Personal Exposure Shield</div>
                <div className="text-2xl font-extrabold mt-1">{impactStats.exposureReductionPct}%</div>
                <div className="text-[11px] text-emerald-100 mt-0.5">
                  {impactStats.activeCount} of 5 habits active
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/15 text-xs text-emerald-50 leading-relaxed">
              <strong>Community Multiplier:</strong> If 5,000 families in {cityName.split(' ')[0]} adopt low-emission commutes today, that avoids an estimated{' '}
              <strong>{Math.round(Number(impactStats.dailyCo2) * 5000).toLocaleString()} kg of CO2</strong> and lowers neighborhood roadside exhaust.
            </div>
          </div>

          <div className="rounded-xl bg-amber-50 border border-amber-200 p-3.5 text-xs text-amber-950 leading-relaxed">
            <strong>Scientific Transparency Note:</strong> {impactDisclaimer}
          </div>
        </div>
      </div>
    </div>
  );
}
