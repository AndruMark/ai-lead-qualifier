# AI-Powered Lead Qualification Widget (Capstone Production Deliverable)

An enterprise-ready, accessible conversational agent and lead qualification system built with Next.js 15, TypeScript, Tailwind CSS, and Zod. Developed as the final Capstone project for the FlyRank Frontend AI Engineering track ("Ship It—Your First Production AI Product").

- **Live Production URL:** https://ai-lead-qualifier-fawn.vercel.app
- **Repository:** https://github.com/AndruMark/ai-lead-qualifier

---

## 1. Project Brief
- **Problem Solved:** High-traffic landing pages lose high-intent inbound leads due to static, generic web forms. Conversely, sales engineering teams spend significant manual hours qualifying prospects whose budget, urgency, or use case do not align with enterprise offerings.
- **Who It Is For:** B2B SaaS companies, sales engineering units, and marketing operators requiring real-time conversational qualification, intent extraction, and automated lead scoring.
- **Why This Idea:** Bridging conversational AI with structured transactional systems turns open-ended prospect inquiries into validated, CRM-ready records without requiring manual data entry.

---

## 2. Live Deployed Application & Architecture
- **Tech Stack:** Next.js 15 (App Router), React 19, TypeScript (~5.7.2), Tailwind CSS, Zod, Vitest.
- **Application Views:**
  - `/`: Architectural landing dashboard presenting core system capabilities.
  - `/widget`: Live interactive qualification agent featuring streaming dialogues, parameter extraction, and lead score indicators.
  - `/leads`: CRM pipeline view with score filtering (`HOT`, `WARM`, `COLD`), lead inspection modals, and CSV export.
  - `/settings`: Agent customization form validated with strict Zod schemas (tone, qualification budget, hex branding).
  - `/health`: Production server diagnostic page querying `/api/health` for uptime and runtime metadata.
  - `/playground`: W3C ARIA accessible component testbed (Modal, Tabs, Disclosure with focus trapping).

---

## 3. AI Integration Explained
- **Pattern:** Adaptive conversational qualification with heuristic intent extraction.
- **Prompt Strategy:** The agent assesses three key sales qualification vectors:
  1. *Budget Allocation* (detecting Enterprise, Mid-tier, or Self-serve signals).
  2. *Timeline Urgency* (identifying immediate vs. exploratory purchase horizons).
  3. *Use Case Scope* (evaluating architectural alignment with product capability).
- **Graceful Fallback:** When external AI gateway keys are not provided in environment variables, the system activates a deterministic conversational state machine, allowing reviewers to test live qualification streaming without external API key setup.

---

## 4. Testing Evidence
The application includes automated unit testing covering core qualification heuristics and edge cases via **Vitest**:

```bash
npx vitest run
Coverage: Tested lead categorization logic across HOT, WARM, and COLD classification boundaries, score caps (0–100), and short-text edge cases in src/lib/leadScorer.test.ts.

5. Performance & Accessibility Audit
Lighthouse Scores:

Performance: 98 / 100

Accessibility: 100 / 100

Best Practices: 100 / 100

SEO: 100 / 100

Accessibility Standard: Complies with WCAG 2.1 AA:

Live chat region uses aria-live="polite" for non-disruptive screen reader announcements.

Modals implement strict focus containment, background scroll suppression, and Escape key dismissal.

Accessible interactive contrast ratios (minimum 4.5:1 against dark surfaces).

Concrete Improvement Made: Replaced unlabelled icon buttons with explicit aria-label="Close dialog" and added suppressHydrationWarning on timestamp renderings to prevent DOM hydration mismatches across server and client clocks.

6. Deployment & Operation (Checklist)
[x] Zero secrets or sensitive API credentials committed in Git.

[x] Continuous preview and production deployments connected to Vercel via main.

[x] Dynamic server resolution for production internal fetches via VERCEL_URL.

[x] Error boundaries and offline mock fallbacks for all data queries.

Rollback Strategy: Vercel Instant Rollback enables instantaneous one-click redirection to any prior deployment hash in case of upstream regressions.

7. Reflection
What Was Hardest: Reconciling asynchronous server-side data fetching with client-side state hydration in Next.js 15, especially handling dynamic internal API route resolution without triggering unhandled promise rejections.

What to Do Differently: Decouple chat state into a persistent indexedDB database rather than localStorage to preserve multi-session dialogue history across browser tab closures.

Key Surprise: How much cleaner and more maintainable frontend code becomes when validation schemas (Zod) are treated as the single source of truth across forms, API contracts, and internal business logic.

Local Setup & Quickstart
Bash
git clone https://github.com/AndruMark/ai-lead-qualifier.git
cd ai-lead-qualifier
npm install
npx vitest run
npm run build
npm run dev
