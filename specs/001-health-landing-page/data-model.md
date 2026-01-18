# Data Model: Health App Landing Page

**Feature**: 001-health-landing-page  
**Date**: 2026-01-18  
**Status**: N/A - No New Data Entities

## Overview

The health app landing page is a **purely presentational feature** that does not introduce any new data entities to the system. All content is static or references existing entities for display purposes only.

## Existing Entities Referenced

### User (Existing)

**Purpose**: Referenced by signup CTAs  
**Location**: Defined in [`health-app/lib/db/schema.ts`](../../health-app/lib/db/schema.ts)  
**Usage in Feature**: Landing page links to `/sign-up` which creates new User records

**Schema** (for reference only):

```typescript
users {
  id: serial (primary key)
  name: varchar(100)
  email: varchar(255) unique, not null
  passwordHash: text, not null
  role: varchar(20), default 'member'
  createdAt: timestamp, not null
  updatedAt: timestamp, not null
  deletedAt: timestamp (soft delete)
}
```

**Landing Page Interaction**: None (write only via /sign-up form)

---

### Pricing Plans (Existing - Stripe)

**Purpose**: Displayed in pricing section  
**Location**: Managed in Stripe dashboard  
**Usage in Feature**: Landing page displays pricing information statically

**Display Data**:

- **Free Plan**: ¥0/month
  - Features: Water intake tracking, basic meal records, 3 months retention, 10MB storage
- **Premium Plan**: ¥500/month or ¥5,000/year
  - Features: All features unlocked, unlimited retention, 100MB storage, advanced analytics, fasting schedules, priority support

**Landing Page Interaction**: Read-only display (no API calls, static content)

---

## Static Content Model

While not database entities, the landing page contains structured static content that should be documented for maintainability:

### Section: Hero

```typescript
interface HeroContent {
  headline: string;          // "Track Your Health, All in One Place"
  subheadline: string;       // Unified tracking benefit explanation
  primaryCTA: {
    text: string;            // "Start Free"
    href: string;            // "/sign-up"
    badge?: string;          // "No credit card required"
  };
  secondaryCTA: {
    text: string;            // "See How It Works"
    scrollTarget: string;    // "#features"
  };
  heroImage: {
    src: string;             // "/images/hero-placeholder.png"
    alt: string;             // "Health tracking app interface"
  };
}
```

### Section: Problem Statement

```typescript
interface ProblemStatement {
  problems: Array<{
    title: string;           // e.g., "Managing multiple apps"
    description: string;     // Problem description
    icon?: string;          // Optional icon name
  }>;
}

// Expected: 3 problems
// 1. Managing 3+ different health tracking apps
// 2. Losing track of data across multiple platforms
// 3. Paying too much for basic health tracking features
```

### Section: Features

```typescript
interface Feature {
  id: string;                // "water" | "meals" | "fasting"
  name: string;              // "Water Intake Tracking"
  description: string;       // Feature description
  capabilities: string[];    // ["visual progress indicators", ...]
  icon: string;             // Lucide icon name (e.g., "Droplets")
}

// Expected: 3 features (water, meals, fasting)
```

### Section: Benefits

```typescript
interface Benefit {
  title: string;             // "Unified Data"
  description: string;       // Benefit description
  icon?: string;            // Optional icon
}

// Expected: 4 benefits
// 1. Unified data in one place
// 2. Works on any device (PWA)
// 3. Privacy-focused
// 4. Affordable pricing
```

### Section: How It Works

```typescript
interface Step {
  number: number;            // 1, 2, 3
  title: string;             // "Sign up"
  description: string;       // Step description
}

// Expected: 3 steps
// 1. Sign up in seconds
// 2. Start logging your daily health data
// 3. Track your progress with visual insights
```

### Section: Pricing

```typescript
interface PricingPlan {
  name: string;              // "Free Plan" | "Premium Plan"
  price: {
    monthly: number;         // 0 or 500
    annual?: number;         // 5000 for Premium
    currency: string;        // "JPY"
  };
  features: string[];        // List of features
  highlighted?: boolean;     // true for "Most Popular"
  cta: {
    text: string;            // "Start Free" | "Upgrade to Premium"
    href: string;            // "/sign-up"
  };
}
```

