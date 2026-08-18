# Progress Tracker

Update this file after every completed feature. Any AI agent reading this should immediately know what is done, what is in progress, and what is next.

---

## Current Status

**Phase:** Phase 2 — Profile Page
**Last completed:** 04 Database Schema
**Next:** 05 Profile Page — Full UI

---

## Progress

### Phase 1 — Foundation

- [x] 01 Homepage
- [x] 02 Auth
- [x] 03 PostHog Initialization
- [x] 04 Database Schema

### Phase 2 — Profile Page

- [ ] 05 Profile Page — Full UI
- [ ] 06 Profile Save Logic
- [ ] 07 AI Profile Extraction from Resume
- [ ] 08 Resume PDF Generation from Profile

### Phase 3 — Find Jobs Page

- [ ] 09 Find Jobs Page — Full UI
- [ ] 10 Adzuna Job Discovery
- [ ] 11 Filter + Sort + Pagination

### Phase 4 — Job Details Page

- [ ] 12 Job Details Page — Full UI
- [ ] 13 Company Research Agent

### Phase 5 — Dashboard

- [ ] 14 Dashboard Page — Full UI
- [ ] 15 Stats Bar — Real Data
- [ ] 16 Recent Activity — Real Data
- [ ] 17 Analytics Charts — PostHog Data

---

## Decisions Made During Build
 
- 01 Homepage: Used Tailwind CSS v4 `@theme` tokens, verified with strict TypeScript compilation.
- 02 Auth: Installed `@insforge/sdk@latest`, configured `lib/insforge-client.ts` with browser client, `lib/insforge-server.ts` with Next.js cookie-aware server client, built `/login` (Google & GitHub OAuth), `/callback` (PKCE exchange and session persistence), and Next.js `middleware.ts` protecting `/dashboard`, `/profile`, and `/find-jobs`.
- 03 PostHog Initialization: Initialized browser analytics via `@posthog/wizard` with `instrumentation-client.ts` and `app/global-error.tsx`. Created `lib/posthog-client.ts` client wrapper, installed `posthog-node` with `lib/posthog-server.ts` for serverless API event tracking, and wrapped root layout with `PostHogProvider`.
- 04 Database Schema: Linked InsForge CLI to project, executed migration creating `profiles`, `agent_runs`, `jobs`, `agent_logs` tables with cascade FKs, RLS policies, performance indexes (`user_id`, `run_id`, `match_score`, `found_at`), and `updated_at` trigger. Created private `resumes` storage bucket. Defined typed interfaces in `types/index.ts`.

---

## Notes

- Wrapped useSearchParams hooks in React Suspense boundaries to support Next.js static prerendering.
- InsForge auth cookies `insforge_access_token` and `insforge_refresh_token` are inspected in `middleware.ts` to enforce route access.
- PostHog server client uses `flushAt: 1` and `flushInterval: 0` for immediate delivery in short-lived Next.js server actions / API route handlers.


