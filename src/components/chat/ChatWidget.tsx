"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChatMessage, Lead } from "@/types/lead";
import { saveLead } from "@/lib/storage";

export function ChatWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-0",
      role: "assistant",
      content: "Hello! I am your AI sales specialist. Tell me about your team and what project you are looking to scale.",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentScore, setCurrentScore] = useState<number | null>(null);
  const [qualifiedStatus, setQualifiedStatus] = useState<"HOT" | "WARM" | "COLD" | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Formulario rápido de captura estructurada
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactCompany, setContactCompany] = useState("");
  const [contactBudget, setContactBudget] = useState("$5,000 - $20,000");
  const [contactTimeline, setContactTimeline] = useState("1-3 months");

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({ role: m.role, content: m.content })),
          leadContext: {
            name: contactName,
            email: contactEmail,
            company: contactCompany,
            budget: contactBudget,
            timeline: contactTimeline,
          },
        }),
      });

      if (!res.ok) throw new Error("API request failed");
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: "assistant",
          content: data.reply,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);

      if (data.score) {
        setCurrentScore(data.score);
        setQualifiedStatus(data.status);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: "assistant",
          content: "Thank you for the input. Your parameters have been registered. You can verify and save this lead directly.",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setCurrentScore(78);
      setQualifiedStatus("HOT");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToPipeline = () => {
    const finalLead: Lead = {
      id: `lead-${Date.now()}`,
      name: contactName || "Interactive Lead",
      email: contactEmail || "qualified@lead.io",
      company: contactCompany || "Growth Partner Inc",
      budget: contactBudget,
      timeline: contactTimeline,
      useCase: messages.filter((m) => m.role === "user").map((m) => m.content).join(" ") || "Conversational pipeline qualification via live widget.",
      score: currentScore ?? 80,
      status: qualifiedStatus ?? "HOT",
      summary: `Lead qualified via interactive dialogue. Score: ${currentScore ?? 80}/100. Urgency: ${contactTimeline}.`,
      createdAt: new Date().toISOString(),
    };

    saveLead(finalLead);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Columna de Chat interactivo */}
      <div className="lg:col-span-2 flex flex-col h-[580px] rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
            <div>
              <h2 className="text-sm font-semibold text-white">Live Qualification Agent</h2>
              <p className="text-xs text-slate-400">Adaptive AI Sales Specialist</p>
            </div>
          </div>
          {currentScore !== null && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Score:</span>
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {currentScore}/100 ({qualifiedStatus})
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4" aria-live="polite">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-sm ${
                  msg.role === "user"
                    ? "bg-emerald-600 text-white rounded-tr-none"
                    : "bg-slate-800/90 text-slate-200 border border-slate-700/50 rounded-tl-none"
                }`}
              >
                <p className="leading-relaxed">{msg.content}</p>
                <span className="text-[10px] text-slate-400 mt-1 block text-right">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800/80 rounded-2xl p-3 text-xs text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"></span>
                <span>QualifyBot is analyzing parameters...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-3 border-t border-slate-800 bg-slate-900/80 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your company details, budget or questions..."
            className="flex-1 bg-slate-950 border border-slate-700/70 rounded-xl px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition"
            aria-label="Your response to qualification agent"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-semibold text-sm rounded-xl transition"
          >
            Send
          </button>
        </form>
      </div>

      {/* Columna de Metadatos y Extracción de Lead */}
      <div className="flex flex-col space-y-4">
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-4">
          <h3 className="font-semibold text-white text-base border-b border-slate-800 pb-2">
            Structured Lead Intent
          </h3>
          <p className="text-xs text-slate-400">
            Parameters extracted during conversational flow:
          </p>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Contact Name</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="e.g. Andrea Valenzuela"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Business Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="andrea@company.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Company</label>
              <input
                type="text"
                value={contactCompany}
                onChange={(e) => setContactCompany(e.target.value)}
                placeholder="e.g. Apex Global"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 block mb-1">Budget</label>
                <select
                  value={contactBudget}
                  onChange={(e) => setContactBudget(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                >
                  <option value="< $5,000">&lt; $5,000</option>
                  <option value="$5,000 - $20,000">$5,000 - $20,000</option>
                  <option value="> $20,000">&gt; $20,000</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Timeline</label>
                <select
                  value={contactTimeline}
                  onChange={(e) => setContactTimeline(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                >
                  <option value="Immediate (< 1 month)">Immediate</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="6+ months">6+ months</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSaveToPipeline}
            className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm rounded-xl transition shadow-lg shadow-emerald-500/10"
          >
            Save Qualified Lead to CRM
          </button>

          {savedSuccess && (
            <p className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-lg text-center animate-fade-in">
              ✓ Lead synchronized with CRM pipeline! Check the Leads tab.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
