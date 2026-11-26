// Pure, testable domain logic for ClearAir AI

export const CITIES_DATA = {
  hyderabad_west: {
    id: 'hyderabad_west',
    name: 'Hyderabad (Manikonda / Gachibowli)',
    aqi: 185,
    status: 'Unhealthy',
    color: 'red',
    pm25: 108,
    pm10: 176,
    no2: 54,
    temp: '24°C',
    humidity: '58%',
    wind: '7 km/h NW',
    peakHours: '06:30 – 10:30 AM & 06:30 – 10:00 PM',
    safeWindow: '12:30 – 04:00 PM',
    situationSummary:
      'Morning winter temperature inversion + ORR/IT corridor traffic is trapping fine PM2.5 particles near ground level.',
    hourly: [
      { time: '6am', aqi: 192 },
      { time: '8am', aqi: 210 },
      { time: '10am', aqi: 185 },
      { time: '12pm', aqi: 138 },
      { time: '2pm', aqi: 124 },
      { time: '4pm', aqi: 145 },
      { time: '6pm', aqi: 188 },
      { time: '8pm', aqi: 205 },
      { time: '10pm', aqi: 190 },
    ],
  },
  hyderabad_central: {
    id: 'hyderabad_central',
    name: 'Hyderabad (Jubilee Hills / Banjara)',
    aqi: 158,
    status: 'Unhealthy',
    color: 'red',
    pm25: 82,
    pm10: 148,
    no2: 46,
    temp: '25°C',
    humidity: '54%',
    wind: '9 km/h NW',
    peakHours: '07:30 – 10:30 AM & 06:00 – 09:30 PM',
    safeWindow: '12:00 – 04:30 PM',
    situationSummary:
      'Moderate-to-high urban traffic particulate buildup along arterial roads, improving slightly during afternoon thermal mixing.',
    hourly: [
      { time: '6am', aqi: 165 },
      { time: '8am', aqi: 182 },
      { time: '10am', aqi: 160 },
      { time: '12pm', aqi: 118 },
      { time: '2pm', aqi: 108 },
      { time: '4pm', aqi: 126 },
      { time: '6pm', aqi: 164 },
      { time: '8pm', aqi: 175 },
      { time: '10pm', aqi: 160 },
    ],
  },
  delhi_ncr: {
    id: 'delhi_ncr',
    name: 'Delhi NCR (Dwarka / South Delhi)',
    aqi: 312,
    status: 'Very Unhealthy',
    color: 'purple',
    pm25: 224,
    pm10: 340,
    no2: 78,
    temp: '16°C',
    humidity: '72%',
    wind: '4 km/h W',
    peakHours: 'All Morning & Late Evening',
    safeWindow: '01:30 – 03:30 PM (Brief Dip)',
    situationSummary:
      'Severe winter smog episode with stagnant winds and high regional aerosol trapping. Outdoor exertion carries immediate respiratory risk.',
    hourly: [
      { time: '6am', aqi: 345 },
      { time: '8am', aqi: 360 },
      { time: '10am', aqi: 325 },
      { time: '12pm', aqi: 270 },
      { time: '2pm', aqi: 248 },
      { time: '4pm', aqi: 280 },
      { time: '6pm', aqi: 330 },
      { time: '8pm', aqi: 355 },
      { time: '10pm', aqi: 340 },
    ],
  },
  bengaluru: {
    id: 'bengaluru',
    name: 'Bengaluru (Whitefield / Bellandur)',
    aqi: 94,
    status: 'Moderate',
    color: 'amber',
    pm25: 34,
    pm10: 88,
    no2: 38,
    temp: '23°C',
    humidity: '60%',
    wind: '14 km/h E',
    peakHours: '08:30 – 10:30 AM & 05:30 – 08:30 PM',
    safeWindow: '11:00 AM – 04:30 PM',
    situationSummary:
      'Road dust resuspension and rush-hour corridor congestion create localized moderate spikes; good breeze disperses afternoon pollution.',
    hourly: [
      { time: '6am', aqi: 82 },
      { time: '8am', aqi: 112 },
      { time: '10am', aqi: 104 },
      { time: '12pm', aqi: 78 },
      { time: '2pm', aqi: 72 },
      { time: '4pm', aqi: 85 },
      { time: '6pm', aqi: 116 },
      { time: '8pm', aqi: 105 },
      { time: '10pm', aqi: 88 },
    ],
  },
  mumbai: {
    id: 'mumbai',
    name: 'Mumbai (BKC / Andheri East)',
    aqi: 136,
    status: 'Sensitive Groups',
    color: 'orange',
    pm25: 56,
    pm10: 128,
    no2: 49,
    temp: '28°C',
    humidity: '65%',
    wind: '12 km/h W',
    peakHours: '08:00 – 11:00 AM & 07:00 – 10:00 PM',
    safeWindow: '01:00 – 05:00 PM (Sea Breeze)',
    situationSummary:
      'Construction particulate matter and slow coastal wind reversal cause hazy mornings; afternoon sea breeze clears coastal air.',
    hourly: [
      { time: '6am', aqi: 148 },
      { time: '8am', aqi: 162 },
      { time: '10am', aqi: 145 },
      { time: '12pm', aqi: 115 },
      { time: '2pm', aqi: 98 },
      { time: '4pm', aqi: 105 },
      { time: '6pm', aqi: 138 },
      { time: '8pm', aqi: 154 },
      { time: '10pm', aqi: 142 },
    ],
  },
};

