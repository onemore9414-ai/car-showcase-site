import React from 'react';
import { SEO } from '../components/SEO';
import { useSite } from '../contexts/SiteContext';

export const TermsAndConditions: React.FC = () => {
  const { config } = useSite();

  return (
    <div className="bg-white">
      <SEO 
        title="Terms and Conditions" 
        description="Review the terms and conditions governing the use of the Brand Automotive website and services." 
      />

      <div className="mx-auto max-w-3xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Terms and Conditions</h1>
          <p className="mt-4 text-base leading-7 text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="mt-16 text-base leading-8 text-gray-600 whitespace-pre-wrap">
          {config.termsAndConditions}
        </div>
      </div>
    </div>
  );
};
