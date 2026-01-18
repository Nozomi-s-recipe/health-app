
# Research & Technical Decisions: Health App Landing Page

**Feature**: 001-health-landing-page  
**Date**: 2026-01-18  
**Status**: Complete

## Overview

This document captures technical research, decisions, and rationale for implementing the health app landing page. All decisions align with the project constitution and optimize for conversion, performance, and maintainability.

## Decision 1: Component Architecture Strategy

**Decision**: Use React Server Components for all static content sections, with targeted Client Components only for interactive features (smooth scroll, analytics events).

**Rationale**:

- Server Components reduce JavaScript bundle size significantly (estimated 40-60% reduction)
- Static content (hero, features, FAQ) benefits from server-side rendering for SEO
- Improves Core Web Vitals (LCP) by sending HTML faster
- Client Components only needed for:
  - Smooth scroll behavior on "See How It Works" button
  - Google Analytics event tracking on CTA clicks
  - Intersection Observer for scroll depth tracking

**Alternatives Considered**:

1. **Full Client-Side Rendering**: Rejected - Poor SEO, slower initial load, violates Constitution Principle VI
2. **All Server Components**: Rejected - Can't handle interactive features like analytics and smooth scroll
3. **Traditional SSG (Static Site Generation)**: Rejected - Next.js App Router with Server Components provides better DX and same benefits

**Implementation Pattern**:

```typescript
// Server Component (default)
export default function HeroSection() {
  return (
    <section>
      <h1>Track Your Health, All in One Place</h1>
      <CTAButton href="/sign-up">Start Free</CTAButton>
    </section>
  );
}

// Client Component (when needed)
'use client'
export function SmoothScrollButton({ targetId }: { targetId: string }) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };
  return <Button onClick={handleClick}>See How It Works</Button>;
}
```

**References**:

