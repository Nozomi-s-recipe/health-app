# Implementation Plan: Health App Landing Page

**Branch**: `001-health-landing-page` | **Date**: 2026-01-18 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-health-landing-page/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a conversion-optimized landing page for health.n-recipes.com that communicates the value proposition of unified health tracking (water, meals, fasting) and converts visitors into free users. The page emphasizes simplicity, privacy, and affordability with clear pricing (Free vs Premium ¥500/month), comprehensive FAQ, and multiple strategic CTAs linking to existing /sign-up authentication.

**Technical Approach**: Server-side rendered Next.js page using shadcn/ui components, optimized for Core Web Vitals (LCP < 2.5s), with Google Analytics 4 tracking for conversion metrics. Implements progressive enhancement with graceful JavaScript-disabled fallback.

## Technical Context

**Language/Version**: TypeScript 5.8.3 (strict mode) with Next.js 15.6.0-canary.59  
**Primary Dependencies**: React 19.1.0, shadcn/ui (Radix UI 1.4.2), Tailwind CSS 4.1.7, Lucide React 0.511.0  
**Storage**: N/A (static/presentational page, no new database entities)  
**Testing**: Manual testing for visual/UX, Lighthouse audits for performance/accessibility/SEO  
**Target Platform**: Web (responsive mobile-first design, minimum 320px width)  
**Project Type**: Web application (Next.js App Router with Server Components)  
**Performance Goals**:

- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Hero section loads in < 2 seconds on 4G
- Lighthouse score 90+ (Performance, Accessibility, SEO)
**Constraints**:
- Must use existing shadcn/ui components for consistency
- No new API routes (links to existing /sign-up)
- Must work with JavaScript disabled (graceful degradation)
- SEO-critical (server-side rendering required)
**Scale/Scope**: Single landing page with 7 sections (hero, problem, features, benefits, pricing, FAQ, footer), approximately 8-10 shadcn/ui components, 6 specific FAQ questions

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle I: API-First Architecture

✅ **PASS** - No business logic required. Presentational page only. Links to existing /sign-up API endpoint.

### Principle II: Data Isolation & Privacy

✅ **PASS** - No user data handling. Static content only. Privacy messaging in FAQ aligns with app's data isolation principles.

### Principle III: Type Safety & Validation

✅ **PASS** - TypeScript strict mode. shadcn/ui components are type-safe. No user input to validate on this page.

### Principle IV: Environment Separation

✅ **PASS** - No environment-specific configuration needed. Pricing display shows correct values but doesn't interact with Stripe API directly.

### Principle V: Cost-Conscious Design

✅ **PASS** - Static page with minimal runtime costs. Images optimized (WebP with fallbacks). React Server Components reduce client-side JavaScript. No database queries.

### Principle VI: Progressive Enhancement

✅ **PASS** - Mobile-first responsive design. Graceful degradation for JavaScript-disabled browsers (FR-036). PWA messaging aligns with progressive enhancement strategy.

### Principle VII: Test Infrastructure

✅ **PASS** - Visual/UX testing only (no complex business logic). Lighthouse audits for performance/accessibility. Manual testing for responsive design and cross-browser compatibility.

### Principle VIII: Documentation & Maintenance

✅ **PASS** - Component structure documented. Content easily maintainable. Clear separation of sections for future updates.

**Constitution Status**: ✅ ALL GATES PASSED - No violations. Ready for Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/001-health-landing-page/
├── spec.md              # Feature specification (created by /speckit.specify)
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (technical decisions and rationale)
├── data-model.md        # Phase 1 output (N/A - no data entities)
├── quickstart.md        # Phase 1 output (development setup and testing guide)
├── contracts/           # Phase 1 output (N/A - no API contracts)
├── checklists/          # Quality validation checklists
│   └── requirements.md  # Requirements quality checklist (completed)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
health-app/
├── app/
│   ├── (dashboard)/
│   │   ├── page.tsx           # REPLACE: Current landing page → New health-focused landing page
│   │   ├── terminal.tsx       # REMOVE: SaaS-focused terminal animation (not needed)
│   │   └── layout.tsx         # MODIFY: Update navigation if needed
│   ├── (login)/
│   │   ├── sign-up/
│   │   │   └── page.tsx       # REFERENCE: Existing signup page (CTA destination)
│   │   └── sign-in/
│   │       └── page.tsx       # REFERENCE: Existing signin page
│   ├── layout.tsx             # MODIFY: Update metadata for new landing page
│   └── globals.css            # MODIFY: May need landing page specific styles
├── components/
│   ├── ui/                    # EXISTING: Use shadcn/ui components
│   │   ├── button.tsx         # USE: For CTAs
│   │   ├── card.tsx           # USE: For feature cards, pricing cards
│   │   └── [other components] # USE: As needed for layout
│   └── landing/               # CREATE: New landing page specific components
│       ├── hero-section.tsx
│       ├── problem-statement.tsx
│       ├── features-section.tsx
│       ├── benefits-section.tsx
│       ├── how-it-works.tsx
│       ├── pricing-section.tsx
│       ├── faq-section.tsx
│       └── footer.tsx
├── lib/
│   └── utils.ts               # EXISTING: Use for className utilities
└── public/
    └── images/                # CREATE: Landing page images
        ├── hero-placeholder.png  # Placeholder until real mockups
        ├── feature-water.svg     # Icon for water tracking
        ├── feature-meals.svg     # Icon for meal records
        └── feature-fasting.svg   # Icon for fasting support
