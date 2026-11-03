"use client";

import { FormEvent, useState } from "react";

type Settings = {
  businessName: string;
  welcomeMessage: string;
  goal: string;
  tone: string;
  accent: string;
  collectEmail: boolean;
  collectPhone: boolean;
};

type Errors = Partial<Record<keyof Settings, string>>;

const initialSettings: Settings = {
  businessName: "Acme Studio",
  welcomeMessage:
    "Hi there! I’m here to help you find the right solution. What can we help you with today?",
  goal: "Book a demo",
  tone: "Friendly and professional",
  accent: "#6d5dfc",
  collectEmail: true,
  collectPhone: false,
};

const goalOptions = ["Book a demo", "Request a quote", "Qualify a lead", "Answer questions"];
const toneOptions = ["Friendly and professional", "Warm and casual", "Concise and direct"];

function validate(settings: Settings): Errors {
  const errors: Errors = {};
  if (!settings.businessName.trim()) errors.businessName = "Enter your business name.";
  if (settings.businessName.trim().length > 60)
    errors.businessName = "Keep your business name under 60 characters.";
  if (!settings.welcomeMessage.trim()) errors.welcomeMessage = "Add a welcome message.";
  if (settings.welcomeMessage.trim().length < 20)
    errors.welcomeMessage = "Use at least 20 characters so visitors know what to expect.";
  if (settings.welcomeMessage.length > 240)
    errors.welcomeMessage = "Keep your welcome message under 240 characters.";
  return errors;
}

export default function Home() {
  const [settings, setSettings] = useState(initialSettings);
  const [errors, setErrors] = useState<Errors>({});
  const [saved, setSaved] = useState(false);

  function update<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSaved(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(settings);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSaved(true);
  }

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">L</div>
          <span>LeadFlow</span>
        </div>
        <nav aria-label="Primary navigation">
          <a href="#overview" className="nav-item">
            <span aria-hidden="true">⌂</span> Overview
          </a>
          <a href="#settings" className="nav-item active">
            <span aria-hidden="true">⚙</span> Widget settings
          </a>
          <a href="#leads" className="nav-item">
            <span aria-hidden="true">♧</span> Leads
          </a>
          <a href="#integrations" className="nav-item">
            <span aria-hidden="true">↗</span> Integrations
          </a>
        </nav>
        <div className="sidebar-footer">
          <div className="avatar">AS</div>
          <div>
            <strong>Acme Studio</strong>
            <span>Free plan</span>
          </div>
          <button className="icon-button" aria-label="Open account menu">•••</button>
        </div>
      </aside>

      <section className="content" id="settings">
        <header className="page-header">
          <div>
            <p className="eyebrow">Workspace / Widget</p>
            <h1>Widget settings</h1>
            <p className="subtitle">Customize how your AI assistant welcomes and qualifies new leads.</p>
          </div>
          <div className="status-pill"><span /> Widget is live</div>
        </header>

        <div className="workspace-grid">
          <form className="settings-card" onSubmit={handleSubmit} noValidate>
            <section className="form-section">
              <div className="section-heading">
                <div>
                  <h2>General</h2>
                  <p>Set the basics visitors will see in your widget.</p>
                </div>
              </div>
              <label className="field">
                <span>Business name <b>*</b></span>
                <input
                  value={settings.businessName}
                  onChange={(event) => update("businessName", event.target.value)}
                  aria-invalid={Boolean(errors.businessName)}
                  aria-describedby={errors.businessName ? "business-name-error" : undefined}
                />
                {errors.businessName && <small id="business-name-error" className="error">{errors.businessName}</small>}
              </label>
              <label className="field">
                <span>Welcome message <b>*</b></span>
                <textarea
                  rows={4}
                  value={settings.welcomeMessage}
                  onChange={(event) => update("welcomeMessage", event.target.value)}
                  aria-invalid={Boolean(errors.welcomeMessage)}
                  aria-describedby={errors.welcomeMessage ? "welcome-message-error" : "welcome-message-help"}
                />
                <small id={errors.welcomeMessage ? "welcome-message-error" : "welcome-message-help"} className={errors.welcomeMessage ? "error" : "hint"}>
                  {errors.welcomeMessage ?? `${settings.welcomeMessage.length}/240 characters`}
                </small>
              </label>
            </section>

            <section className="form-section">
              <div className="section-heading">
                <div>
                  <h2>Lead qualification</h2>
                  <p>Help the assistant focus every conversation on your goals.</p>
                </div>
              </div>
              <label className="field">
                <span>Primary goal</span>
                <select value={settings.goal} onChange={(event) => update("goal", event.target.value)}>
                  {goalOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
              <label className="field">
                <span>Assistant tone</span>
                <select value={settings.tone} onChange={(event) => update("tone", event.target.value)}>
                  {toneOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
              <div className="toggle-list">
                <Toggle label="Collect email address" description="Ask for an email before ending the conversation." checked={settings.collectEmail} onChange={(value) => update("collectEmail", value)} />
                <Toggle label="Collect phone number" description="Give qualified leads another way to reach you." checked={settings.collectPhone} onChange={(value) => update("collectPhone", value)} />
              </div>
            </section>

            <section className="form-section appearance-section">
              <div className="section-heading">
                <div>
                  <h2>Appearance</h2>
                  <p>Match the widget to your brand.</p>
                </div>
              </div>
              <label className="color-field">
                <span>Accent color</span>
                <input type="color" value={settings.accent} onChange={(event) => update("accent", event.target.value)} />
                <code>{settings.accent}</code>
              </label>
            </section>

            <div className="form-actions">
              {saved && <span className="saved-message" role="status">✓ Changes saved</span>}
              <button type="submit" className="save-button">Save changes</button>
            </div>
          </form>

          <aside className="preview-panel">
            <div className="preview-heading">
              <div><h2>Live preview</h2><p>See how your widget looks to visitors.</p></div>
              <span className="preview-dot" />
            </div>
            <div className="widget-preview">
              <div className="widget-topbar"><div className="mini-logo" style={{ backgroundColor: settings.accent }}>L</div><div><strong>{settings.businessName || "Your business"}</strong><span>Typically replies instantly</span></div><b>×</b></div>
              <div className="chat-body">
                <div className="date-label">TODAY</div>
                <div className="message-bubble">{settings.welcomeMessage || "Your welcome message will appear here."}</div>
                <div className="message-time">Just now</div>
              </div>
              <div className="chat-input">Type your message... <span>↑</span></div>
            </div>
            <p className="preview-note">This preview is only visible to you. Changes apply instantly after saving.</p>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Toggle({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="toggle-row">
      <span><strong>{label}</strong><small>{description}</small></span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span className="toggle" aria-hidden="true" />
    </label>
  );
}
