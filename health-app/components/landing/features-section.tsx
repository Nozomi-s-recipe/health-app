import { Droplets, Utensils, Clock } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const features = [
  {
    icon: Droplets,
    name: 'Water Intake Tracking',
    description:
      'Stay hydrated with easy water logging and daily goal tracking.',
    capabilities: [
      'Quick tap to log water intake',
      'Visual progress indicators',
      'Customizable daily goals',
      'Hydration reminders',
    ],
  },
  {
    icon: Utensils,
    name: 'Meal Records',
    description: 'Track your meals and maintain a complete food diary.',
    capabilities: [
      'Log meals with photos',
      'Track meal timing',
      'Add notes and tags',
      'Search meal history',
    ],
  },
  {
    icon: Clock,
    name: 'Fasting Support',
    description:
      'Monitor your fasting windows and build healthy fasting habits.',
    capabilities: [
      'Multiple fasting schedules',
      'Timer with notifications',
      'Fasting history tracking',
      'Progress analytics',
    ],
  },
];

export function FeaturesSection() {
  return (
    <section id='features' className='py-16 bg-white scroll-mt-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 sm:text-4xl'>
            Everything You Need in One App
          </h2>
          <p className='mt-4 text-xl text-gray-600'>
            Three powerful features working together for your health
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className='hover:shadow-lg transition-shadow'>
                <CardHeader>
                  <div className='flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4'>
                    <Icon className='h-6 w-6' />
                  </div>
                  <CardTitle>{feature.name}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className='space-y-2'>
                    {feature.capabilities.map((capability, capIndex) => (
                      <li key={capIndex} className='flex items-start'>
                        <svg
                          className='h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0'
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path
                            fillRule='evenodd'
                            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                            clipRule='evenodd'
                          />
                        </svg>
                        <span className='text-gray-600 text-sm'>
                          {capability}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