```

**Structure Decision**: Using Next.js App Router structure with Server Components. Landing page replaces current dashboard home page at `app/(dashboard)/page.tsx`. New components organized under `components/landing/` for maintainability. Existing shadcn/ui components reused for consistency. No new API routes needed (links to existing authentication system).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations detected. All constitution principles satisfied.

## Phase 0: Research & Decisions

See [research.md](./research.md) for detailed technical decisions and rationale.

### Key Decisions Summary

1. **Component Architecture**: Server Components for static content, Client Components only for interactive elements (smooth scroll, analytics)
2. **Image Strategy**: Placeholder images initially (hero, features), optimized as WebP with PNG fallback
3. **Analytics Integration**: Google Analytics 4 with gtag.js, tracking page views, scroll depth (via Intersection Observer), and CTA clicks
4. **Accessibility Strategy**: WCAG 2.1 AA compliance through semantic HTML, ARIA labels, keyboard navigation, and screen reader testing
5. **SEO Optimization**: Server-side rendering, Open Graph tags, structured data (Organization, WebSite schemas), sitemap inclusion
6. **Performance Optimization**: React Server Components, image optimization, code splitting, font optimization (Manrope from Google Fonts)

## Phase 1: Design Artifacts

### Data Model

See [data-model.md](./data-model.md)

**Summary**: No new data entities. Landing page is purely presentational. References existing User entity for signup flow and existing Stripe pricing plans for display only.

### API Contracts

See [contracts/](./contracts/)

**Summary**: No new API contracts. Landing page consumes no APIs directly. Links to existing `/sign-up` authentication route.

### Quick Start Guide

See [quickstart.md](./quickstart.md) for development setup, testing procedures, and deployment checklist.

## Phase 2: Task Breakdown

Task breakdown will be generated by `/speckit.tasks` command. See [tasks.md](./tasks.md) once created.

## Implementation Notes

### Critical Path

1. Replace existing landing page with new structure
2. Implement hero section with placeholder image
3. Create feature cards with icons
4. Build pricing comparison table
5. Add FAQ section with 6 questions
6. Integrate Google Analytics 4
7. Performance optimization and Lighthouse audit
8. Accessibility audit and keyboard navigation testing
9. Cross-browser testing (Chrome, Firefox, Safari, Edge)
10. Mobile responsiveness testing (320px - 1920px)

### Dependencies

- Existing authentication system at `/sign-up` must remain functional
- shadcn/ui components already installed
- Tailwind CSS configuration supports the design
- Google Analytics 4 property created and tracking ID available
- Vercel deployment configuration supports Server Components

### Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Performance regression | High | Use Lighthouse CI, monitor Core Web Vitals, lazy load images |
| SEO not improved | Medium | Implement structured data, test with Google Search Console |
| Accessibility issues | Medium | Use axe DevTools, manual screen reader testing, keyboard nav audit |
| Mobile rendering issues | Medium | Test on real devices, use responsive design testing tools |
| Analytics not tracking | Low | Test in development with GA4 DebugView before production |
| Images too large | Low | Optimize with sharp/imagemin, use next/image for automatic optimization |

### Testing Strategy

1. **Visual Testing**: Manual review of all sections on multiple screen sizes
2. **Performance Testing**: Lighthouse audits (target: 90+ all categories)
3. **Accessibility Testing**: axe DevTools + manual screen reader testing (NVDA/VoiceOver)
4. **Cross-Browser Testing**: Chrome, Firefox, Safari, Edge (desktop + mobile)
5. **Analytics Testing**: Verify GA4 events in DebugView
6. **Responsive Testing**: 320px, 375px, 768px, 1024px, 1440px, 1920px breakpoints
7. **Content Review**: Verify all copy matches specification exactly

### Post-Launch Monitoring

- Monitor GA4 for success criteria metrics (scroll depth, CTA clicks, bounce rate)
- Track Core Web Vitals in production
- Review Google Search Console for SEO performance
- Collect user feedback on FAQ clarity and content comprehension
- A/B test different hero headlines if conversion rate is below 5%

## Completion Criteria

- [ ] All 7 sections implemented (hero, problem, features, benefits, pricing, FAQ, footer)
- [ ] All 36 functional requirements satisfied (FR-001 through FR-036)
- [ ] All 18 success criteria measurable (SC-001 through SC-018)
- [ ] Lighthouse scores: Performance 90+, Accessibility 90+, SEO 90+
- [ ] Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] Google Analytics 4 tracking verified
- [ ] Cross-browser testing passed (4 major browsers)
- [ ] Mobile responsiveness verified (6 breakpoints)
- [ ] Accessibility audit passed (WCAG 2.1 AA)
- [ ] Content matches specification exactly
- [ ] All CTAs link to /sign-up correctly
- [ ] FAQ contains all 6 required questions with accurate answers
- [ ] Pricing displays ¥0 Free and ¥500/month Premium correctly
- [ ] JavaScript-disabled fallback displays gracefully
- [ ] Production deployment successful
- [ ] Post-launch monitoring dashboard configured
