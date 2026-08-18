# Progress Tracker

Update this file after every completed feature. Any AI agent reading this should immediately know what is done, what is in progress, and what is next.

---

## Current Status

**Phase:** Phase 1 — Foundation
**Last completed:** 02 Auth
**Next:** 03 PostHog Initialization

---

## Progress

### Phase 1 — Foundation

- [x] 01 Homepage
- [x] 02 Auth
- [ ] 03 PostHog Initialization
- [ ] 04 Database Schema

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

---

## Notes

- Wrapped useSearchParams hooks in React Suspense boundaries to support Next.js static prerendering.
- InsForge auth cookies `insforge_access_token` and `insforge_refresh_token` are inspected in `middleware.ts` to enforce route access.

