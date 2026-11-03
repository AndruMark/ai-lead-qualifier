import { z } from "zod";
import {
  assistantTones,
  primaryGoals,
  type WidgetSettings,
} from "@/types/settings";

export const widgetSettingsSchema = z.object({
  businessName: z
    .string()
    .trim()
    .min(2, "Business name must be at least 2 characters.")
    .max(60, "Business name must be 60 characters or fewer."),
  welcomeMessage: z
    .string()
    .trim()
    .min(20, "Welcome message must be at least 20 characters.")
    .max(240, "Welcome message must be 240 characters or fewer."),
  primaryGoal: z.enum(primaryGoals),
  assistantTone: z.enum(assistantTones),
  collectEmail: z.boolean().default(true),
  collectPhone: z.boolean().default(false),
  accentColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Enter a valid six-digit hex color."),
});

export type WidgetSettingsInput = z.input<typeof widgetSettingsSchema>;
export type WidgetSettingsFormErrors = Partial<
  Record<keyof WidgetSettings, string>
>;

export function getSettingsErrors(
  result: ReturnType<typeof widgetSettingsSchema.safeParse>,
): WidgetSettingsFormErrors {
  if (result.success) {
    return {};
  }

  return result.error.issues.reduce<WidgetSettingsFormErrors>((errors, issue) => {
    const field = issue.path[0];
    if (typeof field === "string" && !errors[field as keyof WidgetSettings]) {
      errors[field as keyof WidgetSettings] = issue.message;
    }
    return errors;
  }, {});
}

export function parseWidgetSettings(
  settings: WidgetSettingsInput,
): WidgetSettings {
  return widgetSettingsSchema.parse(settings);
}
