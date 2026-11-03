# CLAUDE.md - Development & AI Agent Conventions

This document guides AI coding assistants working in this repository.

## 1. Project Context
- **Project**: AI-Powered Lead Qualification Widget
- **Scope**: Frontend AI Engineering Capstone (FlyRank Track)
- **Primary Goals**: High responsiveness, accessible conversational interfaces, streaming tokens, minimal bundle size.

## 2. Core Stack & Architecture
- **Framework**: Next.js (App Router), TypeScript (Strict Mode).
- **Styling**: Tailwind CSS (Utility-first, responsive, accessible contrast).
- **State & Streaming**: React Hooks, Server Actions, Vercel AI SDK (`useChat` / `streamText`).
- **Validation & Testing**: Zod schemas, Vitest, React Testing Library.
- **Package Manager**: npm or pnpm.

## 3. Mandatory Engineering Rules (Learned from FE-03 Drill)
1. **Schema-First Validation**: All form inputs, mutation payloads, and API requests must be validated using declarative Zod schemas (`safeParse`), deriving TypeScript types via `z.infer`. Never use manual `if/else` checks or unvalidated `useState` string records.
2. **Strict Accessible Form Controls (WCAG 2.1 AA)**: Every form control must have an explicit `id` tied to an external `<label htmlFor="...">`. Never rely on implicit wrapping labels. Grouped inputs must use semantic `<fieldset>` and `<legend>` tags. Dynamic status feedback (save states, errors) must reside inside pre-mounted containers with `role="status"` and `aria-live="polite"`.
3. **Modular Domain Decomposition & Test Verification**: Never write monolithic route files exceeding 100 lines. Split UI into state coordinators (`page.tsx`), form logic (`components/*Form.tsx`), and visual panels (`components/*Preview.tsx`). Every new schema or data mutation must ship with reproducible unit tests in `tests/*.test.ts` passing cleanly via `npm test`.

## 4. Git & Commit Guidelines
- Every commit must strictly follow the **Conventional Commits 1.0.0** specification:
  - `feat: <description>` for new user-facing functionality.
  - `fix: <description>` for bug fixes.
  - `docs: <description>` for documentation updates.
  - `chore: <description>` for build, configuration, or toolchain changes.
  - `refactor: <description>` for internal code changes without behavioral change.
- Keep commit messages concise, lowercase, and imperative.
