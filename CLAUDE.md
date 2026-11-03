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
- **Package Manager**: npm or pnpm.

## 3. Code & Architecture Conventions
- Use functional components with explicit TypeScript interfaces/types for props.
- Keep components modular: split logic (hooks) from visual presentation.
- Follow mobile-first design principles.
- Use Semantic HTML tags (`<header>`, `<main>`, `<article>`, `<button>`) to guarantee WCAG accessibility standards.
- Never commit hardcoded API secrets or private tokens; read strictly from environment variables (`process.env`).

## 4. Git & Commit Guidelines
- Every commit must strictly follow the **Conventional Commits 1.0.0** specification:
  - `feat: <description>` for new user-facing functionality.
  - `fix: <description>` for bug fixes.
  - `docs: <description>` for documentation updates.
  - `chore: <description>` for build, configuration, or toolchain changes.
  - `refactor: <description>` for internal code changes without behavioral change.
- Keep commit messages concise, lowercase, and imperative.
