import { HeroSection } from '@/components/landing/hero-section';
import { ProblemStatement } from '@/components/landing/problem-statement';
import { FeaturesSection } from '@/components/landing/features-section';
import { BenefitsSection } from '@/components/landing/benefits-section';
import { HowItWorksSection } from '@/components/landing/how-it-works';
import { PricingSection } from '@/components/landing/pricing-section';
import { FAQSection } from '@/components/landing/faq-section';
import { CTAButton } from '@/components/landing/cta-button';
import { Footer } from '@/components/landing/footer';
import { ScrollTracker } from '@/components/landing/scroll-tracker';
import { SkipToContent } from '@/components/landing/skip-to-content';
import { Users } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <SkipToContent />
      <main id='main-content'>
        <ScrollTracker />
        <HeroSection />
        <ProblemStatement />
        <FeaturesSection />
        <BenefitsSection />
        <HowItWorksSection />
        <PricingSection />

        {/* Testimonials Placeholder */}
        <section
          aria-labelledby='testimonials-heading'
          className='py-16 bg-gradient-to-b from-gray-50 to-white'
        >
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center'>
              <h2
                id='testimonials-heading'
                className='text-3xl font-bold text-gray-900 sm:text-4xl mb-4'
              >
                What Our Users Say
              </h2>
              <p className='text-xl text-gray-600'>Testimonials coming soon</p>
            </div>
          </div>
        </section>

        {/* User Count Placeholder */}
        <section
          aria-labelledby='user-count-heading'
          className='py-12 bg-blue-600'
        >
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center text-white'>
              <Users className='h-12 w-12 mx-auto mb-4' aria-hidden='true' />
              <h2 id='user-count-heading' className='text-2xl font-bold mb-2'>
                Join Thousands of Users
              </h2>
              <p className='text-lg text-blue-100'>
                Start tracking your health today
              </p>
            </div>
          </div>
        </section>

        <FAQSection />

        {/* Final CTA Section */}
        <section
          aria-labelledby='final-cta-heading'
          className='py-20 bg-gradient-to-r from-blue-600 to-blue-700'
        >
          <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
            <h2
              id='final-cta-heading'
              className='text-3xl font-bold text-white sm:text-4xl mb-4'
            >
              Start Tracking Your Health Today
            </h2>
            <p className='text-xl text-blue-100 mb-8'>
              Join thousands of users who are taking control of their wellness
              journey. No credit card required to get started.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <CTAButton location='footer' />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
