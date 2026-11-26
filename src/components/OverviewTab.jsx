import React, { useMemo } from 'react';
import { HeartPulse, Train, Wind, ShieldAlert, MessageSquare, Info } from 'lucide-react';
import { buildThreePillarRecommendations } from '../utils/airQualityEngine';

const REC_ICONS = {
  heart: HeartPulse,
  train: Train,
  wind: Wind,
  shield: ShieldAlert,
};

const LANG_LABELS = {
  te: 'తెలుగు',
  hi: 'हिंदी',
  en: 'English',
};

export default function OverviewTab({ city, familyProfile, copy, lang, onOpenChat }) {
  const recommendations = useMemo(
    () =>
      buildThreePillarRecommendations(city, {
        commuteKm: familyProfile.commuteKm,
        hasKids: familyProfile.hasKids,
        hasSeniors: familyProfile.hasSeniors,
        hasPurifier: familyProfile.hasPurifier,
        roomSizeSqFt: familyProfile.roomSizeSqFt,
      }),
    [
      city,
      familyProfile.commuteKm,
      familyProfile.hasKids,
      familyProfile.hasSeniors,
      familyProfile.hasPurifier,
      familyProfile.roomSizeSqFt,
    ]
  );

  return (
    <div id="panel-overview" role="tabpanel" aria-labelledby="tab-overview" className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Today’s Personalized 3-Pillar Guidance</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Connecting your local air situation → tailored family action → measurable exposure or emission benefit.
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenChat}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-sm self-start"
        >
          <MessageSquare aria-hidden="true" className="w-3.5 h-3.5" />
          Ask Follow-Up in {LANG_LABELS[lang] || 'English'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {recommendations.map((rec, idx) => {
          const RecIcon = REC_ICONS[rec.iconKey] || Wind;
          return (
            <article
              key={rec.id}
              className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 flex flex-col justify-between hover:border-emerald-400 transition"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    aria-hidden="true"
                    className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold"
                  >
                    <RecIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                      Recommendation #{idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">{rec.title}</h3>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs leading-relaxed">
                  <div className="bg-white p-3 rounded-xl border border-slate-200/90">
                    <span className="font-bold text-slate-900 block mb-0.5">{copy.situationLabel}</span>
                    <p className="text-slate-700">{rec.situation}</p>
                  </div>

                  <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-200">
                    <span className="font-bold text-emerald-950 block mb-0.5">{copy.actionLabel}</span>
                    <p className="text-emerald-950">{rec.action}</p>
                  </div>

                  <div className="bg-sky-50/80 p-3 rounded-xl border border-sky-200">
                    <span className="font-bold text-sky-950 block mb-0.5">{copy.impactLabel}</span>
                    <p className="text-sky-950">{rec.impact}</p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="rounded-xl bg-slate-100 border border-slate-200 p-3.5 flex items-start gap-2.5 text-xs text-slate-700">
        <Info aria-hidden="true" className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
        <p>{copy.impactDisclaimer}</p>
      </div>
    </div>
  );
}
