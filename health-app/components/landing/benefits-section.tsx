import { Smartphone, Shield, Wallet, BarChart3 } from 'lucide-react';

const benefits = [
  {
    icon: BarChart3,
    title: 'Unified Data',
    description:
      'All your health metrics in one place. See the complete picture of your wellness journey without switching between multiple apps.',
  },
  {
    icon: Smartphone,
    title: 'Works on Any Device',
    description:
      'Access your data anywhere with our Progressive Web App (PWA). No app store downloads needed - works on phone, tablet, and desktop.',
  },
  {
    icon: Shield,
    title: 'Privacy-Focused',
    description:
      'Your health data belongs to you. We use strict data isolation, never share your information, and give you full control over your data.',
  },
  {
    icon: Wallet,
    title: 'Affordable Pricing',
    description:
      'Start free with essential features. Upgrade to Premium for just ¥500/month - less than the cost of a single health app subscription.',
  },
];

export function BenefitsSection() {
  return (
    <section className='py-16 bg-gradient-to-b from-blue-50 to-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 sm:text-4xl'>
            Why Choose Our Health App?
          </h2>
          <p className='mt-4 text-xl text-gray-600'>
            Simple, secure, and designed for your success
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className='text-center'>
                <div className='flex items-center justify-center h-16 w-16 rounded-full bg-blue-600 text-white mx-auto mb-4'>
                  <Icon className='h-8 w-8' />
                </div>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  {benefit.title}
                </h3>
                <p className='text-gray-600'>{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
