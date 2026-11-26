import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw, Send } from 'lucide-react';
import { sanitizeUserPrompt } from '../utils/airQualityEngine';
import { generateAssistantReply } from '../services/geminiChatService';

const RATE_LIMIT_MS = 1200;

export default function AssistantTab({ city, familyProfile, lang, copy }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Namaste! I'm your ClearAir AI Family Companion. I've tailored today's plan for your household in Hyderabad (Illustrative AQI 185). Ask me anything in English, తెలుగు, or हिंदी about outdoor timing, commutes, or keeping indoor air clean!",
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const lastRequestTimeRef = useRef(0);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView?.({ behavior: 'auto' });
  }, [messages.length]);

  const handleSendMessage = async (overridePrompt) => {
    const cleanPrompt = sanitizeUserPrompt(overridePrompt ?? chatInput, 400);
    if (!cleanPrompt || isGenerating) return;

    const now = Date.now();
    if (now - lastRequestTimeRef.current < RATE_LIMIT_MS) return;
    lastRequestTimeRef.current = now;

    const updatedHistory = [...messages.slice(-8), { role: 'user', text: cleanPrompt }];
    setMessages((prev) => [...prev, { role: 'user', text: cleanPrompt }]);
    setChatInput('');
    setIsGenerating(true);

    try {
      const reply = await generateAssistantReply({
        history: updatedHistory,
        city,
        familyProfile,
        lang,
      });
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div id="panel-assistant" role="tabpanel" aria-labelledby="tab-assistant" className="space-y-4 animate-fadeIn">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-slate-900">ClearAir GenAI Family Assistant</h2>
          <p className="text-xs text-slate-600">
            Context-aware answers in English, Telugu (తెలుగు), and Hindi (हिंदी) using your local AQI and family profile.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            setMessages([
              {
                role: 'assistant',
                text: `Context refreshed for ${city.name} (Illustrative AQI ${city.aqi}). How can I help your family today?`,
              },
            ])
          }
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50"
        >
          <RefreshCw aria-hidden="true" className="w-3.5 h-3.5" />
          Reset Chat
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {copy.quickPrompts.map((qp) => (
          <button
            key={qp}
            type="button"
            onClick={() => handleSendMessage(qp)}
            className="text-xs font-medium px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 transition text-left"
          >
            {qp}
          </button>
        ))}
      </div>

      <div
        role="log"
        aria-live="polite"
        aria-label="Conversation history"
        className="h-80 overflow-y-auto rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-3"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                msg.role === 'user'
                  ? 'bg-emerald-700 text-white rounded-br-sm'
                  : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-bl-sm'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isGenerating && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
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
        <label htmlFor="chat-prompt-input" className="sr-only">
          Ask ClearAir AI a question
        </label>
        <input
          id="chat-prompt-input"
          type="text"
          maxLength={400}
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder={copy.chatPlaceholder}
          className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
        />
        <button
          type="submit"
          disabled={isGenerating || !chatInput.trim()}
          className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-sm transition shadow-sm"
        >
          <Send aria-hidden="true" className="w-4 h-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
}
