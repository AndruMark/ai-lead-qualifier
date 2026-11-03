import { Lead, WidgetSettings } from "../types/lead";

const LEADS_STORAGE_KEY = "ai_lead_qualifier_records";
const SETTINGS_STORAGE_KEY = "ai_lead_qualifier_settings";

const INITIAL_DEMO_LEADS: Lead[] = [
  {
    id: "lead-1",
    name: "Carolina Herrera",
    email: "carolina@enterprisecloud.io",
    company: "Enterprise Cloud Solutions",
    budget: "> $20,000 / mo",
    timeline: "Immediate (< 1 month)",
    useCase: "Automate inbound pipeline qualification across 15 enterprise landing pages.",
    score: 95,
    status: "HOT",
    summary: "High-value enterprise target needing immediate deployment. Immediate demo requested.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "lead-2",
    name: "Martín Benítez",
    email: "martin@innovate-agency.co",
    company: "Innovate Digital Agency",
    budget: "$5,000 - $20,000 / mo",
    timeline: "1-3 months",
    useCase: "White-label conversational qualification for 10 regional eCommerce clients.",
    score: 72,
    status: "WARM",
    summary: "Solid agency partnership opportunity. Exploring technical documentation and API capabilities.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "lead-3",
    name: "Lucía Rossi",
    email: "lucia@earlystartup.dev",
    company: "EarlyDev Studio",
    budget: "< $1,000 / mo",
    timeline: "6+ months",
    useCase: "Student dev experimenting with lead capture ideas.",
    score: 35,
    status: "COLD",
    summary: "Low budget, indefinite timeline. Route to free community tier or self-serve docs.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
];

export const DEFAULT_SETTINGS: WidgetSettings = {
  botName: "QualifyBot AI",
  tone: "consultative",
  minBudget: 5000,
  primaryColor: "#10b981",
  welcomeMessage: "Hello! I am your AI sales specialist. Let's find out how we can best support your team.",
};

export function getStoredLeads(): Lead[] {
  if (typeof window === "undefined") return INITIAL_DEMO_LEADS;
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_LEADS));
      return INITIAL_DEMO_LEADS;
    }
    return JSON.parse(raw) as Lead[];
  } catch {
    return INITIAL_DEMO_LEADS;
  }
}

export function saveLead(lead: Lead): void {
  if (typeof window === "undefined") return;
  try {
    const current = getStoredLeads();
    const updated = [lead, ...current.filter((l) => l.id !== lead.id)];
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to save lead:", err);
  }
}

export function getStoredSettings(): WidgetSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as WidgetSettings) : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: WidgetSettings): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error("Failed to save settings:", err);
  }
}
