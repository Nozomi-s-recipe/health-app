import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { getUser, getTeamForUser } from '@/lib/db/queries';
import { SWRConfig } from 'swr';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Track Your Health, All in One Place | health.n-recipes.com',
  description:
    'Unified health tracking for water intake, meals, and fasting. Simple, private, affordable. Free plan available with no credit card required.',
  keywords: [
    'health tracking app',
    'water tracker',
    'meal tracker',
    'fasting tracker',
    'health app',
    'wellness app',
  ],
  authors: [{ name: 'n-recipes' }],
  openGraph: {
    title: 'Track Your Health, All in One Place',
    description:
      'Unified health tracking for water intake, meals, and fasting. Simple, private, and affordable.',
    url: 'https://health.n-recipes.com',
    siteName: 'health.n-recipes.com',
    images: [
      {
        url: 'https://health.n-recipes.com/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Health tracking app interface',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Track Your Health, All in One Place',
    description: 'Unified health tracking for water intake, meals, and fasting',
    images: ['https://health.n-recipes.com/images/twitter-image.png'],
  },
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html
      lang='en'
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
    >
      <head>
        {/* Google Analytics 4 */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy='afterInteractive'
            />
            <Script id='google-analytics' strategy='afterInteractive'>
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        {/* JSON-LD Structured Data */}
        <Script
          id='structured-data'
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'health.n-recipes.com',
              applicationCategory: 'HealthApplication',
              operatingSystem: 'Web, iOS, Android',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'JPY',
                description:
                  'Free plan with water tracking and basic meal records',
              },
              description:
                'Unified health tracking for water intake, meals, and fasting',
              url: 'https://health.n-recipes.com',
              author: {
                '@type': 'Organization',
                name: 'n-recipes',
              },
            }),
          }}
        />
      </head>
      <body className='min-h-[100dvh] bg-gray-50'>
        {/* Noscript banner for JavaScript-disabled browsers */}
        <noscript>
          <div
            style={{
              background: '#fef3c7',
              border: '2px solid #f59e0b',
              padding: '1rem',
              margin: '1rem',
              textAlign: 'center',
              borderRadius: '0.5rem',
            }}
          >
            <strong>JavaScript is disabled in your browser.</strong>
            <p style={{ margin: '0.5rem 0' }}>
              For the best experience, please enable JavaScript.
              <a
                href='https://enable-javascript.com'
                style={{ textDecoration: 'underline', marginLeft: '0.25rem' }}
              >
                Learn how
              </a>
            </p>
          </div>
        </noscript>

        <SWRConfig
          value={{
            fallback: {
              // We do NOT await here
              // Only components that read this data will suspend
              '/api/user': getUser(),
              '/api/team': getTeamForUser(),
            },
          }}
        >
          {children}
        </SWRConfig>
      </body>
    </html>
  );
}
