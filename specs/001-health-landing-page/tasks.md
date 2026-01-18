
# Tasks: Health App Landing Page

**Input**: Design documents from `/specs/001-health-landing-page/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: No test tasks included (not requested in specification, manual testing approach defined in quickstart.md)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4, US5)
- Include exact file paths in descriptions

## Path Conventions

Next.js App Router structure:

- `health-app/app/` - Application routes and pages
- `health-app/components/` - React components
- `health-app/public/` - Static assets
- `health-app/lib/` - Utility functions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and development environment setup

- [X] T001 Verify Next.js 15.6.0-canary.59, React 19.1.0, TypeScript 5.8.3 dependencies in health-app/package.json
- [X] T002 [P] Create components/landing/ directory for landing page components
- [X] T003 [P] Create public/images/ directory for landing page assets
- [X] T004 [P] Add Google Analytics 4 measurement ID to .env.local file (NEXT_PUBLIC_GA_MEASUREMENT_ID)
- [X] T005 [P] Verify shadcn/ui components available: Button, Card from components/ui/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 Remove terminal.tsx from health-app/app/(dashboard)/ (SaaS-specific component not needed)
- [X] T007 Add noscript banner HTML to health-app/app/layout.tsx for JavaScript-disabled graceful degradation (FR-036)
- [X] T008 Integrate Google Analytics 4 scripts in health-app/app/layout.tsx with Script components (afterInteractive strategy)
- [X] T009 Update metadata in health-app/app/layout.tsx: title "Track Your Health, All in One Place | health.n-recipes.com", description, Open Graph tags (FR-025)
- [X] T010 Add JSON-LD structured data for SoftwareApplication schema in health-app/app/layout.tsx (FR-029)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - First-Time Visitor Understanding Value Proposition (Priority: P1) 🎯 MVP

**Goal**: Display hero section with clear value proposition, problem statement, and primary CTA to immediately communicate what the app does

**Independent Test**: Test users visit landing page and answer "What does this app do?" and "Would this solve your health tracking problem?" within 10 seconds. Success = 80%+ correct understanding.

### Implementation for User Story 1

- [X] T011 [P] [US1] Create placeholder hero image at health-app/public/images/hero-placeholder.png (1200x800px)
- [X] T012 [P] [US1] Create HeroSection Server Component in health-app/components/landing/hero-section.tsx with headline "Track Your Health, All in One Place", subheadline, hero image using next/image with priority prop (FR-001, FR-012)
- [X] T013 [P] [US1] Create CTAButton Client Component in health-app/components/landing/cta-button.tsx with GA4 tracking, links to /sign-up (FR-012, FR-015)
- [X] T014 [P] [US1] Create SmoothScrollButton Client Component in health-app/components/landing/smooth-scroll-button.tsx for "See How It Works" secondary CTA (FR-013)
- [X] T015 [P] [US1] Create ProblemStatement Server Component in health-app/components/landing/problem-statement.tsx displaying 3 pain points: multiple apps, data loss, high costs (FR-002)
- [X] T016 [US1] Replace content in health-app/app/(dashboard)/page.tsx to import and render HeroSection and ProblemStatement components
- [X] T017 [US1] Add trust messaging "No credit card required" to hero CTA in HeroSection component (FR-021)
- [X] T018 [US1] Verify mobile responsive layout 320px-1920px for hero and problem sections using Tailwind breakpoints (FR-023)

**Checkpoint**: At this point, User Story 1 should be fully functional - visitors see value proposition and problem clearly

---

## Phase 4: User Story 2 - Feature Discovery and Benefit Understanding (Priority: P2)

**Goal**: Display three core features (water, meals, fasting) with detailed capabilities and benefits, plus "How It Works" section

**Independent Test**: Ask users to identify the three main features and their benefits after viewing. Success = 90%+ accurate recall of all three features.

### Implementation for User Story 2

- [X] T019 [P] [US2] Create SVG icons for features at health-app/public/images/: feature-water.svg, feature-meals.svg, feature-fasting.svg using Lucide React icons
- [X] T020 [P] [US2] Create FeaturesSection Server Component in health-app/components/landing/features-section.tsx displaying 3 features with icons, names, descriptions, and capabilities (FR-003)
- [X] T021 [P] [US2] Create BenefitsSection Server Component in health-app/components/landing/benefits-section.tsx emphasizing unified data, PWA access, privacy, affordability (FR-004)
- [X] T022 [P] [US2] Create HowItWorksSection Server Component in health-app/components/landing/how-it-works.tsx with 3 steps: Sign up → Log data → Track progress (FR-005)
- [X] T023 [US2] Add FeaturesSection, BenefitsSection, HowItWorksSection imports to health-app/app/(dashboard)/page.tsx after ProblemStatement
- [X] T024 [US2] Configure SmoothScrollButton in HeroSection to scroll to FeaturesSection (id="features")
- [X] T025 [US2] Verify mobile responsive layout for features (1 column mobile, 2 columns tablet, 3 columns desktop) using Tailwind grid (FR-023)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - visitors understand value AND features

---

## Phase 5: User Story 3 - Pricing Evaluation and Plan Selection (Priority: P3)

**Goal**: Display Free and Premium pricing tiers with clear feature comparison and annual savings highlight

**Independent Test**: Ask users to explain difference between Free and Premium plans and identify which they'd choose. Success = 85%+ accurate understanding.

### Implementation for User Story 3

- [X] T026 [P] [US3] Create PricingSection Server Component in health-app/components/landing/pricing-section.tsx with Card components for Free and Premium plans (FR-006)
- [X] T027 [US3] Add Free plan details to PricingSection: ¥0/month, water tracking, basic meals, 3-month retention, 10MB storage (FR-007)
- [X] T028 [US3] Add Premium plan details to PricingSection: ¥500/month or ¥5,000/year with ~17% savings highlight, all features list (FR-008, FR-010)
- [X] T029 [US3] Create pricing comparison table in PricingSection showing feature availability across plans using Tailwind table styles (FR-009)
- [X] T030 [US3] Add "All prices in JPY, billed via Stripe" note to PricingSection (FR-011)
- [X] T031 [US3] Add "Start Free" CTA buttons to both pricing cards linking to /sign-up with GA4 tracking (FR-014, FR-015)
- [X] T032 [US3] Add trust messaging "Free to start, no credit card required" and "Cancel anytime" to PricingSection (FR-021)
- [X] T033 [US3] Add PricingSection import to health-app/app/(dashboard)/page.tsx after HowItWorksSection
- [X] T034 [US3] Verify mobile responsive layout for pricing cards (stack vertically on mobile, side-by-side on tablet+) (FR-023)

**Checkpoint**: All user stories 1-3 should now work independently - visitors understand value, features, AND pricing

---

## Phase 6: User Story 4 - Trust Building and Objection Handling (Priority: P4)

**Goal**: Display comprehensive FAQ section with 6 specific questions addressing privacy, payments, and PWA functionality

**Independent Test**: Present users with common objections and verify they find answers in FAQ within 30 seconds. Success = 80%+.

### Implementation for User Story 4

- [X] T035 [P] [US4] Create FAQSection Server Component in health-app/components/landing/faq-section.tsx with 6 FAQ questions (FR-017)
- [X] T036 [US4] Add FAQ question 1 to FAQSection: "Is my data private?" with answer about data isolation and privacy-first design
- [X] T037 [US4] Add FAQ question 2 to FAQSection: "Can I export my data?" with answer about data portability
- [X] T038 [US4] Add FAQ question 3 to FAQSection: "What payment methods do you accept?" with answer "Stripe (credit/debit cards)"
- [X] T039 [US4] Add FAQ question 4 to FAQSection: "Can I cancel anytime?" with answer about flexible cancellation
- [X] T040 [US4] Add FAQ question 5 to FAQSection: "Do you offer refunds?" with answer about refund policy
- [X] T041 [US4] Add FAQ question 6 to FAQSection: "Is there a mobile app?" with PWA explanation - works on any device without app store (FR-018)
- [X] T042 [P] [US4] Add testimonials placeholder section to health-app/app/(dashboard)/page.tsx with "Coming soon" message (FR-019)
- [X] T043 [P] [US4] Add user count placeholder section to health-app/app/(dashboard)/page.tsx with "Join thousands of users" placeholder (FR-020)
- [X] T044 [US4] Add FAQSection import to health-app/app/(dashboard)/page.tsx after PricingSection
- [X] T045 [US4] Verify FAQ section is readable on all screen sizes with single column layout (FR-023)

**Checkpoint**: All user stories 1-4 should now work independently - visitors understand value, features, pricing, AND have objections addressed

---

## Phase 7: User Story 5 - Signup Conversion (Priority: P5)

**Goal**: Ensure all CTAs correctly link to existing /sign-up page and handle logged-in user redirection

**Independent Test**: Measure time from clicking "Start Free" to reaching dashboard. Success = 90%+ complete signup in <3 minutes with <5% abandonment.

### Implementation for User Story 5

- [X] T046 [US5] Add final CTA section to health-app/app/(dashboard)/page.tsx before footer with "Start Tracking Your Health Today" headline and "Start Free" button (FR-014)
- [X] T047 [US5] Verify all "Start Free" CTAs (hero, pricing cards, final section) link to /sign-up route (FR-015)
- [X] T048 [US5] Add middleware check in health-app/app/(dashboard)/page.tsx to redirect authenticated users' CTA clicks to /dashboard instead of /sign-up
- [X] T049 [US5] Test CTA functionality: unauthenticated user clicks → /sign-up, authenticated user clicks → /dashboard
- [X] T050 [US5] Verify signup page exists and is functional at health-app/app/(login)/sign-up/page.tsx (no changes needed, just verification)

**Checkpoint**: All 5 user stories should now be independently functional - complete conversion funnel from landing → signup

---

## Phase 8: Footer & Final Content (Cross-Cutting)

**Purpose**: Add footer navigation and finalize all static content

- [X] T051 [P] Create FooterSection Server Component in health-app/components/landing/footer.tsx with navigation links (FR-016, FR-022)
- [X] T052 Add footer navigation links to FooterSection: Privacy Policy, Terms of Service, Contact (placeholder hrefs)
- [X] T053 Add copyright notice "© 2026 n-recipes" to FooterSection (FR-022)
- [X] T054 [P] Add social media link placeholders to FooterSection for future use (FR-022)
- [X] T055 Add FooterSection import to health-app/app/(dashboard)/page.tsx as final component
- [X] T056 Verify footer is responsive and readable on all screen sizes (FR-023)

---

## Phase 9: Interactive Features & Analytics

**Purpose**: Add client-side interactivity and tracking

- [X] T057 [P] Create ScrollTracker Client Component in health-app/components/landing/scroll-tracker.tsx using Intersection Observer for 25%, 50%, 75%, 100% depth tracking
- [X] T058 Add ScrollTracker component to health-app/app/(dashboard)/page.tsx for GA4 scroll depth events
- [X] T059 Verify GA4 events fire correctly using DebugView: page_view, cta_click (with location parameter), scroll_depth
- [X] T060 Add smooth scroll behavior to all section navigation links using CSS scroll-behavior: smooth in globals.css (FR-027)

---

## Phase 10: Accessibility & Semantic HTML

**Purpose**: Ensure WCAG 2.1 AA compliance and proper semantic structure

- [X] T061 [P] Add semantic HTML structure to page.tsx: header, main, sections with aria-labelledby, footer (FR-026)
- [X] T062 [P] Add descriptive alt text to all images: hero image, feature icons (FR-026)
- [X] T063 [P] Verify heading hierarchy: h1 for hero headline, h2 for section headings, h3 for subsections (FR-026)
- [X] T064 [P] Add ARIA labels to icon-only buttons and ensure all interactive elements have visible focus states (FR-030)
- [X] T065 [P] Add skip-to-main-content link at top of page for keyboard navigation accessibility (FR-030)
- [X] T066 Test keyboard navigation: Tab through all interactive elements, Enter/Space activate buttons, focus indicators visible (FR-030)
- [X] T067 Test with screen reader (VoiceOver on Mac or NVDA on Windows) - verify all content announced correctly
- [X] T068 Run axe DevTools accessibility audit and fix any violations to achieve WCAG 2.1 AA compliance (FR-035)
- [X] T069 Verify color contrast ratios meet 4.5:1 minimum for normal text, 3:1 for large text using WebAIM checker (FR-035)

---

## Phase 11: Performance Optimization

**Purpose**: Optimize for Core Web Vitals and Lighthouse scores

- [X] T070 [P] Optimize hero image: convert to WebP format, add PNG fallback, ensure < 200KB file size (FR-034)
- [X] T071 [P] Optimize feature icons: use SVG format for scalability and small file size (FR-034)
- [X] T072 [P] Add font optimization to layout.tsx: Manrope font with font-display: swap, subset to latin characters only
- [X] T073 [P] Verify next/image used correctly with priority prop for hero image, lazy loading for below-fold images
- [X] T074 Set explicit width/height on all images to prevent Cumulative Layout Shift (CLS) issues
- [X] T075 Run production build with `pnpm build` and verify no errors or significant warnings
- [X] T076 Run Lighthouse audit on production build: target Performance 90+, Accessibility 90+, SEO 90+, Best Practices 90+
- [X] T077 Verify Core Web Vitals meet targets: LCP < 2.5s, FID < 100ms, CLS < 0.1 using Lighthouse Performance Insights
- [X] T078 Test page load performance on throttled connection (Slow 3G) - hero content should load < 2 seconds (FR-024)

---

## Phase 12: Cross-Browser & Responsive Testing

**Purpose**: Ensure consistent experience across browsers and devices

- [X] T079 [P] Test on Chrome latest (desktop + mobile): verify layout, functionality, no console errors
- [X] T080 [P] Test on Firefox latest (desktop + mobile): verify layout, functionality, no console errors
- [X] T081 [P] Test on Safari latest (desktop + iOS): verify layout, functionality, no console errors, test WebP fallback
- [X] T082 [P] Test on Edge latest: verify layout, functionality, no console errors
- [X] T083 Test responsive breakpoints: 320px (iPhone SE), 375px (iPhone 12), 768px (iPad), 1024px (iPad Pro), 1440px (laptop), 1920px (desktop) (FR-023)
- [X] T084 Verify touch target sizes minimum 44x44px on mobile for all buttons and links
- [X] T085 Test with JavaScript disabled: verify noscript banner displays, static content visible, links work (FR-036)
- [X] T086 Test smooth scroll behavior works in all supported browsers
- [X] T087 Verify all images load correctly with proper aspect ratios across all breakpoints

---

## Phase 13: Content Verification

**Purpose**: Ensure all content matches specification exactly

- [X] T088 Verify hero headline exactly matches: "Track Your Health, All in One Place" (FR-001)
- [X] T089 Verify 3 problem statements present: multiple apps, data loss, high costs (FR-002)
- [X] T090 Verify 3 features present with correct names: Water Intake Tracking, Meal Records, Fasting Support (FR-003)
- [X] T091 Verify "How It Works" has exactly 3 steps: Sign up → Log data → Track progress (FR-005)
- [X] T092 Verify pricing displays: Free ¥0/month, Premium ¥500/month or ¥5,000/year with ~17% savings note (FR-006, FR-008, FR-010)
- [X] T093 Verify Free plan features match spec: water tracking, basic meals, 3-month retention, 10MB storage (FR-007)
- [X] T094 Verify Premium plan features match spec: all features, unlimited retention, 100MB, analytics, fasting, priority support (FR-008)
- [X] T095 Verify all 6 FAQ questions present with correct wording as specified in FR-017
- [X] T096 Verify FAQ answer for mobile app explains PWA concept correctly (FR-018)
- [X] T097 Verify trust messaging present: "No credit card required" and "Cancel anytime" (FR-021)
- [X] T098 Verify copyright notice "© 2026 n-recipes" in footer (FR-022)
- [X] T099 Verify "All prices in JPY, billed via Stripe" note present in pricing section (FR-011)

---

## Phase 14: SEO Verification

**Purpose**: Ensure SEO elements are properly implemented

- [X] T100 [P] Verify page title in layout.tsx: "Track Your Health, All in One Place | health.n-recipes.com" (FR-025)
- [X] T101 [P] Verify meta description present and under 160 characters (FR-025)
- [X] T102 [P] Verify Open Graph tags present: og:title, og:description, og:image, og:url (FR-025)
- [X] T103 [P] Verify Twitter Card tags present: twitter:card, twitter:title, twitter:description, twitter:image (FR-025)
- [X] T104 [P] Verify JSON-LD structured data present for SoftwareApplication schema (FR-029)
- [X] T105 Test structured data with Google Rich Results Test - verify schema recognized correctly
- [X] T106 Test Open Graph tags with Facebook Sharing Debugger - verify correct title, description, image display
- [X] T107 Test Twitter Card with Twitter Card Validator - verify correct display
- [X] T108 Verify canonical URL specified in metadata pointing to <https://health.n-recipes.com>
- [X] T109 View page source and confirm server-side rendering: HTML content visible without JavaScript (FR-028)

---

## Phase 15: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements and validation before deployment

- [X] T110 [P] Review all component code for console.log statements and remove them
- [X] T111 [P] Review all components for TypeScript strict mode compliance - fix any type errors
- [X] T112 [P] Run ESLint with `pnpm lint` and fix any errors or warnings
- [X] T113 [P] Add JSDoc comments to complex functions and Client Components for maintainability
- [X] T114 Code review: verify shadcn/ui components used consistently throughout
- [X] T115 Code review: verify Tailwind utility classes follow mobile-first pattern (base → sm: → md: → lg:)
- [X] T116 Code review: verify Server Components marked correctly (no 'use client' unless needed)
- [X] T117 Code review: verify Client Components marked with 'use client' directive where needed
- [X] T118 Final visual review: check spacing, alignment, typography consistency across all sections
- [X] T119 Final content review: verify no placeholder text remains except hero image and testimonials/user count placeholders
- [X] T120 Run full quickstart.md validation checklist from Pre-Deployment Checklist section
- [X] T121 Create commit with message: "feat: implement health app landing page with GA4 tracking and accessibility"

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phases 3-7)**: All depend on Foundational phase completion
  - Each user story can proceed independently once Foundation is complete
  - Recommended order: US1 → US2 → US3 → US4 → US5 (by priority)
- **Footer & Content (Phase 8)**: Can start anytime after Foundation, recommended after US1
- **Interactive Features (Phase 9)**: Depends on all user story sections being present
- **Accessibility (Phase 10)**: Depends on all content being complete
- **Performance (Phase 11)**: Depends on all components and images being present
- **Testing Phases (12-14)**: Depend on all implementation phases complete
- **Polish (Phase 15)**: Depends on all other phases complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories ✅ MVP
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent, but references hero CTA in smooth scroll
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Independent
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - Independent
- **User Story 5 (P5)**: Depends on User Stories 1-4 having CTAs present to verify

### Within Each User Story

- Tasks marked [P] can run in parallel (different files)
- Component creation tasks before integration into page.tsx
- Content verification after component creation
- Mobile responsive verification after desktop implementation

### Parallel Opportunities

- **Setup Phase**: All 5 tasks can run in parallel
- **Foundational Phase**: T007, T008, T009, T010 can run in parallel after T006
- **User Story 1**: T011, T012, T013, T014, T015 can all run in parallel (different components)
- **User Story 2**: T019, T020, T021, T022 can all run in parallel (different components)
- **User Story 3**: T026 can be worked on while T027-T032 define content
- **User Story 4**: T036-T041 FAQ questions can be added in parallel, T042-T043 placeholders in parallel
- **Phase 8 Footer**: T051, T054 can run in parallel
- **Phase 9**: T057, T060 can run in parallel
- **Phase 10**: T061, T062, T063, T064, T065 can all run in parallel (different aspects of accessibility)
- **Phase 11**: T070, T071, T072, T073 can all run in parallel (different optimizations)
- **Phase 12**: T079, T080, T081, T082 can all run in parallel (different browsers)
- **Phase 13**: All content verification tasks T088-T099 can run in parallel (different content areas)
- **Phase 14**: T100, T101, T102, T103, T104 can all run in parallel (different SEO elements)
- **Phase 15**: T110, T111, T112, T113 can all run in parallel (different code quality checks)

---

## Parallel Example: User Story 1

```bash
# Launch all component creation tasks for User Story 1 together:
Task T011: "Create placeholder hero image at health-app/public/images/hero-placeholder.png"
Task T012: "Create HeroSection Server Component in health-app/components/landing/hero-section.tsx"
Task T013: "Create CTAButton Client Component in health-app/components/landing/cta-button.tsx"
Task T014: "Create SmoothScrollButton Client Component in health-app/components/landing/smooth-scroll-button.tsx"
Task T015: "Create ProblemStatement Server Component in health-app/components/landing/problem-statement.tsx"

