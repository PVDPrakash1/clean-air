import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Wind,
  ShieldAlert,
  Sparkles,
  MapPin,
  Users,
  Train,
  Car,
  Home,
  Leaf,
  MessageSquare,
  Send,
  AlertTriangle,
  Info,
  Clock,
  Sliders,
  Award,
  Globe,
  Sun,
  HeartPulse,
  Building2,
  RefreshCw,
  Check
} from 'lucide-react';

// --- ILLUSTRATIVE CITY & LOCALITY DATA ---
const CITIES_DATA = {
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

const UI_COPY = {
  en: {
    tagline: 'Breathe Better. Live Smarter. Build a Cleaner Future.',
    demoBadge: 'Illustrative AQI value, not live monitoring data',
    localAqi: 'YOUR LOCAL AIR QUALITY',
    tabs: {
      overview: '3-Pillar Action Plan',
      routine: 'Daily Routine & Commute',
      indoor: 'Indoor Air Advisor',
      impact: 'Sustainability Impact',
      assistant: 'GenAI Family Chat',
    },
    familyProfile: 'Family & Home Profile',
    situationLabel: '1. Current Situation',
    actionLabel: '2. Personal Action',
    impactLabel: '3. Measurable Impact',
    impactDisclaimer:
      'Impact calculations distinguish estimated household carbon emission reductions from direct personal exposure avoidance. Individual actions contribute to community progress rather than instantly altering city-wide AQI readings.',
    chatPlaceholder: 'Ask in English, Telugu, or Hindi (e.g., "Can kids play outside at 5 PM?")...',
    quickPrompts: [
      'Can my kids play outside today?',
      'Best time to open windows for fresh air?',
      'How much CO2 do I save taking Metro instead of car?',
      'Affordable ways to clean indoor air without a purifier?',
    ],
  },
  te: {
    tagline: 'మెరుగ్గా శ్వాసించండి. తెలివిగా జీవించండి. స్వచ్ఛమైన భవిష్యత్తును నిర్మించండి.',
    demoBadge: 'ఉదాహరణ AQI విలువ మాత్రమే, ప్రత్యక్ష పర్యవేక్షణ డేటా కాదు',
    localAqi: 'మీ ప్రాంతపు గాలి నాణ్యత',
    tabs: {
      overview: '3-దశల కార్యాచరణ',
      routine: 'రోజువారీ ప్రణాళిక & ప్రయాణం',
      indoor: 'ఇంటి లోపలి గాలి సలహా',
      impact: 'పర్యావరణ ప్రభావం',
      assistant: 'GenAI కుటుంబ సహాయకుడు',
    },
    familyProfile: 'కుటుంబం & ఇంటి వివరాలు',
    situationLabel: '1. ప్రస్తుత పరిస్థితి',
    actionLabel: '2. మీ కుటుంబం చేయవలసిన పని',
    impactLabel: '3. కొలవదగిన ప్రయోజనం',
    impactDisclaimer:
      'ఈ గణనలు మీ కుటుంబం తగ్గించే అంచనా కార్బన్ ఉద్గారాలను మరియు వ్యక్తిగత కాలుష్య నివారణను వేరుగా చూపిస్తాయి.',
    chatPlaceholder: 'తెలుగు, హిందీ లేదా ఇంగ్లీష్‌లో అడగండి (ఉదా: "సాయంత్రం పిల్లలు బయట ఆడుకోవచ్చా?")...',
    quickPrompts: [
      'ఈరోజు పిల్లలు బయట ఆడుకోవచ్చా?',
      'ఇంట్లో కిటికీలు తెరవడానికి సరైన సమయం ఏది?',
      'కారుకు బదులు మెట్రో వాడితే ఎంత CO2 తగ్గుతుంది?',
      'ఎయిర్ ప్యూరిఫైయర్ లేకుండా ఇంటి గాలిని శుభ్రం చేయడం ఎలా?',
    ],
  },
  hi: {
    tagline: 'बेहतर सांस लें। समझदारी से जिएं। स्वच्छ भविष्य बनाएं।',
    demoBadge: 'उदाहरण AQI मान, लाइव मॉनिटरिंग डेटा नहीं',
    localAqi: 'आपके क्षेत्र की वायु गुणवत्ता',
    tabs: {
      overview: '3-स्तंभ कार्य योजना',
      routine: 'दैनिक दिनचर्या और यात्रा',
      indoor: 'इनडोर वायु सलाहकार',
      impact: 'स्थिरता प्रभाव ट्रैकर',
      assistant: 'GenAI परिवार सहायक',
    },
    familyProfile: 'परिवार और घर की प्रोफ़ाइल',
    situationLabel: '1. वर्तमान स्थिति',
    actionLabel: '2. व्यक्तिगत कदम',
    impactLabel: '3. मापने योग्य प्रभाव',
    impactDisclaimer:
      'प्रभाव गणना अनुमानित कार्बन उत्सर्जन में कमी और व्यक्तिगत प्रदूषण बचाव को स्पष्ट रूप से अलग दिखाती है।',
    chatPlaceholder: 'हिंदी, तेलुगु या अंग्रेजी में पूछें (जैसे: "क्या बच्चे शाम 5 बजे बाहर खेल सकते हैं?")...',
    quickPrompts: [
      'क्या आज बच्चे बाहर खेल सकते हैं?',
      'ताजी हवा के लिए खिड़कियां खोलने का सबसे अच्छा समय?',
      'कार की जगह मेट्रो लेने से कितनी CO2 बचती है?',
      'बिना प्यूरीफायर के घर की हवा साफ करने के सस्ते उपाय?',
    ],
  },
};

const POLLUTANT_INFO = [
  {
    code: 'PM2.5',
    name: 'Fine Particulate Matter',
    size: '< 2.5 microns',
    detail: 'Penetrates deep into lungs and bloodstream; primarily from vehicle exhaust, winter smog, and combustion.',
  },
  {
    code: 'PM10',
    name: 'Coarse Dust Particles',
    size: '< 10 microns',
    detail: 'Irritates eyes, nose, and throat; caused by road dust, construction, and dry wind resuspension.',
  },
  {
    code: 'NO2',
    name: 'Nitrogen Dioxide',
    size: 'Traffic Gas',
    detail: 'Emitted by petrol/diesel engines; peaks near busy junctions and elevates asthma sensitivity.',
  },
];

function getAqiTheme(aqi) {
  if (aqi <= 100) {
    return {
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
      ring: 'border-amber-400',
      numberColor: 'text-amber-600',
      cardTint: 'from-amber-50 to-orange-50/40',
    };
  }
  if (aqi <= 150) {
    return {
      badgeBg: 'bg-orange-100 text-orange-900 border-orange-300',
      ring: 'border-orange-500',
      numberColor: 'text-orange-600',
      cardTint: 'from-orange-50 to-red-50/40',
    };
  }
  if (aqi <= 200) {
    return {
      badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
      ring: 'border-rose-500',
      numberColor: 'text-rose-600',
      cardTint: 'from-rose-50 to-amber-50/30',
    };
  }
  return {
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
    ring: 'border-purple-600',
    numberColor: 'text-purple-700',
    cardTint: 'from-purple-50 to-rose-50/40',
  };
}

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

  const [selectedCommute, setSelectedCommute] = useState('metro');

  const [completedHabits, setCompletedHabits] = useState({
    publicTransit: true,
    indoorWorkout: true,
    peakWindowClose: true,
    wetMopping: false,
    noIncenseSmoke: false,
  });

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Namaste! I'm your ClearAir AI Family Companion. I've tailored today's plan for your household in Hyderabad (Illustrative AQI 185). Ask me anything in English, తెలుగు, or हिंदी about outdoor timing, commutes, or keeping indoor air clean!",
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const chatEndRef = useRef(null);

  const city = CITIES_DATA[cityKey];
  const copy = UI_COPY[lang];
  const theme = getAqiTheme(city.aqi);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeTab]);

  const threePillarRecs = useMemo(() => {
    const highPollution = city.aqi > 150;
    const roundTripKm = familyProfile.commuteKm * 2;
    const savedKgCo2 = (roundTripKm * 0.145).toFixed(1);

    return [
      {
        id: 'exercise',
        icon: HeartPulse,
        title: highPollution
          ? 'Shift Morning Exercise & Kids Play Indoors'
          : 'Schedule Outdoor Activity in Afternoon Window',
        situation: `${city.name} is at AQI ${city.aqi} (${city.status}) with peak PM2.5 (${city.pm25} µg/m³) during ${city.peakHours}.`,
        action: highPollution
          ? `Replace outdoor jogging or park play before 11 AM with indoor yoga, stretching, or playroom games${
              familyProfile.hasKids || familyProfile.hasSeniors ? '—especially vital for children and seniors in your home' : ''
            }.`
          : `Plan outdoor walks or children's cycling strictly during ${city.safeWindow} when surface smog disperses.`,
        impact: highPollution
          ? 'Reduces high-breathing-rate PM2.5 inhalation by up to 65–75% during morning rush spikes.'
          : 'Cuts peak roadside particulate exposure by ~40% compared to morning rush hours.',
      },
      {
        id: 'commute',
        icon: Train,
        title: 'Switch Daily Commute to Metro / Carpool',
        situation: `Morning traffic along major corridors adds concentrated NO2 (${city.no2} ppb) and tailpipe aerosols on your ${familyProfile.commuteKm} km route.`,
        action: `Take Metro Rail, electric bus, or a 3-person carpool instead of a solo petrol/diesel car trip today.`,
        impact: `Avoids an estimated ~${savedKgCo2} kg of personal transport CO2 emissions per round trip while lowering your cabin exposure to bumper-to-bumper exhaust.`,
      },
      {
        id: 'ventilation',
        icon: Wind,
        title: 'Timed Window Sealing & Cross-Ventilation',
        situation: `Cold, stagnant morning and late-evening air traps fine particles outside, while midday warmth (${city.temp}) lifts the inversion layer.`,
        action: `Keep balcony doors and road-facing windows closed during ${city.peakHours}; open windows for 30–45 mins during ${city.safeWindow} to flush indoor CO2.`,
        impact: 'Prevents outdoor PM2.5 infiltration during peaks while preventing stale indoor air buildup.',
      },
      {
        id: 'purifier',
        icon: ShieldAlert,
        title: familyProfile.hasPurifier
          ? 'Run HEPA Purifier on Auto/Medium in Active Room'
          : 'Zero-Cost Indoor Dust & Smoke Control',
        situation: `At PM2.5 ${city.pm25} µg/m³, indoor particle levels typically reach 60–80% of outdoor smog without filtration.`,
        action: familyProfile.hasPurifier
          ? `Run a True HEPA H13 purifier (CADR >= ${Math.round(
              familyProfile.roomSizeSqFt * 0.8
            )} m³/h) in the bedroom/living room with doors closed, plus wet-mop floors instead of dry sweeping.`
          : 'Wet-mop floors daily, use kitchen exhaust during frying, avoid incense/mosquito coils, and keep damp indoor plants near entryways.',
        impact:
          'HEPA filtration can reduce indoor airborne PM2.5 by 70–85% within 45 minutes; wet mopping prevents dust resuspension.',
      },
    ];
  }, [city, familyProfile]);

  const commuteOptions = useMemo(() => {
    const rt = familyProfile.commuteKm * 2;
    return [
      {
        id: 'metro',
        name: 'Metro / Public Transit',
        icon: Train,
        co2Kg: (rt * 0.032).toFixed(2),
        savedVsCar: (rt * (0.175 - 0.032)).toFixed(2),
        exposureRisk: 'Low (Filtered AC Cabin)',
        badge: 'Best Balance',
      },
      {
        id: 'carpool',
        name: 'Shared Carpool (3 Riders)',
        icon: Users,
        co2Kg: (rt * 0.058).toFixed(2),
        savedVsCar: (rt * (0.175 - 0.058)).toFixed(2),
        exposureRisk: 'Low-Moderate (Recirculate Air)',
        badge: 'Great Alternative',
      },
      {
        id: 'wfh',
        name: 'Work / Study From Home',
        icon: Home,
        co2Kg: '0.00',
        savedVsCar: (rt * 0.175).toFixed(2),
        exposureRisk: 'Lowest (Zero Traffic Exposure)',
        badge: 'Zero Commute',
      },
      {
        id: 'solo_car',
        name: 'Solo Petrol/Diesel Car',
        icon: Car,
        co2Kg: (rt * 0.175).toFixed(2),
        savedVsCar: '0.00',
        exposureRisk: 'Moderate (High Tailpipe Zone)',
        badge: 'Baseline',
      },
    ];
  }, [familyProfile.commuteKm]);

  const impactStats = useMemo(() => {
    const rt = familyProfile.commuteKm * 2;
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
  }, [completedHabits, familyProfile.commuteKm]);

  const handleSendMessage = async (overridePrompt) => {
    const promptText = (overridePrompt ?? chatInput).trim();
    if (!promptText || isGenerating) return;

    const updatedHistory = [...messages, { role: 'user', text: promptText }];
    setMessages(updatedHistory);
    setChatInput('');
    setIsGenerating(true);

    const systemContext = `You are ClearAir AI, a warm, practical, science-grounded environmental assistant helping families respond to urban air pollution and winter smog.
Current User Context:
- Locality: ${city.name}
- Illustrative AQI: ${city.aqi} (${city.status}) — always remember this is illustrative demo data.
- Pollutants: PM2.5 = ${city.pm25} µg/m³, PM10 = ${city.pm10} µg/m³, NO2 = ${city.no2} ppb.
- Peak Pollution Hours: ${city.peakHours}
- Safer Outdoor Window: ${city.safeWindow}
- Family Profile: Kids at home = ${familyProfile.hasKids}, Seniors = ${familyProfile.hasSeniors}, Asthma/Sensitivity = ${familyProfile.hasAsthma}, Daily one-way commute = ${familyProfile.commuteKm} km, Room size = ${familyProfile.roomSizeSqFt} sq ft, Owns HEPA Purifier = ${familyProfile.hasPurifier}.
- Selected UI Language: ${lang === 'te' ? 'Telugu' : lang === 'hi' ? 'Hindi' : 'English'}.

Rules:
1. Respond in the language the user asked in (if they write in Telugu or Hindi, reply naturally in that script; otherwise match their language).
2. Always connect three pillars clearly and concisely: (1) Current local situation, (2) Practical family action today, and (3) Measurable health/exposure or estimated emission impact.
3. Explicitly distinguish estimated personal carbon emission savings from direct personal exposure reduction; never claim one family's action immediately changes city-wide AQI.
4. Keep responses warm, scannable with bullet points, and under 180 words.`;

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
      if (!apiKey || apiKey === 'your_gemini_api_key_here') {
        throw new Error('No API key configured');
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemContext }] },
            contents: updatedHistory.map((m) => ({
              role: m.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: m.text }],
            })),
          }),
        }
      );

      if (!response.ok) throw new Error('Gemini API request failed');
      const data = await response.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'I recommend keeping outdoor activity inside during peak hours and using public transit today.';

      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    } catch (err) {
      const fallbackReply =
        lang === 'te'
          ? `📍 ప్రస్తుత పరిస్థితి (${city.name}): ఉదాహరణ AQI ${city.aqi} (${city.status}) గా ఉంది. PM2.5 (${city.pm25} µg/m³) ఎక్కువగా ఉంటుంది.

✅ కుటుంబ సూచన: ${city.peakHours} సమయంలో పిల్లలు మరియు పెద్దలను ఇంటి లోపలే ఉంచండి. కిటికీలు తెరవడానికి ${city.safeWindow} ఉత్తమ సమయం.

🌱 ప్రయోజనం: ఇంట్లో కాలుష్య ప్రభావం ~65% తగ్గుతుంది మరియు మెట్రో వాడటం ద్వారా సుమారు ${(
              familyProfile.commuteKm *
              2 *
              0.143
            ).toFixed(1)} kg CO2 ఉద్గారాలను తగ్గించవచ్చు.`
          : lang === 'hi'
          ? `📍 वर्तमान स्थिति (${city.name}): उदाहरण AQI ${city.aqi} (${city.status}) है, जिसमें PM2.5 (${city.pm25} µg/m³) अधिक रहता है।

✅ परिवार के लिए कदम: ${city.peakHours} के दौरान बच्चों और बुजुर्गों को बाहर जाने से बचाएं। खिड़कियां खोलने के लिए ${city.safeWindow} सबसे सुरक्षित समय है।

🌱 प्रभाव: घर के अंदर प्रदूषण का संपर्क ~65% कम होता है, और मेट्रो अपनाने से लगभग ${(
              familyProfile.commuteKm *
              2 *
              0.143
            ).toFixed(1)} kg CO2 उत्सर्जन बचता है।`
          : `📍 Current Situation (${city.name}): Illustrative AQI is ${city.aqi} (${city.status}) with PM2.5 at ${city.pm25} µg/m³.

✅ Recommended Action: Keep vigorous outdoor activity paused during ${city.peakHours}. Aim for ${city.safeWindow} for safer outdoor air.

🌱 Measurable Impact: Cuts peak exposure substantially while taking Metro instead of a solo car for your ${
              familyProfile.commuteKm * 2
            } km round trip avoids an estimated ${(familyProfile.commuteKm * 2 * 0.143).toFixed(
              1
            )} kg of CO2 emissions.`;

      setMessages((prev) => [...prev, { role: 'assistant', text: fallbackReply }]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
              <Wind className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                  ClearAir <span className="text-emerald-600">AI</span>
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Smart Pollution Companion
                </span>
              </div>
              <p className="text-xs text-slate-500">{copy.tagline}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative flex items-center bg-slate-100 hover:bg-slate-200/70 transition rounded-lg px-2.5 py-1.5 border border-slate-200">
              <MapPin className="w-4 h-4 text-emerald-600 mr-1.5 shrink-0" />
              <select
                aria-label="Select City Locality"
                value={cityKey}
                onChange={(e) => setCityKey(e.target.value)}
                className="bg-transparent text-xs sm:text-sm font-medium text-slate-800 focus:outline-none cursor-pointer pr-1"
              >
                {Object.values(CITIES_DATA).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
              <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-1" />
              {[
                { code: 'en', label: 'EN' },
                { code: 'te', label: 'తెలుగు' },
                { code: 'hi', label: 'हिंदी' },
              ].map((item) => (
                <button
                  key={item.code}
                  onClick={() => setLang(item.code)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                    lang === item.code
                      ? 'bg-white text-emerald-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <section
            className={`lg:col-span-5 rounded-2xl bg-gradient-to-br ${theme.cardTint} bg-white border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold tracking-wider uppercase text-slate-500">
                  {copy.localAqi}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-800 text-white">
                  <Info className="w-3 h-3 text-amber-300" />
                  {copy.demoBadge}
                </span>
              </div>

              <div className="flex items-center gap-5 my-4">
                <div
                  className={`w-28 h-28 rounded-2xl bg-white border-4 ${theme.ring} shadow-sm flex flex-col items-center justify-center shrink-0`}
                >
                  <span className={`text-4xl font-extrabold tracking-tight ${theme.numberColor}`}>
                    {city.aqi}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-0.5">
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
                  <p className="text-xs text-slate-600 leading-relaxed">{city.situationSummary}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5 mt-4">
                {[
                  { label: 'PM2.5', val: `${city.pm25} µg/m³`, sub: 'Fine Smog' },
                  { label: 'PM10', val: `${city.pm10} µg/m³`, sub: 'Road Dust' },
                  { label: 'NO2', val: `${city.no2} ppb`, sub: 'Traffic Gas' },
                ].map((p) => (
                  <div
                    key={p.label}
                    className="bg-white/90 rounded-xl p-2.5 border border-slate-200/80 text-center"
                  >
                    <div className="text-[11px] font-bold text-slate-500">{p.label}</div>
                    <div className="text-sm font-extrabold text-slate-900 mt-0.5">{p.val}</div>
                    <div className="text-[10px] text-slate-400">{p.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="flex items-start gap-2 bg-rose-50/90 border border-rose-200/80 rounded-xl p-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-rose-900 block">High-Risk Peaks</span>
                  <span className="text-rose-700">{city.peakHours}</span>
                </div>
              </div>
              <div className="flex items-start gap-2 bg-emerald-50/90 border border-emerald-200/80 rounded-xl p-2.5">
                <Sun className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-900 block">Safer Window</span>
                  <span className="text-emerald-700">{city.safeWindow}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="lg:col-span-4 rounded-2xl bg-white border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  Today’s Hourly Pollution Curve
                </h3>
                <span className="text-[11px] text-slate-400">
                  {city.temp} • Wind {city.wind}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Plan outdoor errands during the midday dip when sunlight disperses trapped smog.
              </p>

              <div className="h-40 flex items-end justify-between gap-1.5 pt-4 pb-1 px-1 bg-slate-50 rounded-xl border border-slate-100">
                {city.hourly.map((slot) => {
                  const maxVal = 380;
                  const heightPct = Math.min(100, Math.max(18, Math.round((slot.aqi / maxVal) * 100)));
                  const barColor =
                    slot.aqi > 200
                      ? 'bg-purple-500'
                      : slot.aqi > 150
                      ? 'bg-rose-500'
                      : slot.aqi > 100
                      ? 'bg-amber-400'
                      : 'bg-emerald-500';
                  return (
                    <div key={slot.time} className="flex-1 flex flex-col items-center h-full justify-end">
                      <span className="text-[10px] font-bold text-slate-600 mb-1">{slot.aqi}</span>
                      <div
                        style={{ height: `${heightPct}%` }}
                        className={`w-full max-w-[24px] rounded-t-md ${barColor} transition-all duration-300`}
                        title={`${slot.time}: AQI ${slot.aqi}`}
                      />
                      <span className="text-[10px] font-medium text-slate-500 mt-1.5">{slot.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                What’s in the air?
              </div>
              {POLLUTANT_INFO.map((item) => (
                <div key={item.code} className="text-xs bg-slate-50 rounded-lg p-2 border border-slate-100">
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span>
                      {item.code} — {item.name}
                    </span>
                    <span className="text-[10px] font-medium text-slate-500">{item.size}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="lg:col-span-3 rounded-2xl bg-white border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sliders className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">{copy.familyProfile}</h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Tailors AI health alerts, commute savings, and purifier sizing.
              </p>

              <div className="space-y-2.5">
                {[
                  { key: 'hasKids', label: 'School-age children at home' },
                  { key: 'hasSeniors', label: 'Senior family members (60+)' },
                  { key: 'hasAsthma', label: 'Asthma / respiratory sensitivity' },
                  { key: 'hasPurifier', label: 'Own a HEPA air purifier' },
                ].map((toggle) => (
                  <label
                    key={toggle.key}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/90 hover:bg-slate-50 cursor-pointer transition"
                  >
                    <span className="text-xs font-medium text-slate-700">{toggle.label}</span>
                    <input
                      type="checkbox"
                      checked={familyProfile[toggle.key]}
                      onChange={(e) =>
                        setFamilyProfile((prev) => ({ ...prev, [toggle.key]: e.target.checked }))
                      }
                      className="w-4 h-4 rounded accent-emerald-600 cursor-pointer"
                    />
                  </label>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>One-Way Daily Commute</span>
                  <span className="text-emerald-700">{familyProfile.commuteKm} km</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="45"
                  value={familyProfile.commuteKm}
                  onChange={(e) =>
                    setFamilyProfile((prev) => ({ ...prev, commuteKm: Number(e.target.value) }))
                  }
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>2 km (Local)</span>
                  <span>45 km (Cross-City)</span>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-emerald-50 border border-emerald-200/80 rounded-xl p-3 text-xs text-emerald-900">
              <span className="font-bold block mb-0.5">Live Personalization Active</span>
              All recommendations below dynamically adapt to your household profile.
            </div>
          </section>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50/70 px-2 pt-2 gap-1">
            {[
              { id: 'overview', label: copy.tabs.overview, icon: Sparkles },
              { id: 'routine', label: copy.tabs.routine, icon: Train },
              { id: 'indoor', label: copy.tabs.indoor, icon: Home },
              { id: 'impact', label: copy.tabs.impact, icon: Leaf },
              { id: 'assistant', label: copy.tabs.assistant, icon: MessageSquare },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold rounded-t-xl border-b-2 transition whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-emerald-700 border-emerald-600 shadow-sm'
                      : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Today’s Personalized 3-Pillar Guidance
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Connecting your local air situation → tailored family action → measurable exposure or emission benefit.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('assistant')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm self-start"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Ask Follow-Up in {lang === 'te' ? 'తెలుగు' : lang === 'hi' ? 'हिंदी' : 'English'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {threePillarRecs.map((rec, idx) => {
                    const RecIcon = rec.icon;
                    return (
                      <div
                        key={rec.id}
                        className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 flex flex-col justify-between hover:border-emerald-300 transition"
                      >
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                              <RecIcon className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                                Recommendation #{idx + 1}
                              </span>
                              <h3 className="text-base font-bold text-slate-900">{rec.title}</h3>
                            </div>
                          </div>

                          <div className="space-y-2.5 text-xs leading-relaxed">
                            <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                              <span className="font-bold text-slate-800 block mb-0.5">
                                {copy.situationLabel}
                              </span>
                              <p className="text-slate-600">{rec.situation}</p>
                            </div>

                            <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/80">
                              <span className="font-bold text-emerald-900 block mb-0.5">
                                {copy.actionLabel}
                              </span>
                              <p className="text-emerald-950">{rec.action}</p>
                            </div>

                            <div className="bg-sky-50/70 p-3 rounded-xl border border-sky-200/80">
                              <span className="font-bold text-sky-900 block mb-0.5">
                                {copy.impactLabel}
                              </span>
                              <p className="text-sky-950">{rec.impact}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-xl bg-slate-100 border border-slate-200 p-3.5 flex items-start gap-2.5 text-xs text-slate-600">
                  <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <p>{copy.impactDisclaimer}</p>
                </div>
              </div>
            )}

            {activeTab === 'routine' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 space-y-4">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        Low-Emission Commute & Exposure Comparator
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500">
                        Based on your <strong>{familyProfile.commuteKm * 2} km round trip</strong> ({familyProfile.commuteKm} km each way). Compare estimated tailpipe CO2 reductions vs. solo car driving.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {commuteOptions.map((opt) => {
                        const OptIcon = opt.icon;
                        const isSelected = selectedCommute === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => setSelectedCommute(opt.id)}
                            className={`text-left p-4 rounded-2xl border-2 transition ${
                              isSelected
                                ? 'border-emerald-600 bg-emerald-50/40 shadow-sm'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                                <OptIcon className="w-5 h-5" />
                              </div>
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                                {opt.badge}
                              </span>
                            </div>

                            <div className="font-bold text-sm text-slate-900">{opt.name}</div>
                            <div className="mt-2 space-y-1 text-xs">
                              <div className="flex justify-between text-slate-600">
                                <span>Est. Trip Emissions:</span>
                                <span className="font-bold text-slate-900">{opt.co2Kg} kg CO2</span>
                              </div>
                              <div className="flex justify-between text-emerald-700">
                                <span>Est. CO2 Avoided:</span>
                                <span className="font-bold">+{opt.savedVsCar} kg</span>
                              </div>
                              <div className="pt-1 border-t border-slate-100 text-[11px] text-slate-500">
                                Exposure: <strong className="text-slate-700">{opt.exposureRisk}</strong>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="lg:col-span-5 rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-4">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-emerald-600" />
                      Smart School & Office Schedule
                    </h3>

                    <div className="space-y-3 text-xs">
                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <span className="font-bold text-rose-700 block">07:30 – 09:30 AM • School & Office Departure</span>
                        <p className="text-slate-600 mt-1">
                          Keep car AC on <strong>recirculate mode</strong> in traffic; kids waiting at open bus stops benefit from a well-fitted N95/KN95 mask when AQI &gt; 150.
                        </p>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <span className="font-bold text-emerald-700 block">{city.safeWindow} • Midday Errands & Walk</span>
                        <p className="text-slate-600 mt-1">
                          Lowest particulate density of the day. Ideal window for senior citizens’ walk, grocery runs, and airing out bedrooms.
                        </p>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200">
                        <span className="font-bold text-amber-700 block">05:30 – 08:30 PM • Evening Return & Activities</span>
                        <p className="text-slate-600 mt-1">
                          Choose indoor sports/tuition centers over roadside playgrounds as evening cooling traps exhaust particles.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'indoor' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 space-y-4">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        Practical, Affordable Indoor Air Protection
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500">
                        Actionable steps to cut indoor smoke, dust, and outdoor smog infiltration—with or without an air purifier.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                      <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                          Zero-Cost Habit
                        </span>
                        <h3 className="font-bold text-sm text-slate-900 pt-1">Wet Mop Instead of Brooming</h3>
                        <p className="text-slate-600 leading-relaxed">
                          Dry sweeping kicks settled PM10 dust back into breathing height. Damp mopping captures fine dust cleanly.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 font-bold text-[11px]">
                          Kitchen & Combustion
                        </span>
                        <h3 className="font-bold text-sm text-slate-900 pt-1">Ventilate Cooking & Cut Smoke</h3>
                        <p className="text-slate-600 leading-relaxed">
                          Run the kitchen chimney/exhaust fan while tempering (tadka) or frying, and pause agarbatti/dhoop sticks on high-AQI days.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold text-[11px]">
                          Smart Sealing
                        </span>
                        <h3 className="font-bold text-sm text-slate-900 pt-1">Door Draft Stoppers</h3>
                        <p className="text-slate-600 leading-relaxed">
                          Place a rolled towel or rubber draft seal under main entrance doors facing corridors or dusty streets.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 font-bold text-[11px]">
                          Natural Aid
                        </span>
                        <h3 className="font-bold text-sm text-slate-900 pt-1">Wipe Leaf Surfaces</h3>
                        <p className="text-slate-600 leading-relaxed">
                          Indoor plants like Areca Palm or Snake Plant collect dust on broad leaves—wipe leaves weekly with a damp cloth.
                        </p>
                      </div>
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
                          <span>Room Area</span>
                          <span className="text-emerald-400">{familyProfile.roomSizeSqFt} sq. ft.</span>
                        </div>
                        <input
                          type="range"
                          min="100"
                          max="600"
                          step="25"
                          value={familyProfile.roomSizeSqFt}
                          onChange={(e) =>
                            setFamilyProfile((prev) => ({
                              ...prev,
                              roomSizeSqFt: Number(e.target.value),
                            }))
                          }
                          className="w-full accent-emerald-400 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400">
                          <span>100 sq ft (Small Bedroom)</span>
                          <span>600 sq ft (Large Hall)</span>
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-3">
                        <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                          <div className="text-[11px] text-slate-300">Minimum CADR Needed</div>
                          <div className="text-xl font-extrabold text-emerald-400 mt-0.5">
                            {Math.round(familyProfile.roomSizeSqFt * 0.85)} m³/h
                          </div>
                          <div className="text-[10px] text-slate-400">For 4–5 air changes/hr</div>
                        </div>

                        <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                          <div className="text-[11px] text-slate-300">Recommended Filter</div>
                          <div className="text-base font-extrabold text-white mt-1">True HEPA H13</div>
                          <div className="text-[10px] text-slate-400">+ Activated Carbon</div>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300 mt-5 pt-3 border-t border-white/10">
                      Tip: Keep doors/windows shut while running the purifier so it cleans room air rapidly instead of fighting outdoor air.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'impact' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 space-y-3.5">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        Daily Clean-Air & Sustainability Action Log
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500">
                        Check off the actions your family took today to calculate personal exposure protection and estimated carbon savings.
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      {[
                        {
                          key: 'publicTransit',
                          title: `Used Metro / Bus / Carpool for ${familyProfile.commuteKm * 2} km commute`,
                          tag: `Est. ${(familyProfile.commuteKm * 2 * 0.143).toFixed(2)} kg CO2 avoided`,
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
                      ].map((habit) => {
                        const checked = completedHabits[habit.key];
                        return (
                          <button
                            key={habit.key}
                            onClick={() =>
                              setCompletedHabits((prev) => ({ ...prev, [habit.key]: !prev[habit.key] }))
                            }
                            className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition ${
                              checked
                                ? 'bg-emerald-50/70 border-emerald-300'
                                : 'bg-white border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                                  checked
                                    ? 'bg-emerald-600 border-emerald-600 text-white'
                                    : 'border-slate-300 bg-white'
                                }`}
                              >
                                {checked && <Check className="w-3.5 h-3.5" />}
                              </div>
                              <div>
                                <div className="text-xs sm:text-sm font-bold text-slate-900">
                                  {habit.title}
                                </div>
                                <div className="text-[11px] text-emerald-700 font-medium">{habit.tag}</div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">
                          Household Impact Summary
                        </span>
                        <Award className="w-6 h-6 text-amber-300" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 rounded-xl p-3.5">
                          <div className="text-xs text-emerald-100">Est. CO2 Avoided Today</div>
                          <div className="text-2xl font-extrabold mt-1">{impactStats.dailyCo2} kg</div>
                          <div className="text-[11px] text-emerald-200 mt-0.5">
                            ~{impactStats.monthlyProjectedCo2} kg / month pace
                          </div>
                        </div>

                        <div className="bg-white/10 rounded-xl p-3.5">
                          <div className="text-xs text-emerald-100">Personal Exposure Shield</div>
                          <div className="text-2xl font-extrabold mt-1">
                            {impactStats.exposureReductionPct}%
                          </div>
                          <div className="text-[11px] text-emerald-200 mt-0.5">
                            {impactStats.activeCount} of 5 habits active
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-white/15 text-xs text-emerald-50 leading-relaxed">
                        <strong>Community Multiplier:</strong> If 5,000 families in{' '}
                        {city.name.split(' ')[0]} adopt low-emission commutes today, that avoids an estimated{' '}
                        <strong>{Math.round(Number(impactStats.dailyCo2) * 5000).toLocaleString()} kg of CO2</strong>{' '}
                        and lowers neighborhood roadside exhaust.
                      </div>
                    </div>

                    <div className="rounded-xl bg-amber-50 border border-amber-200 p-3.5 text-xs text-amber-950 leading-relaxed">
                      <strong>Scientific Transparency Note:</strong> {copy.impactDisclaimer}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'assistant' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      ClearAir GenAI Family Assistant
                    </h2>
                    <p className="text-xs text-slate-500">
                      Context-aware answers in English, Telugu (తెలుగు), and Hindi (हिंदी) using your local AQI and family profile.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setMessages([
                        {
                          role: 'assistant',
                          text: `Context refreshed for ${city.name} (Illustrative AQI ${city.aqi}). How can I help your family today?`,
                        },
                      ])
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reset Chat
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {copy.quickPrompts.map((qp) => (
                    <button
                      key={qp}
                      onClick={() => handleSendMessage(qp)}
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition text-left"
                    >
                      {qp}
                    </button>
                  ))}
                </div>

                <div className="h-80 overflow-y-auto rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-3">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                          msg.role === 'user'
                            ? 'bg-emerald-600 text-white rounded-br-sm'
                            : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-bl-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isGenerating && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-500 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        Analyzing local AQI & family context...
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={copy.chatPlaceholder}
                    className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    disabled={isGenerating || !chatInput.trim()}
                    className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-sm transition shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
