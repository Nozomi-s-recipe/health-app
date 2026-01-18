import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

const footerLinks = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'FAQ', href: '#faq' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Contact', href: 'mailto:support@n-recipes.com' },
  ],
};

const socialLinks = [
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Email', icon: Mail, href: 'mailto:support@n-recipes.com' },
];

export function Footer() {
  return (
    <footer className='bg-gray-900 text-gray-300'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Brand Column */}
          <div className='col-span-1 md:col-span-2'>
            <h3 className='text-white text-lg font-bold mb-4'>
              health.n-recipes.com
            </h3>
            <p className='text-gray-400 mb-4'>
              Track your health, all in one place. Water intake, meals, and
              fasting - unified tracking for your wellness journey.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className='text-white font-semibold mb-4'>Product</h4>
            <ul className='space-y-2'>
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className='text-white font-semibold mb-4'>Legal</h4>
            <ul className='space-y-2'>
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('mailto:') ? (
                    <a
                      href={link.href}
                      className='text-gray-400 hover:text-white transition-colors'
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className='text-gray-400 hover:text-white transition-colors'
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className='mt-8 pt-8 border-t border-gray-800'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            {/* Social Media Links */}
            <div className='flex space-x-6 mb-4 md:mb-0'>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className='text-gray-400 hover:text-white transition-colors'
                    aria-label={social.name}
                  >
                    <Icon className='h-5 w-5' />
                  </a>
                );
              })}
            </div>

            {/* Copyright */}
            <p className='text-gray-400 text-sm'>
              © 2026 n-recipes. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
