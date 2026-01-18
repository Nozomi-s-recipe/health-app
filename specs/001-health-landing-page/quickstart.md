
# Quick Start Guide: Health App Landing Page

**Feature**: 001-health-landing-page  
**Date**: 2026-01-18  
**Prerequisites**: Node.js 18+, pnpm, Git

## Overview

This guide covers setting up your development environment, implementing the landing page, testing procedures, and deployment checklist.

## Development Setup

### 1. Environment Preparation

```bash
# Navigate to project root
cd health-app

# Ensure dependencies are installed
pnpm install

# Verify Next.js version
pnpm list next
# Expected: next@15.6.0-canary.59

# Verify development server runs
pnpm dev
# Should start on http://localhost:3000
```

### 2. Create Feature Branch

```bash
# Already created by /speckit.specify command
git branch
# Should show: * 001-health-landing-page

# If not on feature branch:
git checkout 001-health-landing-page
```

### 3. Create Component Structure

```bash
# Create landing page components directory
mkdir -p health-app/components/landing

# Create placeholder images directory
mkdir -p health-app/public/images
```

### 4. Development Tools Setup

**VS Code Extensions** (Recommended):

- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)
- Tailwind CSS IntelliSense (`bradlc.vscode-tailwindcss`)
- axe Accessibility Linter (`deque-systems.vscode-axe-linter`)

**Browser Extensions** (Required for Testing):

- React Developer Tools
- Lighthouse (built into Chrome DevTools)
- axe DevTools (accessibility testing)
- WAVE (Web Accessibility Evaluation Tool)

### 5. Google Analytics 4 Setup

```bash
# Add GA4 Measurement ID to environment variables
echo "NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX" >> .env.local

# Note: Get actual ID from Google Analytics admin console
# For development: Use test property or omit (GA4 will be inactive)
```

## Implementation Workflow

### Phase 1: Static Structure (Day 1)

1. **Replace Landing Page**

   ```bash
   # Edit: health-app/app/(dashboard)/page.tsx
   # Replace SaaS content with health app hero section
   ```

2. **Create Base Components**

   ```typescript
   // Create these files:
   components/landing/hero-section.tsx        // Server Component
   components/landing/problem-statement.tsx   // Server Component
   components/landing/features-section.tsx    // Server Component
   components/landing/benefits-section.tsx    // Server Component
   components/landing/how-it-works.tsx        // Server Component
   components/landing/pricing-section.tsx     // Server Component
   components/landing/faq-section.tsx         // Server Component
   components/landing/footer.tsx              // Server Component
   ```

3. **Test Static Content**

   ```bash
   pnpm dev
   # Visit http://localhost:3000
   # Verify all sections render with placeholder content
   ```

### Phase 2: Content & Styling (Day 2)

1. **Add Real Content**
   - Copy exact text from spec.md (FR-001 through FR-022)
   - Ensure headlines match specification exactly
   - Add 6 FAQ questions from FR-017

2. **Apply Styling**
   - Use shadcn/ui Card, Button components
   - Apply Tailwind responsive classes
   - Test mobile (320px) to desktop (1920px)

3. **Add Images**

   ```bash
   # Add placeholder images
   curl -o public/images/hero-placeholder.png [placeholder_url]
   
   # Or use https://placehold.co for testing:
   # https://placehold.co/1200x800/e0f2fe/0369a1?text=Health+App
   ```

### Phase 3: Interactive Features (Day 3)

1. **Add Client Components**

   ```typescript
   // components/landing/cta-button.tsx (Client Component)
   'use client'
   export function CTAButton({ location }: { location: string }) {
     // Add GA4 tracking
     // Link to /sign-up
   }
   
   // components/landing/smooth-scroll-button.tsx (Client Component)
   'use client'
   export function SmoothScrollButton({ targetId }: { targetId: string }) {
     // Implement smooth scroll
   }
   ```

