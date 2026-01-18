<!--
SYNC IMPACT REPORT
==================
Version: 1.0.0 → 1.1.0 (Updated to reflect actual implementation)
Ratification Date: 2026-01-18
Last Amended: 2026-01-18

Changes in 1.1.0:
- Updated authentication to reflect JWT + bcryptjs implementation (not Supabase Auth)
- Updated database to reflect direct PostgreSQL usage (not Supabase)
- Updated RLS guidance to reflect application-level security
- Added actual technology stack details (Stripe, SWR, shadcn/ui specifics)
- Updated Next.js version to 15.6.0-canary.59 with PPR enabled
- Added middleware-based authentication details
- Updated cost considerations to reflect actual infrastructure

Principles Established:
- I. API-First Architecture
- II. Data Isolation & Privacy
- III. Type Safety & Validation
- IV. Environment Separation
- V. Cost-Conscious Design
- VI. Progressive Enhancement
- VII. Test Infrastructure
- VIII. Documentation & Maintenance

Templates Status:
✅ .specify/templates/plan-template.md - Constitution Check section compatible
✅ .specify/templates/spec-template.md - Requirements alignment verified
✅ .specify/templates/tasks-template.md - Task categorization aligned
✅ .specify/templates/commands/*.md - Generic guidance confirmed

Follow-up Actions:
- Consider implementing database-level RLS if Supabase is adopted in future
- Document current application-level security implementation
-->

# Health App Constitution

**Domain**: health.n-recipes.com | **Family**: n-recipes services

## Core Principles

### I. API-First Architecture

All business logic MUST reside in API routes (Next.js Route Handlers). Client-side code is restricted to UI/UX and presentation concerns only. This principle ensures:

- Business rules are enforced server-side where they cannot be bypassed
- APIs can serve multiple client types (Web, iOS, Android) without code duplication
- Security validations happen in a trusted environment
- Future cross-platform expansion requires minimal backend changes

**Rationale**: Building for web-first but designing for eventual native mobile clients eliminates costly rewrites and ensures consistent business logic across all platforms.

### II. Data Isolation & Privacy

User data MUST be strictly isolated at the application level. Every query MUST be scoped to the authenticated user through middleware and application logic. Additional requirements:

- No data mixing between users under any circumstances
- Session-based authentication with JWT tokens stored in HTTP-only cookies
- Team-based multi-tenancy with role-based access control (Owner/Member)
- Middleware enforces authentication on protected routes
- Minimize data footprint (text-only records, no unnecessary duplication)
- Design for data portability (users can export their data)
- Apply GDPR-like principles even for personal/prototype use

**Rationale**: Privacy-first design prevents entire classes of data leakage bugs and builds trust. Application-level security with proper middleware and query scoping provides strong isolation. Database-level RLS can be added later if needed.

### III. Type Safety & Validation

TypeScript MUST be used throughout with strict mode enabled. Input validation MUST occur at multiple layers:

- Server-side validation is MANDATORY and authoritative (never trust client data)
- Client-side validation for UX only (fast feedback to users)
- Drizzle ORM provides type-safe database queries
- Zod schemas validate API inputs/outputs
- shadcn/ui components provide type-safe UI primitives

**Rationale**: Type safety catches errors at compile time. Multi-layer validation prevents invalid data from entering the system while maintaining good UX.

### IV. Environment Separation

Infrastructure MUST maintain clear environment boundaries:

- PostgreSQL: Separate databases for development and production
- Stripe: Separate test and production environments with distinct API keys
- Vercel: Preview deployments for development, production deployment for main branch
- Environment variables manage all environment-specific configuration (.env file)
- Secrets and API keys MUST NEVER be committed to version control

Required environment variables:

- `POSTGRES_URL`: PostgreSQL connection string
- `STRIPE_SECRET_KEY`: Stripe API secret key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook signing secret
- `BASE_URL`: Application base URL
- `AUTH_SECRET`: JWT signing secret (generate with `openssl rand -base64 32`)

**Rationale**: Environment separation prevents test data from polluting production and protects production credentials. Separate databases ensure complete isolation between environments.

### V. Cost-Conscious Design

Architecture decisions MUST consider infrastructure costs with a target of $0-60/month:

- Optimize database queries to minimize bandwidth usage
- Implement efficient Drizzle queries (avoid N+1 patterns)
- Monitor Vercel function execution times and optimize serverless function usage
- Track usage metrics (data_size, record_count) to enforce plan limits
- Build subscription model into core design with Stripe integration
- Use React Server Components to reduce client-side JavaScript
- Leverage Next.js PPR (Partial Prerendering) for optimal performance

Infrastructure costs breakdown:

- PostgreSQL hosting: Variable (consider managed services like Neon, Railway, or Supabase)
- Vercel: Free tier for development, Pro plan for production if needed
- Stripe: Pay per transaction (2.9% + $0.30 per successful charge)

**Rationale**: Sustainable costs enable long-term viability. Efficient architecture and monitoring prevent surprise bills. Subscription model provides predictable revenue to offset infrastructure costs.

### VI. Progressive Enhancement

User experience MUST prioritize core functionality with progressive enhancements:

- Mobile-first responsive design using shadcn/ui components
- Progressive Web App (PWA) capabilities for app-like experience
- Fast page loads through React Server Components
- Graceful degradation when offline (where feasible)
- Clear visual feedback for all user actions
- Design patterns that work across web, iOS, and Android

**Rationale**: Starting with PWA provides app-like experience immediately while keeping options open for native apps. Mobile-first ensures good experience on all devices.

### VII. Test Infrastructure

Testing MUST focus on critical paths and API contracts:

- Unit tests for business logic in API routes (REQUIRED for complex logic)
- Database query and RLS policy validation (REQUIRED)
- Stripe webhook handler testing (REQUIRED before production)
- API endpoint testing with various authentication states
- React component testing (OPTIONAL unless complex state logic)

**Rationale**: Testing business logic and security boundaries provides maximum confidence with minimal overhead. UI testing can be lighter since TypeScript catches many UI bugs.

### VIII. Documentation & Maintenance

Code and architecture MUST be documented for future maintainability:

- Complex business logic requires inline comments
- Data schemas documented in Drizzle definitions
- API routes documented for future client implementations
- Database migrations never manual (always through Drizzle)
- Git commits use meaningful messages
- Environment setup documented in README

**Rationale**: Solo or small team projects benefit most from documentation. Future you (or future team members) will thank present you for clear explanations.

## Technology Standards

### Required Stack

- **Framework**: Next.js 15.6.0-canary.59 with App Router
  - React 19.1.0
  - Turbopack for development
  - PPR (Partial Prerendering) enabled
  - Client Segment Cache enabled
- **Language**: TypeScript 5.8.3 with strict mode
- **Database**: PostgreSQL (direct connection via `postgres` package)
- **ORM**: Drizzle ORM 0.43.1 with type-safe queries
- **Authentication**: Custom JWT sessions with jose library
  - Password hashing with bcryptjs
  - HTTP-only cookies for session storage
  - Middleware-based route protection
- **Payments**: Stripe 18.1.0 with webhooks for subscription lifecycle
- **UI Library**: shadcn/ui components (Radix UI 1.4.2 based)
  - Tailwind CSS 4.1.7 for styling
  - Lucide React 0.511.0 for icons
  - class-variance-authority for component variants
- **Data Fetching**: SWR 2.3.3 for client-side data fetching
- **Validation**: Zod 3.24.4 for schema validation
- **Deployment**: Vercel (preview + production environments)

### Architecture Patterns

- **Next.js App Router**: File-based routing with Server Components and route groups
- **API Routes**: Route Handlers in `app/api/*` for business logic
  - `/api/user` - User management
  - `/api/team` - Team management
  - `/api/stripe/checkout` - Stripe checkout session creation
  - `/api/stripe/webhook` - Stripe webhook handler
- **Database Access**: Drizzle queries only (never raw SQL except migrations)
- **Authentication Flow**:
  - Middleware checks session cookie on every request
  - Protected routes redirect to `/sign-in` if unauthenticated
  - JWT tokens auto-refresh on valid requests (24-hour expiry)
- **Server Actions**: Used for form submissions in login/signup flows
- **Application-level Security**: Query scoping in Drizzle queries, not database RLS
- **Error Handling**: Consistent response formats, proper HTTP status codes
- **State Management**: React Server Components + SWR for client state + minimal React state

### Code Organization

```
health-app/
├── app/                          # Next.js App Router
│   ├── (dashboard)/             # Protected routes (middleware-enforced)
│   │   ├── dashboard/           # Main dashboard pages
│   │   │   ├── activity/       # Activity logs
│   │   │   ├── general/        # General settings
│   │   │   └── security/       # Security settings
│   │   ├── pricing/            # Pricing and subscription
│   │   ├── layout.tsx          # Dashboard layout
│   │   ├── page.tsx            # Landing page
│   │   └── terminal.tsx        # Terminal animation component
│   ├── (login)/                 # Public auth routes
│   │   ├── sign-in/            # Sign in page
│   │   ├── sign-up/            # Sign up page
│   │   ├── login.tsx           # Login form component
│   │   └── actions.ts          # Auth server actions
│   ├── api/                     # API routes (business logic)
│   │   ├── stripe/             # Stripe integration
│   │   │   ├── checkout/       # Checkout session creation
│   │   │   └── webhook/        # Webhook handler
│   │   ├── team/               # Team management endpoints
│   │   └── user/               # User management endpoints
│   ├── layout.tsx              # Root layout with SWR config
│   ├── globals.css             # Global styles
│   └── not-found.tsx           # 404 page
├── components/                  # React components
│   └── ui/                     # shadcn/ui primitives
│       ├── avatar.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── radio-group.tsx
├── lib/                        # Shared utilities
│   ├── auth/                   # Session management
│   │   ├── middleware.ts       # Local middleware utilities
│   │   └── session.ts          # JWT sign/verify functions
│   ├── db/                     # Database layer
│   │   ├── schema.ts           # Drizzle schema definitions
│   │   ├── queries.ts          # Reusable query functions
│   │   ├── drizzle.ts          # Drizzle client setup
│   │   ├── setup.ts            # Database setup script
│   │   ├── seed.ts             # Seed data script
│   │   └── migrations/         # Database migrations
│   ├── payments/               # Stripe integration
│   │   ├── stripe.ts           # Stripe client
│   │   └── actions.ts          # Payment actions
│   └── utils.ts                # Utility functions
├── middleware.ts               # Global auth middleware
├── next.config.ts              # Next.js configuration
├── drizzle.config.ts           # Drizzle Kit configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

### Database Schema

Main tables (defined in [`lib/db/schema.ts`](health-app/lib/db/schema.ts)):

- **users**: User accounts with email/password authentication
  - Fields: id, name, email, passwordHash, role, timestamps
- **teams**: Organizations/teams with Stripe subscription data
  - Fields: id, name, stripeCustomerId, stripeSubscriptionId, planName, subscriptionStatus
- **team_members**: Many-to-many relationship with roles
  - Fields: id, userId, teamId, role (Owner/Member), joinedAt
- **activity_logs**: Audit trail of user actions
  - Fields: id, teamId, userId, action, timestamp, ipAddress
- **invitations**: Team invitation system
  - Fields: id, teamId, email, role, invitedBy, status

Activity types tracked: SIGN_UP, SIGN_IN, SIGN_OUT, UPDATE_PASSWORD, DELETE_ACCOUNT, UPDATE_ACCOUNT, CREATE_TEAM, REMOVE_TEAM_MEMBER, INVITE_TEAM_MEMBER, ACCEPT_INVITATION

## Development Workflow

### Database Changes

1. Update schema in [`lib/db/schema.ts`](health-app/lib/db/schema.ts)
2. Generate migration: `pnpm db:generate`
3. Review generated SQL in `lib/db/migrations/`
4. Apply migration: `pnpm db:migrate`
5. Never manually edit database or run raw SQL

### Feature Development

1. Design API contract first (inputs, outputs, errors)
2. Implement API route with validation
3. Test API route independently
4. Build UI that consumes the API
5. Test end-to-end flow
6. Document complex logic

### Testing Strategy

1. Write tests for API routes with complex business logic
2. Test RLS policies to prevent data leakage
3. Test Stripe webhooks in test mode
4. Validate error handling and edge cases
5. Manual testing for UI/UX flows

### Deployment Process

1. Push to feature branch → Vercel preview deployment
2. Test in preview environment
3. Merge to main → automatic production deployment
4. Monitor production for errors
5. Stripe webhooks point to production API

## Governance

### Amendment Procedure

1. Propose amendment with rationale
2. Document impact on existing code and practices
3. Update constitution with version increment
4. Update affected templates and documentation
5. Communicate changes to all contributors

### Versioning Policy

- **MAJOR** (X.0.0): Backward incompatible principle changes, principle removals
- **MINOR** (0.X.0): New principles added, material expansions
- **PATCH** (0.0.X): Clarifications, wording improvements, non-semantic fixes

### Compliance Review

- All code reviews MUST verify compliance with core principles
- API routes MUST validate inputs server-side
- Database queries MUST use Drizzle ORM
- User data MUST be isolated with RLS
- Costs MUST be monitored against budget
- Complexity MUST be justified

### Runtime Guidance

For day-to-day development guidance, refer to:

- README.md for environment setup
- Drizzle schema files for data models
- API route files for endpoint contracts
- This constitution for architectural decisions

**Version**: 1.0.0 | **Ratified**: 2026-01-18 | **Last Amended**: 2026-01-18