# Then sequentially:
Task T016: "Integrate all components into page.tsx" (depends on T012-T015)
Task T017: "Add trust messaging to hero CTA" (depends on T013)
Task T018: "Verify responsive layout" (depends on T016)
```

---

## Parallel Example: User Story 2

```bash
# Launch all component creation tasks for User Story 2 together:
Task T019: "Create SVG icons for features"
Task T020: "Create FeaturesSection Server Component"
Task T021: "Create BenefitsSection Server Component"
Task T022: "Create HowItWorksSection Server Component"

# Then sequentially:
Task T023: "Integrate components into page.tsx" (depends on T020-T022)
Task T024: "Configure smooth scroll button" (depends on T023)
Task T025: "Verify responsive layout" (depends on T023)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only) - 1 Day

1. Complete Phase 1: Setup (T001-T005) - 30 minutes
2. Complete Phase 2: Foundational (T006-T010) - 1 hour
3. Complete Phase 3: User Story 1 (T011-T018) - 4-5 hours
4. **STOP and VALIDATE**: Test User Story 1 independently with real users
5. Can deploy/demo MVP if hero and problem statement are sufficient

**MVP Delivers**: Clear value proposition, problem identification, primary CTA to signup

### Incremental Delivery - 3-4 Days

**Day 1**: Setup + Foundation + US1 (MVP)