2. **Integrate Google Analytics**

   ```typescript
   // app/layout.tsx
   import Script from 'next/script';
   
   // Add GA4 scripts (see research.md Decision 3)
   ```

3. **Add Scroll Depth Tracking**

   ```typescript
   // components/landing/scroll-tracker.tsx (Client Component)
   'use client'
   // Use Intersection Observer for 25%, 50%, 75%, 100%
   ```

### Phase 4: Optimization & Polish (Day 4)

1. **Performance Optimization**
   - Add `priority` to hero image
   - Verify Server Components used correctly
   - Check bundle size: `pnpm build && pnpm analyze` (if analyzer installed)

2. **Accessibility Audit**
   - Run axe DevTools
   - Test keyboard navigation
   - Verify color contrast ratios

3. **SEO Implementation**
   - Add metadata to layout.tsx
   - Add JSON-LD structured data
   - Verify Open Graph tags

## Testing Procedures

### 1. Visual Testing

```bash
# Start development server
pnpm dev

# Test Responsive Breakpoints:
# Chrome DevTools → Device Toolbar (Cmd+Shift+M / Ctrl+Shift+M)
```

**Testing Matrix**:

| Device | Width | Test URL |
|--------|-------|----------|
| iPhone SE | 375x667px | <http://localhost:3000> |
| iPhone 14 | 390x844px | <http://localhost:3000> |
| iPad | 768x1024px | <http://localhost:3000> |
| iPad Pro | 1024x1366px | <http://localhost:3000> |
| Laptop | 1280x720px | <http://localhost:3000> |
| Desktop | 1920x1080px | <http://localhost:3000> |

**Visual Checklist**:

- [ ] Hero section displays correctly on all breakpoints
- [ ] CTAs are visible and properly sized (min 44x44px on mobile)
- [ ] Pricing cards stack properly on mobile
- [ ] FAQ section is readable on all screen sizes
- [ ] Footer links are accessible
- [ ] No horizontal scroll on any breakpoint
- [ ] Images load and display correctly
- [ ] Typography is readable (contrast, size)

### 2. Functional Testing

**Navigation**:

- [ ] "Start Free" buttons link to `/sign-up`
- [ ] "See How It Works" scrolls to features section smoothly
- [ ] Footer links navigate correctly
- [ ] Browser back button works as expected

**Interactive Elements**:

- [ ] All buttons are clickable
- [ ] Hover states work on desktop
- [ ] Touch targets work on mobile
- [ ] No broken links (404 errors)

**JavaScript Disabled**:

```bash
# Chrome DevTools → Settings → Debugger → Disable JavaScript
```

- [ ] Noscript banner displays
- [ ] Static content remains visible
- [ ] Links work as regular anchor tags
- [ ] No layout breaking

### 3. Performance Testing

**Lighthouse Audit**:

```bash
# Chrome DevTools → Lighthouse tab
# Select: Performance, Accessibility, Best Practices, SEO
# Device: Mobile & Desktop
# Click "Analyze page load"
```

**Target Scores**:

- Performance: 90+ (mobile), 95+ (desktop)
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

**Core Web Vitals** (Chrome DevTools → Performance Insights):

- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Manual Performance Check**:

```bash
# Build for production
pnpm build

# Start production server
pnpm start

# Test with throttling:
# Chrome DevTools → Network tab → Throttling → Slow 3G
```

### 4. Accessibility Testing

**Automated Testing**:

```bash
# Install axe DevTools extension
# Right-click page → Inspect → axe DevTools tab
# Click "Scan ALL of my page"
```

**Manual Keyboard Navigation**:

- [ ] Tab through all interactive elements
- [ ] Focus indicators visible
- [ ] Tab order is logical
- [ ] Enter/Space activates buttons
- [ ] Escape closes any modals
- [ ] Skip to main content link works

**Screen Reader Testing**:

**macOS** (VoiceOver):

```bash
# Enable: Cmd+F5
# Navigate: Control+Option+Arrow keys
# Stop: Cmd+F5
```

**Windows** (NVDA - free):

