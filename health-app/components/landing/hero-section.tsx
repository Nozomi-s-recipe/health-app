'use client';

import Image from 'next/image';
import { CTAButton } from '@/components/landing/cta-button';
import { SmoothScrollButton } from '@/components/landing/smooth-scroll-button';

export function HeroSection() {
  return (
    <section className='relative py-20 lg:py-32'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='lg:grid lg:grid-cols-12 lg:gap-8 items-center'>
          {/* Text Content */}
          <div className='sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left'>
            <h1 className='text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl'>
              Track Your Health,
              <span className='block text-blue-600'>All in One Place</span>
            </h1>
            <p className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl'>
              Unified health tracking for water intake, meals, and fasting.
              Simple, private, and affordable. Start managing your wellness
              journey today.
            </p>

            {/* CTAs */}
            <div className='mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0 flex flex-col sm:flex-row gap-4'>
              <CTAButton location='hero' />
              <SmoothScrollButton targetId='features' />
            </div>

            {/* Trust Badge */}
            <p className='mt-4 text-sm text-gray-500 sm:text-center lg:text-left'>
              No credit card required
            </p>
          </div>

          {/* Hero Image */}
          <div className='mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center'>
            <div className='relative w-full rounded-lg shadow-xl overflow-hidden'>
              <Image
                src='/images/hero-placeholder.png'
                alt='Health tracking app interface showing water intake, meal records, and fasting schedules'
                width={1200}
                height={800}
                priority
                className='w-full h-auto'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