- Complete Phases 1-3
- Deploy preview for stakeholder review

**Day 2**: US2 + US3

- Complete Phases 4-5 (Features + Pricing)
- Deploy preview with features and pricing

**Day 3**: US4 + US5 + Footer + Interactive

- Complete Phases 6-9 (FAQ, Signup, Footer, Analytics)
- Full feature-complete landing page

**Day 4**: Polish + Testing

- Complete Phases 10-15 (Accessibility, Performance, Testing, Polish)
- Production-ready deployment

### Parallel Team Strategy (If 3+ Developers)

With multiple developers:

1. **All together**: Complete Setup + Foundational (Phases 1-2) - 2 hours
2. **Split into parallel tracks** once Foundation done:
   - **Developer A**: User Story 1 (Phase 3) - MVP critical path
   - **Developer B**: User Story 2 + 3 (Phases 4-5) - Features + Pricing
   - **Developer C**: User Story 4 + 5 + Footer (Phases 6-8) - FAQ + Footer
3. **Developer A** completes MVP, helps with Interactive (Phase 9)
4. **All together**: Testing & Polish (Phases 10-15) - 4-6 hours

**Timeline**: 2-2.5 days with 3 developers

---

## Task Statistics

**Total Tasks**: 121
**Parallel Tasks**: 47 (marked with [P])
**User Story Breakdown**:

