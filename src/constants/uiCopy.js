export const UI_COPY = {
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

export const POLLUTANT_INFO = [
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

export const LANGUAGE_OPTIONS = [
  { code: 'en', label: 'EN', fullName: 'English' },
  { code: 'te', label: 'తెలుగు', fullName: 'Telugu' },
  { code: 'hi', label: 'हिंदी', fullName: 'Hindi' },
];

export const FAMILY_TOGGLES = [
  { key: 'hasKids', label: 'School-age children at home' },
  { key: 'hasSeniors', label: 'Senior family members (60+)' },
  { key: 'hasAsthma', label: 'Asthma / respiratory sensitivity' },
  { key: 'hasPurifier', label: 'Own a HEPA air purifier' },
];
