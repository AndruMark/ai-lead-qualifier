export const primaryGoals = [
  "Book a demo",
  "Request a quote",
  "Qualify a lead",
  "Answer questions",
] as const;

export const assistantTones = [
  "Friendly and professional",
  "Warm and casual",
  "Concise and direct",
] as const;

export type PrimaryGoal = (typeof primaryGoals)[number];
export type AssistantTone = (typeof assistantTones)[number];

export interface WidgetSettings {
  businessName: string;
  welcomeMessage: string;
  primaryGoal: PrimaryGoal;
  assistantTone: AssistantTone;
  collectEmail: boolean;
  collectPhone: boolean;
  accentColor: string;
}

export const defaultWidgetSettings: WidgetSettings = {
  businessName: "Acme Studio",
  welcomeMessage:
    "Hi there! I’m here to help you find the right solution for your business.",
  primaryGoal: "Book a demo",
  assistantTone: "Friendly and professional",
  collectEmail: true,
  collectPhone: false,
  accentColor: "#665CF6",
};
