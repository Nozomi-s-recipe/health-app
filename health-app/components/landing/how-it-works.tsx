import { UserPlus, PenLine, TrendingUp } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: UserPlus,
    title: 'Sign up',
    description:
      'Create your free account in seconds. No credit card required to get started.',
  },
  {
    number: 2,
    icon: PenLine,
    title: 'Log data',
    description:
      'Start logging your daily health data - water intake, meals, and fasting windows.',
  },
  {
    number: 3,
    icon: TrendingUp,
    title: 'Track progress',
    description:
      'View your progress with visual insights and build sustainable healthy habits.',
  },
];

export function HowItWorksSection() {
  return (
    <section className='py-16 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 sm:text-4xl'>
            How It Works
          </h2>
          <p className='mt-4 text-xl text-gray-600'>
            Get started in three simple steps
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className='relative text-center'>
                {/* Connector line (hidden on mobile, shown on md+) */}
                {index < steps.length - 1 && (
                  <div
                    className='hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-blue-200'
                    style={{ zIndex: 0 }}
                  />
                )}

                {/* Step number badge */}
                <div
                  className='relative inline-flex items-center justify-center h-24 w-24 rounded-full bg-blue-600 text-white mx-auto mb-4'
                  style={{ zIndex: 1 }}
                >
                  <Icon className='h-10 w-10' />
                  <span className='absolute -top-2 -right-2 flex items-center justify-center h-8 w-8 rounded-full bg-blue-800 text-white text-sm font-bold'>
                    {step.number}
                  </span>
                </div>

                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  {step.title}
                </h3>
                <p className='text-gray-600'>{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