```bash
# Download: https://www.nvaccess.org/download/
# Start: Ctrl+Alt+N
# Stop: NVDA+Q
```

**Test Scenarios**:

- [ ] Page title announced correctly
- [ ] Headings hierarchy makes sense
- [ ] Images have descriptive alt text
- [ ] Links announce their purpose
- [ ] Buttons are identified as buttons
- [ ] Form labels are associated with inputs (if any)

**Color Contrast**:

```bash
# Use WebAIM Contrast Checker
# https://webaim.org/resources/contrastchecker/

# Or axe DevTools (automatic check)
```

### 5. SEO Testing

**Metadata Verification**:

```bash
# View source: Right-click → View Page Source
```

**Check**:

- [ ] `<title>` tag present and descriptive
- [ ] `<meta name="description">` present (< 160 chars)
- [ ] Open Graph tags present (`og:title`, `og:description`, `og:image`)
- [ ] Twitter Card tags present
- [ ] Canonical URL specified
- [ ] Structured data (JSON-LD) present

**SEO Tools**:

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

**Structured Data**:

```bash
# Test with Google's tool:
# Copy page HTML
# Paste into: https://search.google.com/test/rich-results
# Verify SoftwareApplication schema recognized
```

### 6. Cross-Browser Testing

**Required Browsers**:

| Browser | Version | Priority |
|---------|---------|----------|
| Chrome | Latest | High |
| Firefox | Latest | High |
| Safari | Latest | High |
| Edge | Latest | Medium |
| Mobile Safari (iOS) | Latest | High |
| Chrome (Android) | Latest | Medium |

**Testing Service** (Optional):

- BrowserStack (paid, but free trial available)
- Or use real devices if available

**Cross-Browser Checklist**:

- [ ] Layout consistent across browsers
- [ ] Fonts render correctly
- [ ] Colors display accurately
- [ ] JavaScript features work
- [ ] CSS animations work (if any)
- [ ] No console errors

### 7. Analytics Testing

**GA4 DebugView**:

```bash
# Add debug parameter to URL:
# http://localhost:3000?debug_mode=true

# Open GA4 Admin Console:
# Select property → DebugView
```

**Events to Verify**:

- [ ] `page_view` fires on page load
- [ ] `cta_click` fires when clicking "Start Free"
  - Check parameters: `location`, `action`
- [ ] `scroll_depth` fires at 25%, 50%, 75%, 100%
- [ ] All events have correct parameters

## Pre-Deployment Checklist

### Code Quality

- [ ] No TypeScript errors (`pnpm type-check` or `pnpm build`)
- [ ] No ESLint errors (`pnpm lint`)
- [ ] No console.log statements in production code
- [ ] All TODO comments addressed or documented
- [ ] Code reviewed (self-review minimum)

### Content Accuracy

- [ ] All copy matches spec.md exactly
- [ ] Pricing shows ¥0 Free, ¥500 Premium
- [ ] All 6 FAQ questions present
- [ ] Copyright year correct (2026)
- [ ] No placeholder text remaining (except hero image if appropriate)

### Performance

- [ ] Lighthouse scores meet targets (90+)
- [ ] Core Web Vitals meet targets (see above)
- [ ] Images optimized (< 200KB each)
- [ ] Build succeeds (`pnpm build`)

### Accessibility

- [ ] axe DevTools shows 0 violations
- [ ] Keyboard navigation works
- [ ] Screen reader testing passed
- [ ] Color contrast ratios verified

### SEO

- [ ] Metadata complete and accurate
- [ ] Structured data validates
- [ ] Open Graph image exists and displays correctly
- [ ] robots.txt allows indexing (if exists)

### Functionality

- [ ] All CTAs link to `/sign-up`
- [ ] Smooth scroll works
- [ ] GA4 tracking verified
- [ ] JavaScript-disabled fallback works
- [ ] No broken links

## Deployment

### 1. Final Build Test

