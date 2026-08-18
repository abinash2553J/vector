# UI Registry

Living document. Updated after every component is built. Read this before building any new component — match existing patterns exactly before inventing new ones.

---

## How to Use

Before building any component:

1. Check if a similar component already exists here
2. If yes — match its exact classes
3. If no — build it following ui-rules.md and ui-tokens.md, then add it here

After building any component — update this file with the component name, file path, and exact classes used.

---

## Components

### Navbar
- **File:** `components/layout/Navbar.tsx`
- **Pattern:** Sticky top bar with logo, nav links, and CTA button.
- **Classes:**
  - Header: `sticky top-0 z-50 w-full bg-surface border-b border-border`
  - Container: `max-w-7xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between`
  - Active nav item: `text-sm font-medium text-accent`
  - Inactive nav item: `text-sm font-medium text-text-dark hover:text-text-primary transition-colors`
  - CTA button: `bg-text-darkest hover:bg-text-black text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm`

### Footer
- **File:** `components/layout/Footer.tsx`
- **Pattern:** Footer with logo and links.
- **Classes:**
  - Wrapper: `w-full bg-surface border-t border-border py-8`
  - Container: `max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6`
  - Links: `flex items-center gap-6 sm:gap-8 text-sm text-text-secondary`

### Hero
- **File:** `components/homepage/Hero.tsx`
- **Pattern:** Atmospheric gradient hero with headline, subtitle, dual CTAs, and large preview dashboard image.
- **Classes:**
  - Section: `relative overflow-hidden pt-12 sm:pt-20 pb-16`
  - Heading: `text-4xl sm:text-5xl md:text-[56px] font-bold tracking-tight text-text-primary leading-[1.12] max-w-4xl mx-auto`
  - Subtitle: `mt-6 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed`
  - Primary CTA: `bg-text-darkest hover:bg-text-black text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow-sm transition-all hover:scale-[1.01]`
  - Secondary CTA: `bg-surface hover:bg-surface-secondary text-text-primary border border-border text-sm font-medium px-5 py-2.5 rounded-lg shadow-sm transition-all hover:scale-[1.01]`
  - Preview card: `relative rounded-2xl overflow-hidden shadow-2xl border border-border/80 bg-surface`

### Features
- **File:** `components/homepage/Features.tsx`
- **Pattern:** 2-column feature blocks with typography hierarchy, active left-accent border indicators, and preview media.
- **Classes:**
  - Section 1: `py-20 sm:py-28 border-t border-border bg-surface`
  - Section 2: `py-20 sm:py-28 border-t border-border bg-surface-secondary/40 relative`
  - Heading: `text-3xl sm:text-4xl md:text-[40px] font-bold tracking-tight text-text-primary leading-[1.2]`
  - Active item border: `border-l-2 border-accent pl-6 py-1`
  - Preview card: `w-full max-w-lg rounded-2xl overflow-hidden shadow-lg border border-border bg-surface`

### HowItWorks (Testimonials & Bottom CTA)
- **File:** `components/homepage/HowItWorks.tsx`
- **Pattern:** Testimonial quote with author avatar and bottom atmospheric CTA.
- **Classes:**
  - Pill label: `text-xs font-semibold uppercase tracking-widest text-accent mb-6 inline-block`
  - Quote: `text-2xl sm:text-3xl md:text-[28px] font-medium text-text-primary leading-snug tracking-tight max-w-3xl mx-auto`
  - Avatar: `w-12 h-12 rounded-xl object-cover shadow-sm border border-border`

### LoginPage
- **File:** `app/(auth)/login/page.tsx`
- **Pattern:** Authentication modal card with atmospheric radial glow, Google & GitHub OAuth buttons, and terms footnote.
- **Classes:**
  - Background container: `min-h-screen bg-background flex flex-col justify-center py-12 px-6 sm:px-8 relative overflow-hidden`
  - Card: `bg-surface border border-border rounded-2xl p-8 sm:p-9 shadow-xs`
  - Google button: `w-full h-11 px-4 bg-surface hover:bg-surface-secondary border border-border text-text-primary font-medium text-sm rounded-xl transition-all duration-150 flex items-center justify-center gap-3 shadow-xs hover:border-border-muted`
  - GitHub button: `w-full h-11 px-4 bg-text-darkest hover:bg-text-black text-white font-medium text-sm rounded-xl transition-all duration-150 flex items-center justify-center gap-3 shadow-xs`
  - Error alert: `p-3.5 rounded-xl bg-error/10 border border-error/20 flex items-start gap-3`

### CallbackPage
- **File:** `app/(auth)/callback/page.tsx`
- **Pattern:** OAuth token exchange and session verification landing view with spinner feedback and error handling.
- **Classes:**
  - Card: `bg-surface border border-border rounded-2xl p-8 sm:p-10 shadow-xs max-w-md w-full text-center`
  - Spinner: `w-10 h-10 animate-spin text-accent mb-4`
  - Success Icon: `w-10 h-10 text-success mb-4`
  - Return button: `inline-flex items-center justify-center bg-accent hover:bg-accent-dark text-white font-medium text-sm px-6 py-2.5 rounded-xl transition-colors shadow-xs`


