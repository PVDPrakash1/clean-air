import { buildFallbackChatReply } from '../utils/airQualityEngine';

const LANGUAGE_LABELS = {
  te: 'Telugu',
  hi: 'Hindi',
  en: 'English',
};

export async function generateAssistantReply({ history, city, familyProfile, lang }) {
  const systemContext = `You are ClearAir AI, a warm, practical, science-grounded environmental assistant helping families respond to urban air pollution and winter smog.
Current User Context:
- Locality: ${city.name}
- Illustrative AQI: ${city.aqi} (${city.status}) — always remember this is illustrative demo data.
- Pollutants: PM2.5 = ${city.pm25} µg/m³, PM10 = ${city.pm10} µg/m³, NO2 = ${city.no2} ppb.
- Peak Pollution Hours: ${city.peakHours}
- Safer Outdoor Window: ${city.safeWindow}
- Family Profile: Kids at home = ${familyProfile.hasKids}, Seniors = ${familyProfile.hasSeniors}, Asthma/Sensitivity = ${familyProfile.hasAsthma}, Daily one-way commute = ${familyProfile.commuteKm} km, Room size = ${familyProfile.roomSizeSqFt} sq ft, Owns HEPA Purifier = ${familyProfile.hasPurifier}.
- Selected UI Language: ${LANGUAGE_LABELS[lang] || 'English'}.

Rules:
1. Respond in the language the user asked in (if they write in Telugu or Hindi, reply naturally in that script; otherwise match their language).
2. Always connect three pillars clearly and concisely: (1) Current local situation, (2) Practical family action today, and (3) Measurable health/exposure or estimated emission impact.
3. Explicitly distinguish estimated personal carbon emission savings from direct personal exposure reduction; never claim one family's action immediately changes city-wide AQI.
4. Keep responses warm, scannable with bullet points, and under 180 words.`;

  try {
    const proxyUrl = import.meta.env.VITE_API_PROXY_URL || '';
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    const payload = {
      systemInstruction: { parts: [{ text: systemContext }] },
      contents: history.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.text }],
      })),
    };

    let response;
    if (proxyUrl) {
      response = await fetch(proxyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else if (apiKey && apiKey !== 'your_gemini_api_key_here') {
      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(
          apiKey
        )}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
    } else {
      throw new Error('Using local intelligent fallback');
    }

    if (!response.ok) throw new Error('API request failed');
    const data = await response.json();
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'I recommend keeping outdoor activity inside during peak hours and using public transit today.'
    );
  } catch {
    return buildFallbackChatReply({ city, familyProfile, lang });
  }
}
