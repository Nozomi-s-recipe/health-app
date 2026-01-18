<!--
SYNC IMPACT REPORT
==================
Version Change: Initial → 1.0.0
Constitution Type: New constitution creation
Rationale: MINOR version (1.0.0) - Initial constitution establishment with 10 core principles

Modified Principles: N/A (initial creation)
Added Sections:
  - Core Principles (10 principles covering architecture, quality, privacy, testing, performance, UX, cross-platform, development practices, business constraints)
  - Technical Standards
  - Development Workflow
  - Governance

Templates Status:
  ✅ plan-template.md - Reviewed, constitution check gate aligns with new principles
  ✅ spec-template.md - Reviewed, user story structure supports API-first and cross-platform design
  ✅ tasks-template.md - Reviewed, task organization supports independent testing of API and client layers

Follow-up TODOs: None - all placeholders filled

Commit Message: docs: establish constitution v1.0.0 (health app governance principles)
-->

# Health Management App Constitution

## Core Principles

### I. API-First Architecture

Business logic MUST be implemented in API routes (Next.js Route Handlers), not in client components. All server-side endpoints MUST validate inputs independently of client validation. APIs MUST be designed to support multiple client types (Web, iOS, Android) with consistent response formats and proper HTTP status codes.

**Rationale**: Ensures security through server-side validation, enables future cross-platform expansion, and maintains clear separation between business logic and presentation layers.

### II. Code Quality & Architecture

MUST use Next.js App Router with TypeScript for type safety. Components MUST follow single responsibility principle and remain small and focused. MUST implement proper error boundaries and comprehensive error handling. Code readability MUST be prioritized over cleverness. MUST maintain clean separation of concerns (UI, business logic, data access).

**Rationale**: Type safety prevents runtime errors, focused components improve maintainability, proper error handling ensures reliability, and clear separation enables independent testing and evolution of each layer.

### III. Data Privacy & Isolation

All user data MUST be strictly isolated using multi-tenant design with Row Level Security (RLS). Data MUST never mix between users at the database level. Storage footprint MUST be minimized (text-only records, no unnecessary duplication). Data MUST be designed for portability (users can export their data). GDPR-like principles MUST be followed.

**Rationale**: Privacy is non-negotiable for health data. RLS provides defense-in-depth beyond application logic. Text-only storage keeps costs predictable. Data portability builds user trust and enables migration flexibility.

### IV. Security in Depth

Supabase RLS MUST be used as an additional security layer, never as the only security mechanism. All API routes MUST perform independent authentication and authorization checks. Input validation MUST occur server-side with client-side validation treated as UX enhancement only. MUST never trust client-provided data.

**Rationale**: Multiple security layers prevent single point of failure. RLS protects against application bugs but cannot replace proper API security. Server-side validation is the only trustworthy validation.

### V. Testing & Reliability

Unit tests MUST cover critical business logic, especially API routes. Database queries and RLS policies MUST be tested. Data constraints MUST be validated at both client and server levels. Edge cases MUST be handled gracefully (network failures, invalid inputs). API endpoints MUST be tested with various authentication states.

**Rationale**: Business logic in APIs is the core value - it must be tested. RLS policies are code and require testing. Graceful degradation improves user experience. Authentication testing prevents security gaps.

### VI. Performance & Scalability

MUST optimize for low database storage (text-based records). Design MUST respect Supabase free tier limits (500MB storage, 5GB bandwidth). Queries MUST be efficient (proper indexing, avoid N+1 queries). React Server Components MUST be used where appropriate to reduce client bundle. API responses MUST be cached where appropriate.

**Rationale**: Free tier constraints drive efficient design. Text-only storage is sufficient and keeps costs near zero. Efficient queries prevent performance degradation at scale. Smaller bundles improve mobile experience.

### VII. User Experience & Cross-Platform

MUST implement Progressive Web App (PWA) capabilities. Design MUST be mobile-first and responsive. Page loads MUST be fast with smooth interactions. User actions MUST have clear visual feedback. MUST degrade gracefully when offline (where feasible). UI/UX patterns MUST work across Web, iOS, and Android.

