import { describe, expect, it } from "vitest";
import { getSettingsErrors, widgetSettingsSchema } from "@/lib/validation";

describe("widget settings validation", () => {
  it("reports validation errors when required fields are empty", () => {
    const result = widgetSettingsSchema.safeParse({
      businessName: "",
      welcomeMessage: "",
      primaryGoal: "Book a demo",
      assistantTone: "Friendly and professional",
      collectEmail: true,
      collectPhone: false,
      accentColor: "#665CF6",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = getSettingsErrors(result);
      expect(errors.businessName).toContain("at least 2");
      expect(errors.welcomeMessage).toContain("at least 20");
    }
  });

  it("rejects welcome messages shorter than 20 characters", () => {
    const result = widgetSettingsSchema.safeParse({
      businessName: "Acme",
      welcomeMessage: "Welcome, friend!",
      primaryGoal: "Qualify a lead",
      assistantTone: "Warm and casual",
      collectEmail: true,
      collectPhone: false,
      accentColor: "#123ABC",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toContainEqual(
        expect.objectContaining({ path: ["welcomeMessage"] }),
      );
    }
  });

  it("accepts valid settings cleanly", () => {
    const result = widgetSettingsSchema.safeParse({
      businessName: "Acme Studio",
      welcomeMessage: "Hi there! How can we help your business today?",
      primaryGoal: "Book a demo",
      assistantTone: "Friendly and professional",
      collectEmail: true,
      collectPhone: false,
      accentColor: "#665CF6",
    });

    expect(result.success).toBe(true);
    expect(result.data).toMatchObject({
      businessName: "Acme Studio",
      collectEmail: true,
    });
  });
});
