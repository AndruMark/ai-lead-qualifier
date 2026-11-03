import { describe, it, expect } from "vitest";
import { calculateLeadScore } from "./leadScorer";

describe("calculateLeadScore", () => {
  it("classifies high budget and immediate timeline as HOT lead", () => {
    const result = calculateLeadScore({
      budgetStr: "> $20,000",
      timelineStr: "Immediate (< 1 month)",
      useCaseStr: "Enterprise multi-tenant automated customer service routing engine.",
    });

    expect(result.score).toBeGreaterThanOrEqual(75);
    expect(result.status).toBe("HOT");
  });

  it("classifies mid budget and 1-3 months timeline as WARM lead", () => {
    const result = calculateLeadScore({
      budgetStr: "$5,000 - $20,000",
      timelineStr: "1-3 months",
      useCaseStr: "Standard agency onboarding workflow.",
    });

    expect(result.score).toBeGreaterThanOrEqual(50);
    expect(result.score).toBeLessThan(75);
    expect(result.status).toBe("WARM");
  });

  it("classifies small budget and distant timeline as COLD lead", () => {
    const result = calculateLeadScore({
      budgetStr: "< $1,000",
      timelineStr: "6+ months",
      useCaseStr: "Exploration",
    });

    expect(result.score).toBeLessThan(50);
    expect(result.status).toBe("COLD");
  });
});
