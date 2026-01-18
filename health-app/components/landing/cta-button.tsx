'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
  location: 'hero' | 'pricing' | 'footer';
}

export function CTAButton({ location }: CTAButtonProps) {
  const handleClick = () => {
    // Track CTA click with Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        location,
        action: 'start_free',
      });
    }
  };

  return (
    <Button
      size='lg'
      className='text-lg rounded-full min-h-[44px] min-w-[120px]'
      asChild
      onClick={handleClick}
    >
      <Link href='/sign-up'>
        Start Free
        <ArrowRight className='ml-2 h-5 w-5' aria-hidden='true' />
      </Link>
    </Button>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, any>,
    ) => void;
  }
}
