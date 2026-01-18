'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, any>,
    ) => void;
  }
}

export function ScrollTracker() {
  const trackedDepths = useRef(new Set<number>());

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // Calculate scroll percentage
      const scrollPercentage =
        (scrollTop / (documentHeight - windowHeight)) * 100;

      // Track milestones: 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];

      milestones.forEach((milestone) => {
        if (
          scrollPercentage >= milestone &&
          !trackedDepths.current.has(milestone)
        ) {
          trackedDepths.current.add(milestone);

          // Send to Google Analytics if available
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'scroll_depth', {
              scroll_percentage: milestone,
              page_location: window.location.pathname,
            });
          }
        }
      });
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // This component doesn't render anything
  return null;
}
