
import React from 'react';
import { FooterSection, FooterLink } from '../types';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { useNavigation } from '../contexts/NavigationContext';
import { useSite } from '../contexts/SiteContext';

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#', page: 'Features' },
      { label: 'Integrations', href: '#', page: 'Integrations' },
      { label: 'Pricing', href: '#', page: 'Pricing' },
      // Fallback for pages not yet implemented
      { label: 'Changelog', href: 'javascript:void(0)' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#', page: 'About' },
      { label: 'Blog', href: '#', page: 'Blog' },
      { label: 'Careers', href: '#', page: 'Careers' },
      { label: 'Customers', href: '#', page: 'Customers' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Community', href: '#', page: 'Community' },
      { label: 'Contact', href: '#', page: 'Contact' },
      { label: 'DPA', href: '#', page: 'DPA' },
      { label: 'Terms of Service', href: '#', page: 'TermsAndConditions' },
    ],
  },
];

export const Footer: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { config } = useSite();

  const handleLinkClick = (e: React.MouseEvent, item: FooterLink) => {
    if (item.page) {
      e.preventDefault();
      navigateTo(item.page);
    } else if (item.href === 'javascript:void(0)') {
      e.preventDefault();
      // Optional: alert or no-op
    }
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-2">
               <span className="text-xl font-bold text-gray-900">{config.siteName}</span>
            </div>
            <p className="text-sm leading-6 text-gray-600">
              {config.footer.description}
            </p>
            <div className="flex space-x-6">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-500 focus-visible:text-gray-900 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-sm" aria-label="Visit our GitHub">
                <Github className="h-6 w-6" aria-hidden="true" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-500 focus-visible:text-gray-900 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-sm" aria-label="Follow us on Twitter">
                <Twitter className="h-6 w-6" aria-hidden="true" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-500 focus-visible:text-gray-900 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-sm" aria-label="Connect on LinkedIn">
                <Linkedin className="h-6 w-6" aria-hidden="true" />
              </a>
            </div>
            <div className="text-sm text-gray-500">
               <p>{config.contact.address}</p>
               <p>{config.contact.phone}</p>
               <p>{config.contact.email}</p>
            </div>
          </div>

          {/* Links Grid */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">{FOOTER_SECTIONS[0].title}</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {FOOTER_SECTIONS[0].links.map((item) => (
                    <li key={item.label}>
                      <a 
                        href={item.href} 
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900 focus-visible:text-indigo-600 outline-none focus-visible:underline"
                        onClick={(e) => handleLinkClick(e, item)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">{FOOTER_SECTIONS[1].title}</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {FOOTER_SECTIONS[1].links.map((item) => (
                    <li key={item.label}>
                      <a 
                        href={item.href} 
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900 focus-visible:text-indigo-600 outline-none focus-visible:underline"
                        onClick={(e) => handleLinkClick(e, item)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">{FOOTER_SECTIONS[2].title}</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {FOOTER_SECTIONS[2].links.map((item) => (
                    <li key={item.label}>
                      <a 
                        href={item.href} 
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900 focus-visible:text-indigo-600 outline-none focus-visible:underline"
                        onClick={(e) => handleLinkClick(e, item)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 border-t border-gray-900/10 pt-8">
          <p className="text-xs leading-5 text-gray-500">
            {config.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};