```bash
# Clean build
rm -rf .next
pnpm build

# Verify build succeeds with no errors
# Check for warnings (should be minimal)

# Test production build locally
pnpm start

# Smoke test all major sections
```

### 2. Commit & Push

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: implement health app landing page with GA4 tracking

- Replace SaaS landing with health-focused content
- Add 7 sections: hero, problem, features, benefits, how-it-works, pricing, FAQ
- Integrate Google Analytics 4 with scroll depth tracking
- Optimize for Core Web Vitals (LCP < 2.5s)
- WCAG 2.1 AA compliant
- Mobile-first responsive design (320px-1920px)
- Add structured data for SEO

Refs: #001-health-landing-page"

# Push to remote
git push origin 001-health-landing-page
```

### 3. Create Pull Request

**PR Title**: `feat: Health app landing page with conversion optimization`

**PR Description Template**:

```markdown
## Summary
Implements the new health app landing page optimized for conversion, replacing the generic SaaS template.

## Changes
- ✅ 7 main sections implemented
- ✅ Google Analytics 4 integrated
- ✅ Mobile-first responsive design
- ✅ WCAG 2.1 AA accessibility
- ✅ Core Web Vitals optimized

## Testing Completed
- [x] Visual testing (320px - 1920px)
- [x] Lighthouse audit (all 90+)
- [x] axe DevTools (0 violations)
- [x] Cross-browser testing
- [x] Screen reader testing
- [x] GA4 tracking verified

## Performance Metrics
- LCP: X.Xs (target: < 2.5s)
- FID: XXms (target: < 100ms)
- CLS: 0.0X (target: < 0.1)

## Screenshots
[Attach screenshots of desktop, tablet, mobile views]

## Deployment Notes
- GA4 Measurement ID configured in env vars
- No database migrations needed
- No API changes

## References
- Spec: specs/001-health-landing-page/spec.md
- Plan: specs/001-health-landing-page/plan.md
```

### 4. Vercel Preview Deployment

Vercel will automatically create a preview deployment for the PR.

**Preview Testing Checklist**:

- [ ] Preview URL loads successfully
- [ ] All sections render correctly
- [ ] CTAs link to correct URLs
- [ ] Analytics tracking works (test in GA4 DebugView with preview URL)
- [ ] Mobile responsive design verified
- [ ] No console errors
- [ ] Lighthouse audit on preview URL meets targets

### 5. Merge to Main

Once PR is approved and preview testing passes:

```bash
# Merge PR through GitHub UI
# Or via command line:
git checkout main
git merge 001-health-landing-page
git push origin main
```

### 6. Production Verification

After merge, Vercel automatically deploys to production.

**Production Checklist**:

- [ ] Visit <https://health.n-recipes.com>
- [ ] Verify all sections display correctly
- [ ] Test CTA links go to production /sign-up
- [ ] Verify GA4 tracking in production property
- [ ] Run Lighthouse audit on production URL
- [ ] Test on real mobile devices
- [ ] Monitor Vercel Analytics for errors
- [ ] Check Google Search Console (after 24-48 hours)

## Post-Launch Monitoring

### Week 1

**Daily Checks**:

- GA4 real-time dashboard (verify traffic)
- Vercel Analytics (check for errors, performance)
- Core Web Vitals in Search Console

**Metrics to Track**:

- Page views
- CTA click rate (target: 5%+)
- Bounce rate (target: < 60%)
- Scroll depth (target: 85%+ reach features section)
- Average time on page (target: 45s+)

### Week 2-4

**Weekly Analysis**:

- Review GA4 conversion funnel (landing → CTA click → signup)
- Analyze user flow (which sections get most engagement)
- Check for accessibility issues reported by users
- Monitor SEO indexing progress in Search Console
- Review Lighthouse scores (regression check)

**Optimization Opportunities**:

- A/B test different hero headlines
- Adjust FAQ based on user questions
- Optimize images based on actual performance data
- Refine CTA placement based on heatmap data (if available)

## Troubleshooting

### Common Issues

**Issue**: Lighthouse performance score < 90

- **Check**: Image sizes (should be < 200KB each)
- **Check**: JavaScript bundle size (use `pnpm build` and check .next/static)
- **Fix**: Use next/image with `priority` for hero image
- **Fix**: Remove unused dependencies

**Issue**: Accessibility violations in axe DevTools

- **Check**: All images have alt text
- **Check**: Color contrast ratios meet 4.5:1 minimum
- **Check**: Heading hierarchy (h1 → h2 → h3, no skips)
- **Fix**: Add ARIA labels to icon-only buttons

**Issue**: GA4 events not tracking

- **Check**: NEXT_PUBLIC_GA_MEASUREMENT_ID in .env.local
- **Check**: Browser doesn't have ad blocker enabled
- **Check**: GA4 scripts load (Network tab in DevTools)
- **Fix**: Verify gtag function is defined before calling

**Issue**: Layout breaks on specific screen size

- **Check**: Tailwind breakpoints used correctly
- **Check**: Fixed widths that should be responsive
- **Check**: Images have proper aspect-ratio
- **Fix**: Test with actual device, not just emulator

**Issue**: Slow page load on mobile

- **Check**: Hero image size and format
- **Check**: Total JavaScript bundle size
- **Check**: Fonts loading strategy (should use font-display: swap)
- **Fix**: Optimize images, use WebP format, lazy load below-fold content

## Development Tips

### Hot Reload Issues

```bash
# If changes not reflecting:
rm -rf .next
pnpm dev
```

### Type Checking

```bash
# Run TypeScript type checker:
npx tsc --noEmit