### Section: FAQ

```typescript
interface FAQItem {
  question: string;
  answer: string;
  category?: string;         // "privacy" | "billing" | "technical"
}

// Expected: 6 questions (from FR-017)
// 1. Is my data private?
// 2. Can I export my data?
// 3. What payment methods do you accept?
// 4. Can I cancel anytime?
// 5. Do you offer refunds?
// 6. Is there a mobile app?
```

### Section: Footer

```typescript
interface FooterNav {
  sections: Array<{
    title?: string;
    links: Array<{
      text: string;
      href: string;
      external?: boolean;
    }>;
  }>;
  copyright: string;         // "© 2026 n-recipes"
  socialLinks?: Array<{      // Placeholders for future
    platform: string;
    href: string;
    icon: string;
  }>;
}
```

## Data Flow Diagram

```
Landing Page (Static Content)
       │
       ├─► Display Hero Content
       ├─► Display Problems
       ├─► Display Features
       ├─► Display Benefits
       ├─► Display How It Works
       ├─► Display Pricing (static, no API call)
       ├─► Display FAQ
       └─► Display Footer
       
       CTA Clicks ──► /sign-up route ──► User Creation (existing flow)
                                             │
                                             └─► users table (existing)
```

## Content Management

### Current Approach

- All content hardcoded in React components
- Suitable for MVP where content changes are infrequent
- Easy to update via code changes

### Future Considerations

If content needs to be updated frequently without deployments:

- Consider moving to CMS (Sanity, Contentful, or Strapi)
- Or JSON files in repository for easier non-developer edits
- Or database table for dynamic content

**Recommendation for MVP**: Keep hardcoded. Re-evaluate after 3-6 months based on update frequency.

## Validation Rules

Since this is static content, validation is compile-time only:

### TypeScript Validation

- All content interfaces defined with proper types
- Required fields enforced at compile time
- IDE autocomplete prevents typos

### Content Validation

- Headline length: < 60 characters (for SEO and readability)
- Meta description: < 160 characters (SEO best practice)
- Feature descriptions: 2-3 sentences (readability)
- FAQ answers: 2-4 sentences (conciseness)
- CTA button text: < 20 characters (mobile width constraint)

## Localization Considerations

**Current**: English only (en-US)  
**Future**: If internationalization needed:

- Use next-intl or similar i18n library
- Extract all strings to translation files
- Structure: `locales/en.json`, `locales/ja.json`, etc.
- Pricing display supports JPY currently, easily extended to other currencies

**Implementation Priority**: Low (not in MVP scope)

## Analytics Data (Non-persistent)

While not stored in the database, the landing page generates analytics events:

```typescript
// Google Analytics 4 Events
interface AnalyticsEvent {
  event_name: 'page_view' | 'cta_click' | 'scroll_depth' | 'faq_interaction';
  parameters: {
    page_location?: string;
    location?: 'hero' | 'pricing' | 'footer';  // For CTA clicks
    scroll_percentage?: 25 | 50 | 75 | 100;     // For scroll depth
    faq_question?: string;                       // For FAQ interactions
  };
}
```

**Storage**: Google Analytics servers (not our database)  
**Retention**: Per GA4 settings (default: 14 months)  
**Privacy**: IP anonymization enabled, no PII tracked

## Summary

| Aspect | Status | Notes |
|--------|--------|-------|
| New Database Tables | ❌ None | Purely presentational feature |
| New API Endpoints | ❌ None | Uses existing /sign-up only |
| Database Migrations | ❌ None | No schema changes needed |
| Existing Data Used | ✅ Users (reference only) | Via signup flow |
| Static Content | ✅ Defined | Documented above for maintainability |
| Analytics Events | ✅ Defined | Non-persistent, GA4 only |
| Localization | ❌ Not implemented | English only for MVP |

**Data Model Status**: ✅ COMPLETE (N/A for presentational feature)  
**Ready for Implementation**: YES  
**Database Changes Required**: NONE