- [Next.js Server Components Documentation](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [React Server Components RFC](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md)

---

## Decision 2: Image Strategy & Optimization

**Decision**: Use placeholder images initially with next/image component, optimize as WebP with PNG fallback, implement lazy loading for below-the-fold images.

**Rationale**:

- next/image provides automatic optimization (format conversion, resizing, lazy loading)
- WebP format reduces file size by 25-35% vs PNG while maintaining quality
- Placeholder images allow implementation to proceed without blocking on asset creation
- Lazy loading improves initial page load (LCP) by deferring non-critical images
- Aligns with FR-034 (optimize images, modern formats) and Constitution Principle V (cost-conscious)

**Image Specifications**:

- **Hero Image**: 1200x800px (2400x1600px @2x), WebP + PNG fallback, priority loading
- **Feature Icons**: SVG format (scalable, small file size), inline in component
- **Pricing Cards**: No images needed, use shadcn/ui Card component styling
- **FAQ Section**: No images needed

**Alternatives Considered**:

1. **External CDN (Cloudinary, Imgix)**: Rejected - Adds cost, Next.js optimization sufficient
2. **AVIF format**: Rejected - Browser support still limited (Safari only recently added), WebP provides good balance
3. **Manual optimization**: Rejected - next/image handles this automatically

**Implementation Pattern**:

```typescript
import Image from 'next/image';

// Hero image (above fold, priority)
<Image
  src="/images/hero-placeholder.png"
  alt="Health tracking app interface"
  width={1200}
  height={800}
  priority
  className="rounded-lg"
/>

// Feature icons (SVG, inline)
<Water className="h-12 w-12 text-blue-500" />
```

**Performance Impact**: Estimated 30-40% reduction in image payload, 0.5-1s improvement in LCP.

**References**:

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [WebP Browser Support](https://caniuse.com/webp)

---

## Decision 3: Google Analytics 4 Integration

**Decision**: Implement Google Analytics 4 with gtag.js for page views, custom events for CTA clicks, and Intersection Observer for scroll depth tracking.

**Rationale**:

- GA4 is the current standard (Universal Analytics deprecated July 2023)
- Provides all metrics needed for success criteria (SC-002, SC-004, SC-009)
- gtag.js is the official Google-recommended implementation
- Free tier sufficient for expected traffic volume
- Aligns with Constitution Principle V (cost-conscious) and clarification decision

**Events to Track**:

1. **Page View**: Automatic via gtag config
2. **CTA Click**: Custom event `cta_click` with parameters `{location: 'hero'|'pricing'|'footer', action: 'start_free'}`
3. **Scroll Depth**: Custom events at 25%, 50%, 75%, 100% using Intersection Observer
4. **FAQ Interaction**: Optional custom event for FAQ expand/collapse

**Alternatives Considered**:

1. **Plausible Analytics**: Rejected - Less feature-complete for conversion tracking, paid service
2. **Mixpanel**: Rejected - Overkill for landing page, paid service
3. **Custom Analytics**: Rejected - Reinventing wheel, no built-in reporting dashboard

**Implementation Pattern**:

```typescript
// app/layout.tsx (Server Component)
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `}
</Script>

// components/landing/cta-button.tsx (Client Component)
'use client'
export function CTAButton({ location }: { location: string }) {
  const handleClick = () => {
    gtag('event', 'cta_click', {
      location,
      action: 'start_free'
    });
  };
  return <Button onClick={handleClick} asChild>
    <Link href="/sign-up">Start Free</Link>
  </Button>;
}
```

**Privacy Considerations**: GA4 uses cookieless tracking options, complies with GDPR when configured properly. Consider adding cookie consent banner in future if targeting EU users.

**References**:

- [GA4 Setup Guide](https://developers.google.com/analytics/devguides/collection/ga4)
- [Next.js Analytics Integration](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)

---

## Decision 4: Accessibility Implementation (WCAG 2.1 AA)

**Decision**: Implement comprehensive accessibility using semantic HTML, ARIA labels, keyboard navigation support, and color contrast ratios meeting WCAG 2.1 AA standards.

**Rationale**:

- FR-035 explicitly requires WCAG 2.1 AA compliance
- SC-010 measures screen reader accessibility
- shadcn/ui components are built on Radix UI which provides accessibility primitives
- Constitution Principle VI emphasizes progressive enhancement
- Accessibility improves SEO (search engines favor accessible sites)

**Implementation Requirements**:

### 1. Semantic HTML Structure

```html
<header>
  <nav aria-label="Main navigation">
    <a href="/">Home</a>
    <a href="/pricing">Pricing</a>
  </nav>
</header>

<main>
  <section aria-labelledby="hero-heading">
    <h1 id="hero-heading">Track Your Health, All in One Place</h1>
  </section>
  
  <section aria-labelledby="features-heading">
    <h2 id="features-heading">Features</h2>
  </section>
</main>

<footer>
  <nav aria-label="Footer navigation">
    <!-- Footer links -->
  </nav>
</footer>
```

### 2. Keyboard Navigation

- All interactive elements reachable via Tab
- Skip to main content link (hidden until focused)
- Focus indicators visible (outline on :focus-visible)
- Modal dialogs trap focus (if FAQ uses accordions)

### 3. Color Contrast

- Text: Minimum 4.5:1 ratio for normal text, 3:1 for large text
- Interactive elements: 3:1 ratio for UI components
- Test with axe DevTools or WebAIM Color Contrast Checker

### 4. Screen Reader Support

- Descriptive alt text for all images
- ARIA labels for icon-only buttons
- Live regions for dynamic content (if any)
- Proper heading hierarchy (h1 → h2 → h3, no skips)

### 5. Forms & Interactive Elements

- Labels associated with inputs (for attribute + id)
- Error messages linked via aria-describedby
- Required fields marked with aria-required
- Button labels descriptive (not just "Click here")

**Testing Tools**:

- **Automated**: axe DevTools, Lighthouse Accessibility audit
- **Manual**: NVDA (Windows), VoiceOver (Mac/iOS), keyboard-only navigation
- **Color**: WebAIM Color Contrast Checker, Stark plugin

**Alternatives Considered**:

1. **WCAG 2.1 AAA**: Rejected - Overly strict for MVP, AA is industry standard
2. **Basic accessibility only**: Rejected - Violates FR-035 requirement

**References**:

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Radix UI Accessibility](https://www.radix-ui.com/primitives/docs/overview/accessibility)
- [Next.js Accessibility](https://nextjs.org/docs/app/building-your-application/accessibility)

---

## Decision 5: SEO Optimization Strategy

**Decision**: Implement comprehensive SEO with server-side rendering, Open Graph tags, structured data (JSON-LD), and semantic HTML for maximum search visibility.

**Rationale**:

- FR-028 requires server-side rendering for SEO
- FR-029 requires structured data markup
- SC-016, SC-017, SC-018 measure SEO success
- Landing page is primary entry point, must rank well
- Constitution Principle VI supports progressive enhancement including SEO

**SEO Components**:

### 1. Metadata (app/layout.tsx)

```typescript
export const meta Metadata = {
  title: 'Track Your Health, All in One Place | health.n-recipes.com',
  description: 'Unified health tracking for water intake, meals, and fasting. Simple, private, affordable. Free plan available.',
  keywords: ['health tracking app', 'water tracker', 'meal tracker', 'fasting tracker', 'health app'],
  authors: [{ name: 'n-recipes' }],
  openGraph: {
    title: 'Track Your Health, All in One Place',
    description: 'Unified health tracking for water intake, meals, and fasting',
    url: 'https://health.n-recipes.com',
    siteName: 'health.n-recipes.com',
    images: [
      {
        url: 'https://health.n-recipes.com/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Health tracking app interface'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Track Your Health, All in One Place',
    description: 'Unified health tracking for water intake, meals, and fasting',
    images: ['https://health.n-recipes.com/images/twitter-image.png']
  }
};
```

### 2. Structured Data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "health.n-recipes.com",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY",
    "description": "Free plan with water tracking and basic meal records"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "150"
  }
}
```

### 3. Semantic HTML

- Proper heading hierarchy (h1 once, h2 for sections, h3 for subsections)
- `<article>` for feature descriptions
- `<section>` for major page divisions
- `<nav>` for navigation areas
- `<footer>` for footer content

### 4. URL Structure

- Clean URLs (no query parameters for static content)
- Descriptive slugs (not applicable for single-page landing)
- Canonical URL specified in metadata

### 5. Performance for SEO

- Fast page load (LCP < 2.5s) - Google ranking factor
- Mobile-friendly (responsive design) - Mobile-first indexing
- HTTPS enforced (Vercel default) - Security signal

**Monitoring**:

- Google Search Console for indexing status and search performance
- Track keyword rankings: "health tracking app", "water meal fasting tracker"
- Monitor click-through rate (CTR) from search results

**Alternatives Considered**:

1. **Client-side only**: Rejected - Poor SEO, violates FR-028
2. **Minimal SEO**: Rejected - Landing page needs maximum visibility
3. **Paid SEO tools**: Rejected - Free tools (GSC, GA4) sufficient for MVP

**References**:

- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google Search Central](https://developers.google.com/search/docs)
- [Schema.org SoftwareApplication](https://schema.org/SoftwareApplication)

---

## Decision 6: Performance Optimization Strategy

**Decision**: Implement comprehensive performance optimization targeting Core Web Vitals with React Server Components, image optimization, code splitting, and font optimization.

**Rationale**:

- SC-005 requires specific Core Web Vitals targets (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- SC-006 requires hero content in < 2 seconds
- SC-007 requires Lighthouse 90+ scores
- Constitution Principle V emphasizes cost-conscious design (efficient = cheaper Vercel bills)
- Google uses Core Web Vitals as ranking factor

**Optimization Techniques**:

### 1. Largest Contentful Paint (LCP < 2.5s)

**Target**: Hero section image + headline

- Use next/image with `priority` prop for hero image
- Server-side render critical content
- Preload critical resources
- Optimize font loading (font-display: swap)
- Minimize JavaScript before LCP

### 2. First Input Delay (FID < 100ms)

**Target**: Button clicks, scroll interactions

- Minimize JavaScript execution time
- Use Server Components to reduce client-side JS
- Code split interactive components
- Defer non-critical scripts (GA4 uses strategy="afterInteractive")

### 3. Cumulative Layout Shift (CLS < 0.1)

**Target**: No layout jumps during page load

- Set explicit width/height on images
- Reserve space for dynamic content
- Avoid injecting content above existing content
- Use CSS aspect-ratio for responsive images

### 4. Additional Optimizations

- **Font Optimization**: Subset Manrope font to only include used characters, use font-display: swap
- **Code Splitting**: Dynamic imports for Client Components that aren't immediately needed
- **Resource Hints**: Preconnect to Google Analytics, fonts.googleapis.com
- **Compression**: Vercel provides automatic Brotli compression

**Implementation Checklist**:

```typescript
// app/layout.tsx - Font optimization
import { Manrope } from 'next/font/google';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap', // Prevent invisible text during load
  variable: '--font-manrope'
});

// components/landing/hero-section.tsx - Image optimization
<Image
  src="/images/hero-placeholder.png"
  alt="Health tracking interface"
  width={1200}
  height={800}
  priority // Preload LCP image
  placeholder="blur" // Show blur while loading
/>

// components/landing/cta-button.tsx - Prevent CLS
<Button
  className="min-h-[44px] min-w-[120px]" // Fixed dimensions
  asChild
>
  <Link href="/sign-up">Start Free</Link>
</Button>
```

**Monitoring Tools**:

- Chrome DevTools Performance panel
- Lighthouse CI for automated audits
- WebPageTest for real-world performance
- Vercel Analytics for production monitoring

**Alternatives Considered**:

1. **Aggressive caching**: Rejected - Landing page content may change frequently
2. **Service Worker**: Rejected - Adds complexity, minimal benefit for single-page
3. **CDN for assets**: Rejected - Vercel Edge Network sufficient

**References**:

- [Core Web Vitals Guide](https://web.dev/vitals/)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Vercel Analytics](https://vercel.com/docs/analytics)

---

## Decision 7: Graceful Degradation for JavaScript-Disabled Browsers

**Decision**: Display a prominent banner message when JavaScript is disabled, while still showing all static content below in a readable format.

**Rationale**:

- FR-036 explicitly requires graceful degradation messaging
- Edge case (clarification Q2): JavaScript-disabled scenarios must be handled
- Maintains accessibility for users with strict privacy settings
- Server-side rendering ensures content is still visible and crawlable

**Implementation Approach**:

```html
<!-- Shown only when JS disabled -->
<noscript>
  <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 1rem; margin: 1rem; text-align: center;">
    <strong>JavaScript is disabled in your browser.</strong>
    <p>For the best experience, please enable JavaScript. <a href="https://enable-javascript.com" style="text-decoration: underline;">Learn how</a></p>
  </div>
</noscript>

<!-- All content remains accessible -->
<main>
  <!-- Hero, features, pricing, FAQ all render as static HTML -->
</main>
```

**Content Accessibility Without JS**:

- ✅ Hero section visible (headline, subheadline, CTA as regular link)
- ✅ Problem statement visible
- ✅ Features section visible (cards display as static content)
- ✅ Pricing table visible (comparison works via CSS only)
- ✅ FAQ visible (questions/answers expanded by default or simple show/hide with CSS)
- ✅ Footer navigation works (regular links)
- ❌ Smooth scroll disabled (standard browser scroll still works)
- ❌ Analytics not tracked (acceptable, <1% of users)

**Alternatives Considered**:

1. **Block access entirely**: Rejected - Hostile UX, poor for SEO
2. **No message**: Rejected - Users confused why interactive features don't work
3. **Redirect to different page**: Rejected - Unnecessary complexity

**Testing**: Manually disable JavaScript in Chrome DevTools (Settings → Debugger → Disable JavaScript) and verify page remains functional.

---

## Decision 8: Mobile-First Responsive Design Strategy

**Decision**: Implement mobile-first responsive design with Tailwind CSS breakpoints, testing from 320px to 1920px width.

**Rationale**:

- FR-023 requires minimum 320px width support
- SC-015 measures mobile experience quality
- Constitution Principle VI emphasizes progressive enhancement
- Mobile traffic often exceeds desktop for health apps
- Mobile-first prevents desktop-bias in design decisions

**Breakpoint Strategy**:

```typescript
// Tailwind CSS breakpoints (default)
// sm: 640px  - Small tablets, large phones landscape
// md: 768px  - Tablets portrait
// lg: 1024px - Tablets landscape, small laptops
// xl: 1280px - Laptops
// 2xl: 1536px - Large desktops

// Design approach (mobile-first)
<div className="
  grid grid-cols-1    // Mobile: stack vertically
  md:grid-cols-2      // Tablet: 2 columns
  lg:grid-cols-3      // Desktop: 3 columns
  gap-4 md:gap-6 lg:gap-8
">
```

**Component Responsiveness**:

### Hero Section

- Mobile (320px-639px): Stack headline + CTA vertically, single column
- Tablet (640px-1023px): Headline left, image right, 2-column layout
- Desktop (1024px+): Full-width layout with larger typography

### Features Section

- Mobile: Cards stack vertically (1 column)
- Tablet: 2 columns
- Desktop: 3 columns (one per feature)

### Pricing Section

- Mobile: Cards stack vertically with full details
- Tablet: 2 columns side-by-side
- Desktop: Centered 2-column layout with max-width

### FAQ Section

- All breakpoints: Single column (optimal for readability)
- Adjust padding and font size for different screens

**Testing Matrix**:

| Device Type | Width | Test Scenarios |
|-------------|-------|----------------|
| Small phone | 320px | iPhone SE, older Android |
| Phone | 375px-414px | iPhone 12/13/14, standard Android |
| Tablet portrait | 768px | iPad, Android tablets |
| Tablet landscape | 1024px | iPad landscape |
| Laptop | 1280px-1440px | Standard laptop screens |
| Desktop | 1920px+ | Large monitors |

**Touch Target Sizes** (Mobile Accessibility):

- Buttons: Minimum 44x44px (Apple HIG, WCAG guidance)
- Links: Minimum 44x44px touch area (padding if needed)
- Form inputs: Minimum 44px height

**Alternatives Considered**:

1. **Desktop-first design**: Rejected - Often leads to cramped mobile UX
2. **Separate mobile site**: Rejected - Maintenance nightmare, not needed with responsive design
3. **Native mobile app**: Rejected - PWA provides app-like experience without app store

**References**:

- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/layout)
- [Material Design Touch Targets](https://m2.material.io/design/usability/accessibility.html#layout-and-typography)

---

## Summary of Key Technical Decisions

| Decision | Choice | Primary Benefit |
|----------|--------|-----------------|
| Component Architecture | Server Components + targeted Client Components | 40-60% smaller JS bundle, better LCP |
| Image Strategy | next/image with WebP + PNG fallback | 30-40% smaller images, automatic optimization |
| Analytics | Google Analytics 4 with gtag.js | Free, comprehensive tracking, industry standard |
| Accessibility | WCAG 2.1 AA with semantic HTML + ARIA | Legal compliance, better SEO, inclusive UX |
| SEO Strategy | SSR + Open Graph + JSON-LD structured data | Maximum search visibility |
| Performance | Core Web Vitals optimization | Better UX, improved SEO ranking |
| JS-disabled Handling | Graceful degradation with banner message | Accessible to all users, maintains SEO |
| Responsive Design | Mobile-first with Tailwind breakpoints | Better mobile UX, progressive enhancement |

## Risks Identified & Mitigations

1. **Risk**: Performance regression on slower devices
   - **Mitigation**: Test on low-end devices, use Lighthouse throttling, monitor real user metrics

2. **Risk**: Image placeholders look unprofessional
   - **Mitigation**: Use high-quality placeholders, plan mockup creation timeline

3. **Risk**: GA4 implementation errors
   - **Mitigation**: Test with GA4 DebugView before production, validate events fire correctly

4. **Risk**: Accessibility issues missed in automated testing
   - **Mitigation**: Manual screen reader testing, keyboard navigation audit, user testing

5. **Risk**: Mobile Safari rendering quirks
   - **Mitigation**: Test on real iOS devices, use CSS vendor prefixes where needed

## Next Steps

With research complete, proceed to Phase 1:

1. Create data-model.md (minimal - no new entities)
2. Skip contracts/ (no new APIs)
3. Create quickstart.md (development and testing guide)
4. Update agent context with new technologies

---

**Research Status**: ✅ COMPLETE
**Ready for Phase 1**: YES
**Constitution Compliance**: ALL PRINCIPLES SATISFIED