# Or add to package.json scripts:
# "type-check": "tsc --noEmit"
```

### Component Organization

```
components/landing/
├── hero-section.tsx          # Server Component
├── problem-statement.tsx     # Server Component
├── features-section.tsx      # Server Component
├── benefits-section.tsx      # Server Component
├── how-it-works.tsx         # Server Component
├── pricing-section.tsx       # Server Component
├── faq-section.tsx          # Server Component
├── footer.tsx               # Server Component
├── cta-button.tsx           # Client Component ('use client')
├── smooth-scroll-button.tsx # Client Component ('use client')
└── scroll-tracker.tsx       # Client Component ('use client')
```

### Styling Best Practices

- Use Tailwind utility classes directly in JSX
- For complex variants, use `cn()` utility from `lib/utils.ts`
- Avoid inline styles except for noscript fallback
- Use shadcn/ui components for consistency
- Follow mobile-first approach (base styles for mobile, add md:, lg: for larger screens)

### Git Workflow

```bash
# Create meaningful commits:
git add components/landing/hero-section.tsx
git commit -m "feat(landing): add hero section with CTA"

# Push frequently to backup work:
git push origin 001-health-landing-page

# Keep commits atomic (one logical change per commit)
```

## Resources

### Documentation

- [Next.js App Router](https://nextjs.org/docs/app)
- [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4)

### Tools

- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)

### Design References

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design](https://m2.material.io/design)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)

## Quick Reference Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Type check
npx tsc --noEmit

# Database commands (if needed)
pnpm db:generate  # Generate migrations
pnpm db:migrate   # Apply migrations
pnpm db:studio    # Open Drizzle Studio
```

## Support

**Questions or Issues?**

- Check specs/001-health-landing-page/spec.md for requirements
- Check specs/001-health-landing-page/research.md for technical decisions
- Check specs/001-health-landing-page/plan.md for implementation strategy
- Review .specify/memory/constitution.md for project principles

**Need Help?**

- Create GitHub issue with [Landing Page] tag
- Include browser, device, and steps to reproduce
- Attach screenshots if visual issue
- Include console errors if JavaScript issue

---

**Quickstart Status**: ✅ COMPLETE
**Ready for Development**: YES
**Estimated Implementation Time**: 3-4 days
**Complexity**: Medium (mostly frontend, no backend changes)