**Rationale**: PWA enables app-like experience without app store friction. Mobile-first acknowledges primary usage pattern. Fast loads retain users. Clear feedback builds confidence. Cross-platform patterns reduce future rework.

### VIII. Cross-Platform Strategy

MUST build as PWA first with app-like experience. Business logic MUST remain platform-agnostic in API layer. Code structure MUST support potential Capacitor integration. API contracts MUST be designed to serve multiple client types. Responsive design patterns MUST work on all screen sizes.

**Rationale**: PWA provides immediate value with lowest friction. Platform-agnostic APIs enable native apps later without rewriting backend. Capacitor-ready structure reduces future migration costs. Consistent APIs simplify multi-platform development.

### IX. Development Practices

MUST use Git with meaningful commit messages. Complex business logic and data schemas MUST be documented. Configuration MUST use environment variables. Plan for future features without over-engineering present needs. Iterate quickly and validate assumptions early. API documentation MUST be written for future client implementations.

**Rationale**: Git history tells the story of decisions. Documentation reduces onboarding friction. Environment variables enable deployment flexibility. YAGNI prevents premature optimization. Early validation reduces wasted effort. API docs enable independent client development.

### X. Business Constraints & Monetization

Design MUST support freemium model from day one (plan_type in users table). Usage tracking (data_size, record_count) MUST be implemented for tier enforcement. Feature flags system MUST be built for plan-based access control. Infrastructure costs MUST remain predictable and low ($0-60/month target). Plan limits MUST be enforced in API layer, not just UI. Usage metrics MUST be tracked server-side for accurate billing.

**Rationale**: Freemium requires forethought - adding later breaks assumptions. Server-side tracking prevents gaming the system. API enforcement ensures limits cannot be bypassed. Low costs enable sustainable solo operation. Accurate metrics protect business viability.

## Technical Standards

### Domain & Branding

- Primary domain: health.n-recipes.com
- Part of n-recipes family of services
- Maintain consistent branding with other n-recipes services

### Technology Stack

- Frontend: Next.js 14+ App Router with TypeScript
- Backend: Next.js API Routes (Route Handlers)
- Database: Supabase (PostgreSQL with RLS)
- Auth: Supabase Auth
- Deployment: Vercel or similar edge platform

### Code Organization

- Follow Next.js App Router conventions
- Separate API logic from UI components
- Use TypeScript strict mode
- Implement proper type definitions for all data structures

## Development Workflow

### Version Control

- Feature branch workflow (feature/###-description)
- Meaningful commit messages following conventional commits
- Code review before merging to main

### Testing Requirements

- Unit tests for API route business logic
- RLS policy testing
- Edge case validation
- Authentication state testing

### Documentation Requirements

- API endpoint documentation
- Data schema documentation
- Complex business logic explanation
- Setup and deployment instructions

## Governance

This constitution supersedes all other practices and guidelines. All development decisions, code reviews, and architectural choices MUST be evaluated against these principles.

### Amendment Process

1. Proposed changes MUST be documented with rationale
2. Changes MUST include impact analysis on existing code/architecture
3. Version MUST be incremented according to semantic versioning:
   - MAJOR: Backward incompatible principle changes or removals
   - MINOR: New principles added or material expansions
   - PATCH: Clarifications, wording improvements, non-semantic refinements
4. All dependent templates and documentation MUST be updated

### Compliance Review

- Constitution compliance MUST be verified during code review
- Violations MUST be justified in plan documentation (Complexity Tracking section)
- Unjustified violations MUST be rejected

### Enforcement

- All PRs MUST pass constitution check before approval
- Architecture decisions MUST reference relevant principles
- Complexity MUST be justified against simpler alternatives
- Runtime development guidance lives in project documentation

**Version**: 1.0.0 | **Ratified**: 2026-01-18 | **Last Amended**: 2026-01-18
