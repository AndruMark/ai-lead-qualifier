"use client";

import { useState } from "react";
import { Check, Code2, ExternalLink, Settings2 } from "lucide-react";
import { SettingsForm } from "@/components/settings/SettingsForm";
import { WidgetPreview } from "@/components/settings/WidgetPreview";
import {
  defaultWidgetSettings,
  type WidgetSettings,
} from "@/types/settings";

export default function HomePage() {
  const [settings, setSettings] = useState<WidgetSettings>(defaultWidgetSettings);
  const [saveMessage, setSaveMessage] = useState("Unsaved changes");

  const handleChange = (nextSettings: WidgetSettings) => {
    setSettings(nextSettings);
    setSaveMessage("Unsaved changes");
  };

  const handleSave = (nextSettings: WidgetSettings) => {
    setSettings(nextSettings);
    setSaveMessage("Settings saved successfully");
  };

  return (
    <main className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a className="flex items-center gap-2.5 text-sm font-bold tracking-tight text-ink" href="/">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white">
              <Code2 size={17} aria-hidden="true" />
            </span>
            Lead<span className="text-accent">flow</span>
          </a>
          <a className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" href="#preview">
            View documentation <ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-10 flex items-start gap-4">
          <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-accent">
            <Settings2 size={22} aria-hidden="true" />
          </div>
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-accent">Configuration</p>
            <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Widget settings</h1>
            <p className="mt-2 max-w-2xl text-base leading-7 text-muted">
              Configure how your AI assistant introduces itself and qualifies new leads.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
          <section className="rounded-2xl bg-white p-6 shadow-panel sm:p-8" aria-labelledby="settings-heading">
            <div className="mb-8 flex items-center justify-between border-b border-slate-100 pb-5">
              <h2 className="text-lg font-bold text-ink" id="settings-heading">Lead configuration</h2>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Active
              </div>
            </div>
            <SettingsForm settings={settings} onChange={handleChange} onSave={handleSave} />
          </section>

          <div id="preview">
            <WidgetPreview settings={settings} />
            <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-muted">
              <span className="flex items-center gap-2">
                <Check size={14} className="text-emerald-500" aria-hidden="true" />
                Preview updates in real time
              </span>
              <span>v1.0</span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex min-h-6 justify-end" role="status" aria-live="polite">
          <p className={saveMessage === "Settings saved successfully" ? "flex items-center gap-1.5 text-sm font-medium text-emerald-700" : "text-sm text-slate-400"}>
            {saveMessage === "Settings saved successfully" && <Check size={15} aria-hidden="true" />}
            {saveMessage}
          </p>
        </div>
      </div>
    </main>
  );
}
