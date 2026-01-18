import { AlertCircle, Database, DollarSign } from 'lucide-react';

const problems = [
  {
    icon: AlertCircle,
    title: 'Managing Multiple Apps',
    description:
      'Tired of juggling 3+ different health tracking apps? Switching between apps wastes time and makes it hard to see the big picture of your health.',
  },
  {
    icon: Database,
    title: 'Losing Track of Data',
    description:
      'Important health data scattered across multiple platforms means you lose context and insights. Your wellness journey deserves better organization.',
  },
  {
    icon: DollarSign,
    title: 'Paying Too Much',
    description:
      'Premium subscriptions for multiple health apps add up quickly. Why pay ¥3,000+/month when you can get everything in one place for less?',
  },
];

export function ProblemStatement() {
  return (
    <section className='py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 sm:text-4xl'>
            Sound Familiar?
          </h2>
          <p className='mt-4 text-xl text-gray-600'>
            We understand the challenges of managing your health data
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className='bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow'
              >
                <div className='flex items-center justify-center h-12 w-12 rounded-md bg-red-100 text-red-600 mb-4'>
                  <Icon className='h-6 w-6' />
                </div>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  {problem.title}
                </h3>
                <p className='text-gray-600'>{problem.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
