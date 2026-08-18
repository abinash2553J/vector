# Memory — Phase 1: Foundation (02 Auth)

Last updated: 2026-08-18T13:29:10+05:30

## What was built

- `lib/utils.ts` — Utility helper with `MATCH_THRESHOLD = 70` and class name concatenator `cn()`.
- `lib/insforge-client.ts` — Browser-side InsForge SDK client configured with `NEXT_PUBLIC_INSFORGE_URL` and `NEXT_PUBLIC_INSFORGE_ANON_KEY`.
- `lib/insforge-server.ts` — Server-side InsForge client factory using `@insforge/sdk/ssr` with Next.js cookie store integration.
- `app/(auth)/login/page.tsx` — Full login UI matching JobPilot design system with Google OAuth and GitHub OAuth buttons, loading state, error alert handling, and terms link.
- `app/(auth)/callback/page.tsx` — OAuth callback handler with PKCE code exchange (`insforge.auth.exchangeOAuthCode`), error notifications, and automated session redirect to `/dashboard`.
- `middleware.ts` — Route protection middleware guarding `/dashboard`, `/profile`, `/find-jobs`, and `/find-jobs/[id]`, redirecting unauthenticated users to `/login?redirect=...` and authenticated users away from `/login` to `/dashboard`.
- `.env.local` — Configured InsForge endpoint and API key.
- `context/ui-registry.md` — Registered `LoginPage` and `CallbackPage` with their exact CSS classes.
- `context/progress-tracker.md` — Updated progress status, marking `02 Auth` complete and setting next to `03 PostHog Initialization`.

## Decisions made

- Used official `@insforge/sdk@latest` with PKCE-enabled `signInWithOAuth` for Google and GitHub.
- Wrapped `useSearchParams` in `<Suspense>` boundaries to ensure static page pre-rendering succeeds in Next.js Turbopack build.
- Cookie-aware middleware inspects `insforge_access_token` and `insforge_refresh_token` for route protection.

## Problems solved

- Resolved Next.js client-side search params CSR bailout during build by wrapping forms in Suspense boundaries.
- Verified with `npm run build` — 100% clean production build with 0 TypeScript/ESLint errors.

## Current state

- Phase 1, Feature 01 (Homepage) and Feature 02 (Auth) are complete and verified.
- The project builds cleanly with Next.js 16 App Router and React 19.

## Next session starts with

- **Phase 1 — Feature 03: PostHog Initialization**
  - Create `lib/posthog-client.ts` (PostHog browser client with `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`)
  - Create `lib/posthog-server.ts` (PostHog server client with `flushAt: 1` and `flushInterval: 0`)
  - Initialize PostHog in root app layout (`app/layout.tsx`)
  - Set up `posthog.identify()` on login and `posthog.reset()` on logout

## Open questions

- None.
