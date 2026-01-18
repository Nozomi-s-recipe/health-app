import { Check } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CTAButton } from './cta-button';

const plans = [
  {
    name: 'Free Plan',
    price: {
      monthly: 0,
      currency: 'JPY',
    },
    description: 'Perfect for getting started with health tracking',
    features: [
      'Water intake tracking',
      'Basic meal records',
      '3 months data retention',
      '10MB storage',
      'Mobile & desktop access',
    ],
    limitations: [
      'No advanced analytics',
      'No fasting schedules',
      'Limited data export',
    ],
    highlighted: false,
  },
  {
    name: 'Premium Plan',
    price: {
      monthly: 500,
      annual: 5000,
      currency: 'JPY',
    },
    description: 'Complete health tracking with all features unlocked',
    features: [
      'All Free features',
      'Unlimited data retention',
      '100MB storage',
      'Advanced analytics & insights',
      'Fasting schedules & timer',
      'Priority support',
      'Data export (CSV, JSON)',
      'Custom reminders',
      'Meal photo uploads',
    ],
    savings: '~17% savings with annual plan',
    highlighted: true,
  },
];

export function PricingSection() {
  return (
    <section className='py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 sm:text-4xl'>
            Simple, Transparent Pricing
          </h2>
          <p className='mt-4 text-xl text-gray-600'>
            Start free, upgrade when you're ready
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 max-w-5xl mx-auto'>
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${plan.highlighted ? 'border-blue-600 border-2 shadow-xl' : 'border-gray-200'}`}
            >
              {plan.highlighted && (
                <div className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                  <span className='inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold bg-blue-600 text-white'>
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className='text-center pb-8 pt-8'>
                <CardTitle className='text-2xl mb-2'>{plan.name}</CardTitle>
                <CardDescription className='text-base'>
                  {plan.description}
                </CardDescription>

                <div className='mt-4'>
                  <span className='text-4xl font-bold text-gray-900'>
                    ¥{plan.price.monthly.toLocaleString()}
                  </span>
                  <span className='text-gray-600'>/month</span>

                  {plan.price.annual && (
                    <div className='mt-2 text-sm text-gray-600'>
                      or ¥{plan.price.annual.toLocaleString()}/year
                      <div className='text-green-600 font-semibold'>
                        {plan.savings}
                      </div>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className='space-y-4'>
                <div>
                  <h4 className='font-semibold text-gray-900 mb-3'>
                    Includes:
                  </h4>
                  <ul className='space-y-2'>
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className='flex items-start'>
                        <Check className='h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0' />
                        <span className='text-gray-600'>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations && (
                  <div className='pt-4 border-t border-gray-200'>
                    <h4 className='font-semibold text-gray-900 mb-3'>
                      Not included:
                    </h4>
                    <ul className='space-y-2'>
                      {plan.limitations.map((limitation, limitIndex) => (
                        <li
                          key={limitIndex}
                          className='flex items-start text-gray-500 text-sm'
                        >
                          <span className='mr-2'>•</span>
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>

              <CardFooter className='flex flex-col gap-3 pt-6'>
                <CTAButton location='pricing' />
                <p className='text-sm text-gray-500 text-center'>
                  {plan.price.monthly === 0
                    ? 'Free to start, no credit card required'
                    : 'Cancel anytime'}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>

        <p className='mt-8 text-center text-sm text-gray-600'>
          All prices in JPY, billed via Stripe
        </p>
      </div>
    </section>
  );
}
