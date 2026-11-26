import React, { useMemo } from 'react';
import { calculateRecommendedCadr } from '../utils/airQualityEngine';

const INDOOR_TIPS = [
  {
    badge: 'Zero-Cost Habit',
    badgeClass: 'bg-emerald-100 text-emerald-900',
    title: 'Wet Mop Instead of Brooming',
    detail:
      'Dry sweeping kicks settled PM10 dust back into breathing height. Damp mopping captures fine dust cleanly.',
  },
  {
    badge: 'Kitchen & Combustion',
    badgeClass: 'bg-sky-100 text-sky-900',
    title: 'Ventilate Cooking & Cut Smoke',
    detail:
      'Run the kitchen chimney/exhaust fan while tempering (tadka) or frying, and pause agarbatti/dhoop sticks on high-AQI days.',
  },
  {
    badge: 'Smart Sealing',
    badgeClass: 'bg-amber-100 text-amber-900',
    title: 'Door Draft Stoppers',
    detail:
      'Place a rolled towel or rubber draft seal under main entrance doors facing corridors or dusty streets.',
  },
  {
    badge: 'Natural Aid',
    badgeClass: 'bg-teal-100 text-teal-900',
    title: 'Wipe Leaf Surfaces',
    detail:
      'Indoor plants like Areca Palm or Snake Plant collect dust on broad leaves—wipe leaves weekly with a damp cloth.',
  },
];

export default function IndoorTab({ roomSizeSqFt, onRoomSizeChange }) {
  const recommendedCadr = useMemo(() => calculateRecommendedCadr(roomSizeSqFt), [roomSizeSqFt]);

  return (
    <div id="panel-indoor" role="tabpanel" aria-labelledby="tab-indoor" className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Practical, Affordable Indoor Air Protection</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Actionable steps to cut indoor smoke, dust, and outdoor smog infiltration—with or without an air purifier.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
            {INDOOR_TIPS.map((tip) => (
              <div key={tip.title} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-1.5">
                <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${tip.badgeClass}`}>
                  {tip.badge}
                </span>
                <h3 className="font-bold text-sm text-slate-900 pt-1">{tip.title}</h3>
                <p className="text-slate-700 leading-relaxed">{tip.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 flex flex-col justify-between">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2">
              HEPA Sizing Calculator
            </span>
            <h3 className="text-lg font-bold">Right-Size Your Air Purifier</h3>
            <p className="text-xs text-slate-300 mt-1">
              Avoid overspending on oversized units or buying underpowered filters. Slide to match your bedroom or living room size:
            </p>

            <div className="mt-5">
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <label htmlFor="room-size-slider">Room Area</label>
                <span className="text-emerald-300">{roomSizeSqFt} sq. ft.</span>
              </div>
              <input
                id="room-size-slider"
                type="range"
                min="100"
                max="600"
                step="25"
                value={roomSizeSqFt}
                onChange={(e) => onRoomSizeChange(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-300">
                <span>100 sq ft (Small Bedroom)</span>
                <span>600 sq ft (Large Hall)</span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="bg-white/10 rounded-xl p-3 border border-white/15">
                <div className="text-[11px] text-slate-200">Minimum CADR Needed</div>
                <div className="text-xl font-extrabold text-emerald-300 mt-0.5">{recommendedCadr} m³/h</div>
                <div className="text-[10px] text-slate-300">For 4–5 air changes/hr</div>
              </div>

              <div className="bg-white/10 rounded-xl p-3 border border-white/15">
                <div className="text-[11px] text-slate-200">Recommended Filter</div>
                <div className="text-base font-extrabold text-white mt-1">True HEPA H13</div>
                <div className="text-[10px] text-slate-300">+ Activated Carbon</div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-200 mt-5 pt-3 border-t border-white/15">
            Tip: Keep doors/windows shut while running the purifier so it cleans room air rapidly instead of fighting outdoor air.
          </p>
        </div>
      </div>
    </div>
  );
}
