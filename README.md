# AI-Powered Lead Qualification Widget

An embeddable, real-time AI conversational widget designed to qualify inbound sales leads, extract key intent parameters, and integrate with CRM pipelines.

> **Project status:** Planning and initial setup. The application scaffold and backend integration are part of the upcoming roadmap phases.

## Overview

This project is the capstone for the FlyRank Frontend AI Engineering track. It will demonstrate a responsive, accessible conversational experience, token streaming, lead-intent extraction, and resilient fallback handling for CRM-oriented workflows.

## Planned Tech Stack

- **Framework:** Next.js App Router with React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI interaction:** Vercel AI SDK and a streaming model API
- **Tooling:** Node.js LTS, npm or pnpm, ESLint, and Prettier

## Architecture & Data Flow

The target architecture keeps provider credentials and business logic on the server while the browser handles presentation and conversation state:

1. A host page embeds the widget and provides any non-secret configuration, such as a campaign or tenant identifier.
2. The widget uses the Vercel AI SDK (`useChat`) to send the conversation to the Next.js backend over an authenticated `POST` request (for example, `/api/chat`).
3. The server validates the request, adds the system prompt and lead-qualification context, and calls the model through `streamText`. Provider API keys remain server-side in environment variables.
4. The backend returns the model response as a streaming response. The client consumes each token as it arrives and updates the message view without waiting for generation to finish.
5. Structured lead details are extracted from the conversation and passed through server-side validation before they are sent to a CRM or persisted. Failures use the widget's fallback state instead of exposing provider errors or credentials.

```text
Host page
   |
   v
Embedded widget -- useChat / streaming POST --> Next.js route or Server Action
   ^                                                   |
   |                                                   v
Incremental UI <-- streamed tokens ----------- AI provider (server-side)
                                                       |
                                                       v
                                             Validated lead data -> CRM
```

The route name and CRM adapter will be finalized during the implementation phases. This flow is intentionally provider-agnostic so that the UI does not depend on a specific model vendor.

## Local Development Quickstart

### Prerequisites

- Node.js LTS
- npm (or pnpm)
- Git
- An API key for the selected AI provider once the backend integration is enabled

### Run locally

The repository is currently in the planning/setup phase and does not yet include a `package.json` or runnable Next.js app. After the application scaffold is added, use:

```bash
git clone <repository-url>
cd frontend-ai-capstone
npm install
cp .env.example .env.local
# Add the required server-side AI provider key to .env.local.
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the widget. Never commit `.env.local` or expose provider keys through `NEXT_PUBLIC_*` variables.

## Roadmap
- [ ] Phase 1: Environment & Toolchain Setup (FE-01)
- [ ] Phase 2: Design Specification & UI Wireframes
- [ ] Phase 3: Capstone Skeleton & Deployment
- [ ] Phase 4: Token Streaming & Lead Scoring Pipeline
- [ ] Phase 5: Testing, Accessibility & Final Submission
