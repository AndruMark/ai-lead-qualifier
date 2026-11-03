import { LeadStatus } from "../types/lead";

interface ScoreInput {
  budgetStr: string;
  timelineStr: string;
  useCaseStr: string;
}

export function calculateLeadScore({
  budgetStr,
  timelineStr,
  useCaseStr,
}: ScoreInput): { score: number; status: LeadStatus } {
  let score = 25; // Base score calibrada para umbrales: Cold (<50), Warm (50-74), Hot (>=75)

  // 1. Evaluación presupuestaria
  const b = budgetStr.toLowerCase();
  if (b.includes("50k") || b.includes("100k") || b.includes("> $20,000") || b.includes("enterprise")) {
    score += 35;
  } else if (b.includes("10k") || b.includes("20k") || b.includes("$5,000 - $20,000")) {
    score += 25;
  } else if (b.includes("5k") || b.includes("$1,000 - $5,000")) {
    score += 15;
  } else {
    score += 5;
  }

  // 2. Evaluación de urgencia/timeline
  const t = timelineStr.toLowerCase();
  if (t.includes("immediate") || t.includes("asap") || t.includes("this month") || t.includes("< 1 month")) {
    score += 25;
  } else if (t.includes("1-3 months") || t.includes("quarter")) {
    score += 15;
  } else {
    score += 5;
  }

  // 3. Claridad de caso de uso
  if (useCaseStr.length > 50) {
    score += 10;
  } else if (useCaseStr.length > 20) {
    score += 5;
  }

  score = Math.min(100, Math.max(0, score));

  let status: LeadStatus = "COLD";
  if (score >= 75) {
    status = "HOT";
  } else if (score >= 50) {
    status = "WARM";
  }

  return { score, status };
}
