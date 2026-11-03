import { z } from "zod";

export const LeadStatusSchema = z.enum(["HOT", "WARM", "COLD"]);
export type LeadStatus = z.infer<typeof LeadStatusSchema>;

export const LeadIntentSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  company: z.string().min(1, "Company name is required"),
  budget: z.string().min(1, "Budget is required"),
  timeline: z.string().min(1, "Timeline is required"),
  useCase: z.string().min(10, "Please describe the use case in more detail"),
  score: z.number().min(0).max(100),
  status: LeadStatusSchema,
  summary: z.string(),
  createdAt: z.string(),
});

export type Lead = z.infer<typeof LeadIntentSchema>;

export interface ChatMessage {
  id: string;
  role: "assistant" | "user" | "system";
  content: string;
  timestamp: string;
}

export interface WidgetSettings {
  botName: string;
  tone: "consultative" | "casual" | "formal";
  minBudget: number;
  primaryColor: string;
  welcomeMessage: string;
}
