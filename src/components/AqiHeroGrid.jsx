import React, { useMemo } from 'react';
import { Info, AlertTriangle, Sun, Clock, Sliders } from 'lucide-react';
import { getAqiTheme, getHourlyBarColor } from '../utils/airQualityEngine';
import { POLLUTANT_INFO, FAMILY_TOGGLES } from '../constants/uiCopy';

function AqiHeroGrid({ city, copy, familyProfile, onToggleProfile, onCommuteChange }) {
  const theme = useMemo(() => getAqiTheme(city.aqi), [city.aqi]);

  const pollutantCards = useMemo(
    () => [
      { label: 'PM2.5', val: `${city.pm25} µg/m³`, sub: 'Fine Smog' },
      { label: 'PM10', val: `${city.pm10} µg/m³`, sub: 'Road Dust' },
      { label: 'NO2', val: `${city.no2} ppb`, sub: 'Traffic Gas' },
    ],
    [city.pm25, city.pm10, city.no2]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <section
        aria-label="Local Air Quality Overview"
        className={`lg:col-span-5 rounded-2xl bg-gradient-to-br ${theme.cardTint} bg-white border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between`}
      >
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold tracking-wider uppercase text-slate-600">
              {copy.localAqi}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-800 text-white">
              <Info aria-hidden="true" className="w-3 h-3 text-amber-300" />
              {copy.demoBadge}
            </span>
          </div>

          <div className="flex items-center gap-5 my-4" aria-live="polite">
            <div
              className={`w-28 h-28 rounded-2xl bg-white border-4 ${theme.ring} shadow-sm flex flex-col items-center justify-center shrink-0`}
            >
              <span className={`text-4xl font-extrabold tracking-tight ${theme.numberColor}`}>
                {city.aqi}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-0.5">
                US AQI
              </span>
            </div>

            <div className="space-y-1.5">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${theme.badgeBg}`}
              >
                {city.status}
              </span>
              <h2 className="text-base font-bold text-slate-900 leading-snug">{city.name}</h2>
              <p className="text-xs text-slate-700 leading-relaxed">{city.situationSummary}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5 mt-4">
            {pollutantCards.map((p) => (
              <div
                key={p.label}
                className="bg-white/95 rounded-xl p-2.5 border border-slate-200/90 text-center"
              >
                <div className="text-[11px] font-bold text-slate-600">{p.label}</div>
                <div className="text-sm font-extrabold text-slate-900 mt-0.5">{p.val}</div>
                <div className="text-[10px] text-slate-500">{p.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <div className="flex items-start gap-2 bg-rose-50/90 border border-rose-200/80 rounded-xl p-2.5">
            <AlertTriangle aria-hidden="true" className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-rose-950 block">High-Risk Peaks</span>
              <span className="text-rose-800">{city.peakHours}</span>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-emerald-50/90 border border-emerald-200/80 rounded-xl p-2.5">
            <Sun aria-hidden="true" className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-950 block">Safer Window</span>
              <span className="text-emerald-800">{city.safeWindow}</span>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="Hourly Pollution Forecast"
        className="lg:col-span-4 rounded-2xl bg-white border border-slate-200 shadow-sm p-6 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Clock aria-hidden="true" className="w-4 h-4 text-emerald-700" />
              Today’s Hourly Pollution Curve
            </h3>
            <span className="text-[11px] text-slate-500">
              {city.temp} • Wind {city.wind}
            </span>
          </div>
          <p className="text-xs text-slate-600 mb-4">
            Plan outdoor errands during the midday dip when sunlight disperses trapped smog.
          </p>

          <div
            role="img"
            aria-label={`Hourly AQI chart for ${city.name}: peaks in morning and evening, lowest around ${city.safeWindow}`}
            className="h-40 flex items-end justify-between gap-1.5 pt-4 pb-1 px-1 bg-slate-50 rounded-xl border border-slate-200/80"
          >
            {city.hourly.map((slot) => {
              const heightPct = Math.min(100, Math.max(18, Math.round((slot.aqi / 380) * 100)));
              return (
                <div key={slot.time} className="flex-1 flex flex-col items-center h-full justify-end">
                  <span className="text-[10px] font-bold text-slate-700 mb-1">{slot.aqi}</span>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className={`w-full max-w-[24px] rounded-t-md ${getHourlyBarColor(slot.aqi)} transition-all duration-300`}
                  />
                  <span className="text-[10px] font-medium text-slate-600 mt-1.5">{slot.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            What’s in the air?
          </div>
          {POLLUTANT_INFO.map((item) => (
            <div key={item.code} className="text-xs bg-slate-50 rounded-lg p-2 border border-slate-200/70">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>
                  {item.code} — {item.name}
                </span>
                <span className="text-[10px] font-medium text-slate-600">{item.size}</span>
              </div>
              <p className="text-[11px] text-slate-700 mt-0.5 leading-snug">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-label="Family and Home Profile"
        className="lg:col-span-3 rounded-2xl bg-white border border-slate-200 shadow-sm p-6 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sliders aria-hidden="true" className="w-4 h-4 text-emerald-700" />
            <h3 className="text-sm font-bold text-slate-900">{copy.familyProfile}</h3>
          </div>
          <p className="text-xs text-slate-600 mb-4">
            Tailors AI health alerts, commute savings, and purifier sizing.
          </p>

          <div className="space-y-2.5">
            {FAMILY_TOGGLES.map((toggle) => (
              <label
                key={toggle.key}
                className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition"
              >
                <span className="text-xs font-medium text-slate-800">{toggle.label}</span>
                <input
                  type="checkbox"
                  checked={familyProfile[toggle.key]}
                  onChange={(e) => onToggleProfile(toggle.key, e.target.checked)}
                  className="w-4 h-4 rounded accent-emerald-700 cursor-pointer"
                />
              </label>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
              <label htmlFor="commute-distance-slider">One-Way Daily Commute</label>
              <span className="text-emerald-800">{familyProfile.commuteKm} km</span>
            </div>
            <input
              id="commute-distance-slider"
              type="range"
              min="2"
              max="45"
              value={familyProfile.commuteKm}
              onChange={(e) => onCommuteChange(Number(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>2 km (Local)</span>
              <span>45 km (Cross-City)</span>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-950">
          <span className="font-bold block mb-0.5">Live Personalization Active</span>
          All recommendations below dynamically adapt to your household profile.
        </div>
      </section>
    </div>
  );
}

export default React.memo(AqiHeroGrid);