export const CITY_LIST = Object.freeze(Object.values(CITIES_DATA));

export function getAqiTheme(aqi) {
  if (aqi <= 100) {
    return {
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
      ring: 'border-amber-500',
      numberColor: 'text-amber-700',
      cardTint: 'from-amber-50 to-orange-50/40',
    };
  }
  if (aqi <= 150) {
    return {
      badgeBg: 'bg-orange-100 text-orange-900 border-orange-300',
      ring: 'border-orange-500',
      numberColor: 'text-orange-700',
      cardTint: 'from-orange-50 to-red-50/40',
    };
  }
  if (aqi <= 200) {
    return {
      badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
      ring: 'border-rose-600',
      numberColor: 'text-rose-700',
      cardTint: 'from-rose-50 to-amber-50/30',
    };
  }
  return {
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
    ring: 'border-purple-600',
    numberColor: 'text-purple-800',
    cardTint: 'from-purple-50 to-rose-50/40',
  };
}

export function getHourlyBarColor(aqi) {
  if (aqi > 200) return 'bg-purple-600';
  if (aqi > 150) return 'bg-rose-600';
  if (aqi > 100) return 'bg-amber-500';
  return 'bg-emerald-600';
}

export function sanitizeUserPrompt(rawInput, maxLength = 400) {
  if (typeof rawInput !== 'string') return '';
  return rawInput
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength);
}

export function calculateCommuteMetrics(oneWayKm) {
  const safeKm = Math.max(1, Math.min(100, Number(oneWayKm) || 1));
  const rt = safeKm * 2;
  const carBaseline = rt * 0.175;
  return [
    {
      id: 'metro',
      name: 'Metro / Public Transit',
      co2Kg: (rt * 0.032).toFixed(2),
      savedVsCar: (carBaseline - rt * 0.032).toFixed(2),
      exposureRisk: 'Low (Filtered AC Cabin)',
      badge: 'Best Balance',
    },
    {
      id: 'carpool',
      name: 'Shared Carpool (3 Riders)',
      co2Kg: (rt * 0.058).toFixed(2),
      savedVsCar: (carBaseline - rt * 0.058).toFixed(2),
      exposureRisk: 'Low-Moderate (Recirculate Air)',
      badge: 'Great Alternative',
    },
    {
      id: 'wfh',
      name: 'Work / Study From Home',
      co2Kg: '0.00',
      savedVsCar: carBaseline.toFixed(2),
      exposureRisk: 'Lowest (Zero Traffic Exposure)',
      badge: 'Zero Commute',
    },
    {
      id: 'solo_car',
      name: 'Solo Petrol/Diesel Car',
      co2Kg: carBaseline.toFixed(2),
      savedVsCar: '0.00',
      exposureRisk: 'Moderate (High Tailpipe Zone)',
      badge: 'Baseline',
    },
  ];
}

export function calculateSustainabilityImpact(completedHabits, oneWayKm) {
  const safeKm = Math.max(1, Math.min(100, Number(oneWayKm) || 1));
  const rt = safeKm * 2;
  const transitCo2 = completedHabits.publicTransit ? rt * 0.143 : 0;
  const otherHabitsCo2 =
    (completedHabits.indoorWorkout ? 0.3 : 0) +
    (completedHabits.peakWindowClose ? 0.2 : 0) +
    (completedHabits.wetMopping ? 0.15 : 0) +
    (completedHabits.noIncenseSmoke ? 0.25 : 0);

  const dailyCo2 = transitCo2 + otherHabitsCo2;
  const monthlyProjectedCo2 = dailyCo2 * 22;
  const activeCount = Object.values(completedHabits).filter(Boolean).length;
  const exposureReductionPct = Math.min(82, activeCount * 16);

  return {
    dailyCo2: dailyCo2.toFixed(2),
    monthlyProjectedCo2: monthlyProjectedCo2.toFixed(1),
    exposureReductionPct,
    activeCount,
  };
}

export function calculateRecommendedCadr(roomSizeSqFt) {
  const safeArea = Math.max(50, Math.min(2000, Number(roomSizeSqFt) || 100));
  return Math.round(safeArea * 0.85);
}