- Setup: 5 tasks
- Foundational: 5 tasks (BLOCKS all stories)
- User Story 1 (P1): 8 tasks 🎯 MVP
- User Story 2 (P2): 7 tasks
- User Story 3 (P3): 9 tasks
- User Story 4 (P4): 11 tasks
- User Story 5 (P5): 5 tasks
- Footer & Content: 6 tasks
- Interactive & Analytics: 4 tasks
- Accessibility: 9 tasks
- Performance: 9 tasks
- Cross-Browser Testing: 9 tasks
- Content Verification: 12 tasks
- SEO Verification: 10 tasks
- Polish & Final: 12 tasks

**Estimated Time**:

- Solo developer (sequential): 3-4 days
- With parallelization (2 devs): 2-3 days
- With parallelization (3+ devs): 2-2.5 days

**MVP Scope** (User Story 1 only): 18 tasks, ~1 day

---

## Notes

- [P] tasks = different files, no dependencies, can run in parallel
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Stop at any checkpoint to validate story independently
- Commit after completing each phase or user story
- No automated tests included (manual testing approach per quickstart.md)
- All file paths are relative to health-app/ directory
- Use shadcn/ui components (Button, Card) for consistency
- Use Tailwind CSS mobile-first approach (base → sm: → md: → lg:)
- All Server Components by default, 'use client' only when needed (CTAs, scroll tracking)
