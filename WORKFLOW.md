# AI-Assisted Workflow Drill: Comparative Analysis (FE-03)

- **Track**: Frontend AI Engineering
- **Branches Compared**: `workflow-vague` vs. `workflow-precise`
- **Scope**: Widget Settings & Lead Configuration Feature

---

## 1. Architectural Decomposition & Code Organization
The `git diff workflow-vague..workflow-precise --stat` highlights a fundamental structural refactor:
- **Round 1 (`workflow-vague`)**: Generated a single 212-line monolithic `app/page.tsx` combining state management, form rendering, ad-hoc string validation, custom CSS layout, and widget preview. It also introduced 26 lines of arbitrary global classes in `app/globals.css`.
- **Round 2 (`workflow-precise`)**: Decomposed the architecture into maintainable domain layers under `src/`:
  - `src/types/settings.ts` (36 lines): Strict union types (`PrimaryGoal`, `AssistantTone`) and configuration contracts.
  - `src/lib/validation.ts` (53 lines): Declarative, reusable Zod validation schema (`widgetSettingsSchema`).
  - `src/components/settings/SettingsForm.tsx` (263 lines) and `WidgetPreview.tsx` (71 lines): Decoupled presentation and form logic.
  - `src/app/page.tsx` was reduced to an 89-line lightweight state coordinator.

---

## 2. Correctness, Validation & Edge Cases
Round 1 relied on primitive `if/else` string checks (`validate(settings)`) returning loose error records. It accepted arbitrary strings for select dropdowns and allowed invalid hex color codes without sanitation. 

In Round 2, Zod guarantees runtime type safety with strict boundaries:
- Business name enforced between 2 and 60 characters.
- Welcome message constrained between 20 and 240 characters.
- Accent color validated against a strict hex regex (`^#[0-9A-Fa-f]{6}$`).

---

## 3. Accessibility (WCAG 2.1 AA) & AI Mistakes Caught
A critical mistake caught during the review of Round 1 was its pseudo-accessible form markup:
1. Inputs were implicitly wrapped inside generic `<label>` tags without explicit `htmlFor` and `id` bindings, causing unreliable focus behavior across screen readers.
2. The toggle component used an unlabelled checkbox with `opacity: 0` and lacked visible keyboard focus indicators.
3. The save confirmation text (`<span role="status">`) was mounted conditionally only after clicking save, violating ARIA live-region standards where the container must exist in the DOM prior to content updates.

Round 2 resolved all three defects: explicit `htmlFor`/`id` pairs were bound across every field (including a dedicated `<label className="sr-only" htmlFor="accentColorValue">`), grouped toggles were wrapped in semantic `<fieldset>` and `<legend>` blocks, and a persistent live region `<div role="status" aria-live="polite">` was implemented.

---

## 4. Verification & Review Effort
- **Round 1**: Copilot performed an ephemeral in-memory Playwright smoke check during generation, but left **zero test files** in the repository. Verifying correctness required manual manual code inspection and manual browser debugging (~15 minutes of review effort).
- **Round 2**: Integrated Vitest and React Testing Library (`tests/settings.test.ts`, 60 lines). Three automated regression tests verify empty field rejection, boundary constraints, and clean payload acceptance. Running `npm test` and `npm run build` automated the entire review cycle in seconds.

While Round 2 required 3 extra minutes to formulate the prompt, it eliminated post-generation refactoring entirely.