export function buildThreePillarRecommendations(city, familyProfile) {
  const highPollution = city.aqi > 150;
  const savedKgCo2 = (familyProfile.commuteKm * 2 * 0.145).toFixed(1);
  const vulnerableNote =
    familyProfile.hasKids || familyProfile.hasSeniors
      ? '—especially vital for children and seniors in your home'
      : '';

  return [
    {
      id: 'exercise',
      iconKey: 'heart',
      title: highPollution
        ? 'Shift Morning Exercise & Kids Play Indoors'
        : 'Schedule Outdoor Activity in Afternoon Window',
      situation: `${city.name} is at AQI ${city.aqi} (${city.status}) with peak PM2.5 (${city.pm25} µg/m³) during ${city.peakHours}.`,
      action: highPollution
        ? `Replace outdoor jogging or park play before 11 AM with indoor yoga, stretching, or playroom games${vulnerableNote}.`
        : `Plan outdoor walks or children's cycling strictly during ${city.safeWindow} when surface smog disperses.`,
      impact: highPollution
        ? 'Reduces high-breathing-rate PM2.5 inhalation by up to 65–75% during morning rush spikes.'
        : 'Cuts peak roadside particulate exposure by ~40% compared to morning rush hours.',
    },
    {
      id: 'commute',
      iconKey: 'train',
      title: 'Switch Daily Commute to Metro / Carpool',
      situation: `Morning traffic along major corridors adds concentrated NO2 (${city.no2} ppb) and tailpipe aerosols on your ${familyProfile.commuteKm} km route.`,
      action: 'Take Metro Rail, electric bus, or a 3-person carpool instead of a solo petrol/diesel car trip today.',
      impact: `Avoids an estimated ~${savedKgCo2} kg of personal transport CO2 emissions per round trip while lowering your cabin exposure to bumper-to-bumper exhaust.`,
    },
    {
      id: 'ventilation',
      iconKey: 'wind',
      title: 'Timed Window Sealing & Cross-Ventilation',
      situation: `Cold, stagnant morning and late-evening air traps fine particles outside, while midday warmth (${city.temp}) lifts the inversion layer.`,
      action: `Keep balcony doors and road-facing windows closed during ${city.peakHours}; open windows for 30–45 mins during ${city.safeWindow} to flush indoor CO2.`,
      impact: 'Prevents outdoor PM2.5 infiltration during peaks while preventing stale indoor air buildup.',
    },
    {
      id: 'purifier',
      iconKey: 'shield',
      title: familyProfile.hasPurifier
        ? 'Run HEPA Purifier on Auto/Medium in Active Room'
        : 'Zero-Cost Indoor Dust & Smoke Control',
      situation: `At PM2.5 ${city.pm25} µg/m³, indoor particle levels typically reach 60–80% of outdoor smog without filtration.`,
      action: familyProfile.hasPurifier
        ? `Run a True HEPA H13 purifier (CADR >= ${calculateRecommendedCadr(
            familyProfile.roomSizeSqFt
          )} m³/h) in the bedroom/living room with doors closed, plus wet-mop floors instead of dry sweeping.`
        : 'Wet-mop floors daily, use kitchen exhaust during frying, avoid incense/mosquito coils, and keep damp indoor plants near entryways.',
      impact:
        'HEPA filtration can reduce indoor airborne PM2.5 by 70–85% within 45 minutes; wet mopping prevents dust resuspension.',
    },
  ];
}

export function buildFallbackChatReply({ city, familyProfile, lang }) {
  const savedCo2 = (familyProfile.commuteKm * 2 * 0.143).toFixed(1);

  if (lang === 'te') {
    return `📍 ప్రస్తుత పరిస్థితి (${city.name}): ఉదాహరణ AQI ${city.aqi} (${city.status}) గా ఉంది. PM2.5 (${city.pm25} µg/m³) ఎక్కువగా ఉంటుంది.

✅ కుటుంబ సూచన: ${city.peakHours} సమయంలో పిల్లలు మరియు పెద్దలను ఇంటి లోపలే ఉంచండి. కిటికీలు తెరవడానికి ${city.safeWindow} ఉత్తమ సమయం.

🌱 ప్రయోజనం: ఇంట్లో కాలుష్య ప్రభావం ~65% తగ్గుతుంది మరియు మెట్రో వాడటం ద్వారా సుమారు ${savedCo2} kg CO2 ఉద్గారాలను తగ్గించవచ్చు.`;
  }

  if (lang === 'hi') {
    return `📍 वर्तमान स्थिति (${city.name}): उदाहरण AQI ${city.aqi} (${city.status}) है, जिसमें PM2.5 (${city.pm25} µg/m³) अधिक रहता है।

✅ परिवार के लिए कदम: ${city.peakHours} के दौरान बच्चों और बुजुर्गों को बाहर जाने से बचाएं। खिड़कियां खोलने के लिए ${city.safeWindow} सबसे सुरक्षित समय है।

🌱 प्रभाव: घर के अंदर प्रदूषण का संपर्क ~65% कम होता है, और मेट्रो अपनाने से लगभग ${savedCo2} kg CO2 उत्सर्जन बचता है।`;
  }

  return `📍 Current Situation (${city.name}): Illustrative AQI is ${city.aqi} (${city.status}) with PM2.5 at ${city.pm25} µg/m³.

✅ Recommended Action: Keep vigorous outdoor activity paused during ${city.peakHours}. Aim for ${city.safeWindow} for safer outdoor air.

🌱 Measurable Impact: Cuts peak exposure substantially while taking Metro instead of a solo car for your ${
    familyProfile.commuteKm * 2
  } km round trip avoids an estimated ${savedCo2} kg of CO2 emissions.`;
}
