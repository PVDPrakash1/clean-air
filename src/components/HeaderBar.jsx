import React from 'react';
import { Wind, MapPin, Globe } from 'lucide-react';
import { CITY_LIST } from '../utils/airQualityEngine';
import { LANGUAGE_OPTIONS } from '../constants/uiCopy';

function HeaderBar({ cityKey, onCityChange, lang, onLangChange, tagline }) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-600/20"
          >
            <Wind className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                ClearAir <span className="text-emerald-700">AI</span>
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                Smart Pollution Companion
              </span>
            </div>
            <p className="text-xs text-slate-600">{tagline}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative flex items-center bg-slate-100 hover:bg-slate-200/70 transition rounded-lg px-2.5 py-1.5 border border-slate-300">
            <MapPin aria-hidden="true" className="w-4 h-4 text-emerald-700 mr-1.5 shrink-0" />
            <label htmlFor="locality-select" className="sr-only">
              Select City Locality
            </label>
            <select
              id="locality-select"
              value={cityKey}
              onChange={(e) => onCityChange(e.target.value)}
              className="bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 rounded cursor-pointer pr-1"
            >
              {CITY_LIST.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div
            role="group"
            aria-label="Language Selector"
            className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-300"
          >
            <Globe aria-hidden="true" className="w-3.5 h-3.5 text-slate-600 ml-1.5 mr-1" />
            {LANGUAGE_OPTIONS.map((item) => (
              <button
                key={item.code}
                type="button"
                aria-label={item.fullName}
                aria-pressed={lang === item.code}
                onClick={() => onLangChange(item.code)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                  lang === item.code
                    ? 'bg-white text-emerald-800 shadow-sm'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default React.memo(HeaderBar);
