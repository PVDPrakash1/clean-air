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
