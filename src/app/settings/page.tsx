"use client";

import React, { useState, useEffect } from "react";
import { z } from "zod";
import { getStoredSettings, saveSettings } from "@/lib/storage";

const SettingsFormSchema = z.object({
  botName: z.string().min(2, "Bot name must be at least 2 characters"),
  tone: z.enum(["consultative", "casual", "formal"]),
  minBudget: z.number().min(500, "Minimum qualifying budget must be at least $500"),
  primaryColor: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Invalid hex color code"),
  welcomeMessage: z.string().min(10, "Welcome greeting must be at least 10 characters"),
});

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    botName: "QualifyBot AI",
    tone: "consultative" as "consultative" | "casual" | "formal",
    minBudget: 5000,
    primaryColor: "#10b981",
    welcomeMessage: "Hello! I am your AI sales specialist. Let us explore your requirements.",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFormData(getStoredSettings());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = SettingsFormSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) fieldErrors[issue.path[0].toString()] = issue.message;
      });
      setErrors(fieldErrors);
      setSaved(false);
      return;
    }

    setErrors({});
    saveSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  return (
    <div className="py-6 max-w-2xl mx-auto space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white">Agent & Widget Configuration</h1>
        <p className="text-sm text-slate-400">
          Tailor AI agent tone, qualification thresholds, and conversational branding.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-5">
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Agent Name</label>
          <input
            type="text"
            value={formData.botName}
            onChange={(e) => setFormData({ ...formData, botName: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
          />
          {errors.botName && <p className="text-xs text-rose-400 mt-1">{errors.botName}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Conversational Tone</label>
            <select
              value={formData.tone}
              onChange={(e) => setFormData({ ...formData, tone: e.target.value as "consultative" | "casual" | "formal" })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="consultative">Consultative (Default)</option>
              <option value="casual">Casual & Direct</option>
              <option value="formal">Enterprise Formal</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Min. Qualification Budget ($)</label>
            <input
              type="number"
              value={formData.minBudget}
              onChange={(e) => setFormData({ ...formData, minBudget: Number(e.target.value) })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
            {errors.minBudget && <p className="text-xs text-rose-400 mt-1">{errors.minBudget}</p>}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Primary Brand Accent (Hex)</label>
          <input
            type="text"
            value={formData.primaryColor}
            onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
          />
          {errors.primaryColor && <p className="text-xs text-rose-400 mt-1">{errors.primaryColor}</p>}
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">Initial Greeting Message</label>
          <textarea
            rows={3}
            value={formData.welcomeMessage}
            onChange={(e) => setFormData({ ...formData, welcomeMessage: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
          />
          {errors.welcomeMessage && <p className="text-xs text-rose-400 mt-1">{errors.welcomeMessage}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm rounded-xl transition"
        >
          Save Agent Preferences
        </button>

        {saved && (
          <p className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-lg text-center">
            ✓ Preferences saved and validated with Zod schema!
          </p>
        )}
      </form>
    </div>
  );
}
