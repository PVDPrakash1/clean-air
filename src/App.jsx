import React, { useState, useMemo, useCallback, lazy, Suspense } from 'react';
import { Sparkles, Train, Home, Leaf, MessageSquare } from 'lucide-react';
import { CITIES_DATA } from './utils/airQualityEngine';
import { UI_COPY } from './constants/uiCopy';
import HeaderBar from './components/HeaderBar';
import AqiHeroGrid from './components/AqiHeroGrid';
import OverviewTab from './components/OverviewTab';

const RoutineTab = lazy(() => import('./components/RoutineTab'));
const IndoorTab = lazy(() => import('./components/IndoorTab'));
const ImpactTab = lazy(() => import('./components/ImpactTab'));
const AssistantTab = lazy(() => import('./components/AssistantTab'));

export default function App() {
  const [cityKey, setCityKey] = useState('hyderabad_west');
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('overview');

  const [familyProfile, setFamilyProfile] = useState({
    hasKids: true,
    hasSeniors: true,
    hasAsthma: false,
    commuteKm: 18,
    roomSizeSqFt: 250,
    hasPurifier: true,
  });

  const city = CITIES_DATA[cityKey] || CITIES_DATA.hyderabad_west;
  const copy = UI_COPY[lang] || UI_COPY.en;

  const handleToggleProfile = useCallback((key, value) => {
    setFamilyProfile((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleCommuteChange = useCallback((commuteKm) => {
    setFamilyProfile((prev) => ({ ...prev, commuteKm }));
  }, []);

  const handleRoomSizeChange = useCallback((roomSizeSqFt) => {
    setFamilyProfile((prev) => ({ ...prev, roomSizeSqFt }));
  }, []);

  const openChatTab = useCallback(() => setActiveTab('assistant'), []);

  const tabItems = useMemo(
    () => [
      { id: 'overview', label: copy.tabs.overview, icon: Sparkles },
      { id: 'routine', label: copy.tabs.routine, icon: Train },
      { id: 'indoor', label: copy.tabs.indoor, icon: Home },
      { id: 'impact', label: copy.tabs.impact, icon: Leaf },
      { id: 'assistant', label: copy.tabs.assistant, icon: MessageSquare },
    ],
    [copy.tabs]
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-700 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      <HeaderBar
        cityKey={cityKey}
        onCityChange={setCityKey}
        lang={lang}
        onLangChange={setLang}
        tagline={copy.tagline}
      />

      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <AqiHeroGrid
          city={city}
          copy={copy}
          familyProfile={familyProfile}
          onToggleProfile={handleToggleProfile}
          onCommuteChange={handleCommuteChange}
        />

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div
            role="tablist"
            aria-label="ClearAir Modules"
            className="flex overflow-x-auto border-b border-slate-200 bg-slate-50/80 px-2 pt-2 gap-1"
          >
            {tabItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold rounded-t-xl border-b-2 transition whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                    isActive
                      ? 'bg-white text-emerald-800 border-emerald-700 shadow-sm'
                      : 'text-slate-700 border-transparent hover:text-slate-950 hover:bg-white/60'
                  }`}
                >
                  <Icon aria-hidden="true" className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <OverviewTab
                city={city}
                familyProfile={familyProfile}
                copy={copy}
                lang={lang}
                onOpenChat={openChatTab}
              />
            )}

            <Suspense
              fallback={
                <div className="py-10 text-center text-xs font-medium text-slate-500">
                  Loading module...
                </div>
              }
            >
              {activeTab === 'routine' && (
                <RoutineTab commuteKm={familyProfile.commuteKm} safeWindow={city.safeWindow} />
              )}
              {activeTab === 'indoor' && (
                <IndoorTab
                  roomSizeSqFt={familyProfile.roomSizeSqFt}
                  onRoomSizeChange={handleRoomSizeChange}
                />
              )}
              {activeTab === 'impact' && (
                <ImpactTab
                  commuteKm={familyProfile.commuteKm}
                  cityName={city.name}
                  impactDisclaimer={copy.impactDisclaimer}
                />
              )}
              {activeTab === 'assistant' && (
                <AssistantTab city={city} familyProfile={familyProfile} lang={lang} copy={copy} />
              )}
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
