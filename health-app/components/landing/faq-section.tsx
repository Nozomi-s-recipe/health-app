import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Is my data private?',
    answer:
      "Absolutely. Your health data is completely private and belongs only to you. We implement strict data isolation, meaning your data is never mixed with other users' data. We never share, sell, or use your personal health information for any purpose other than providing you with our service. All data is encrypted in transit and at rest.",
    category: 'privacy',
  },
  {
    question: 'Can I export my data?',
    answer:
      'Yes! Premium users can export all their health data at any time in standard formats (CSV, JSON). This ensures you always have full control over your data and can take it with you if needed. Free users have access to basic data viewing but limited export capabilities.',
    category: 'privacy',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit and debit cards through Stripe, our secure payment processor. Stripe supports Visa, Mastercard, American Express, and many other payment methods. All transactions are encrypted and secure.',
    category: 'billing',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      "Yes, you can cancel your Premium subscription at any time with no cancellation fees or penalties. Your access will continue until the end of your current billing period, and you won't be charged again. You can always resubscribe later if you change your mind.",
    category: 'billing',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      "We offer a 30-day money-back guarantee for annual Premium subscriptions. If you're not satisfied within the first 30 days, contact our support team for a full refund. Monthly subscriptions are non-refundable but can be cancelled at any time to prevent future charges.",
    category: 'billing',
  },
  {
    question: 'Is there a mobile app?',
    answer:
      'Yes and no! We offer a Progressive Web App (PWA) which works on any device - phone, tablet, or desktop - without requiring downloads from app stores. Simply visit our website on your device and add it to your home screen for an app-like experience. This means no app store approvals, instant updates, and it works across all platforms (iOS, Android, Windows, Mac).',
    category: 'technical',
  },
];

export function FAQSection() {
  return (
    <section className='py-16 bg-white'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 sm:text-4xl'>
            Frequently Asked Questions
          </h2>
          <p className='mt-4 text-xl text-gray-600'>
            Got questions? We've got answers
          </p>
        </div>

        <div className='space-y-6'>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className='bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow'
            >
              <div className='flex items-start'>
                <div className='flex-shrink-0'>
                  <div className='flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600'>
                    <HelpCircle className='h-6 w-6' />
                  </div>
                </div>
                <div className='ml-4 flex-1'>
                  <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                    {faq.question}
                  </h3>
                  <p className='text-gray-600 leading-relaxed'>{faq.answer}</p>
                  <span className='inline-block mt-2 text-xs font-medium text-gray-500 uppercase tracking-wide'>
                    {faq.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-12 text-center'>
          <p className='text-gray-600'>
            Still have questions?{' '}
            <a
              href='mailto:support@n-recipes.com'
              className='text-blue-600 hover:text-blue-700 font-medium'
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
