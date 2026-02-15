
import React, { useState } from 'react';
import { Check, X, HelpCircle, ChevronDown, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ScrollReveal } from '../components/ScrollReveal';
import { useNavigation } from '../contexts/NavigationContext';

const TIERS = [
  {
    name: 'Connect',
    id: 'tier-connect',
    href: '#',
    price: '$0',
    description: 'Essential connectivity and remote control features for your vehicle.',
    features: [
      'Remote Lock/Unlock',
      'Vehicle Status Report',
      'Service Scheduling',
      'Basic Navigation',
      'Over-the-Air Updates',
    ],
    mostPopular: false,
  },
  {
    name: 'Performance+',
    id: 'tier-performance',
    href: '#',
    price: '$49',
    description: 'Advanced telemetry and performance analysis for the driving enthusiast.',
    features: [
      'All Connect features',
      'Real-time Telemetry Recording',
      'Track Mode Analytics',
      '0-60 mph Timer & Leaderboard',
      'Predictive Maintenance AI',
      'Priority Support',
    ],
    mostPopular: true,
  },
  {
    name: 'Concierge',
    id: 'tier-concierge',
    href: '#',
    price: '$199',
    description: 'The ultimate ownership experience with 24/7 personal assistance.',
    features: [
      'All Performance+ features',
      '24/7 Human Concierge',
      'Event Access & VIP Experiences',
      'Valet Service Coordination',
      'Global Roaming Data Included',
      'Annual Track Day Invite',
    ],
    mostPopular: false,
  },
];

const COMPARISON_FEATURES = [
  { name: 'Remote App Access', tiers: { connect: true, performance: true, concierge: true } },
  { name: 'Digital Key', tiers: { connect: true, performance: true, concierge: true } },
  { name: 'Cloud Driver Profiles', tiers: { connect: true, performance: true, concierge: true } },
  { name: 'Live Traffic', tiers: { connect: false, performance: true, concierge: true } },
  { name: 'Performance Data Logging', tiers: { connect: false, performance: true, concierge: true } },
  { name: 'Remote Sentry Mode', tiers: { connect: false, performance: true, concierge: true } },
  { name: 'Streaming Music Included', tiers: { connect: false, performance: false, concierge: true } },
  { name: 'Dedicated Service Advisor', tiers: { connect: false, performance: false, concierge: true } },
];

const FAQS = [
  {
    question: 'Can I cancel my subscription at any time?',
    answer: 'Yes, all digital service subscriptions are billed monthly and can be cancelled at any time through your vehicle dashboard or mobile app.',
  },
  {
    question: 'Is the Connect plan free forever?',
    answer: 'Yes, the Connect plan is included with every vehicle purchase for the lifetime of the vehicle.',
  },
  {
    question: 'How does the track mode analytics work?',
    answer: 'Performance+ uses the vehicle\'s internal sensors and GPS to map your lap times, G-forces, and braking points, visualizing them on the center console.',
  },
  {
    question: 'Can I upgrade my plan later?',
    answer: 'Absolutely. Upgrades take effect immediately, unlocking new features instantly via an over-the-air update.',
  },
];

export const Pricing: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const { navigateTo } = useNavigation();

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSelectPlan = (tierName: string) => {
    navigateTo('Signup', { plan: tierName });
  };

  return (
    <div className="bg-white">
      <SEO 
        title="Membership & Pricing" 
        description="Choose the perfect digital services package for your vehicle. From essential connectivity to VIP concierge services." 
      />

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Ownership Membership</h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Unlock the full potential of your vehicle with our premium digital service packages.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:gap-x-8">
            {TIERS.map((tier, index) => (
              <ScrollReveal key={tier.id} delay={index * 100}>
                <div 
                  className={`relative flex h-full flex-col justify-between rounded-3xl p-8 ring-1 xl:p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                    tier.mostPopular 
                      ? 'bg-gray-900 ring-gray-900 shadow-xl' 
                      : 'bg-white ring-gray-200'
                  }`}
                >
                  {tier.mostPopular && (
                    <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-indigo-600 px-3 py-1 text-center text-sm font-semibold text-white shadow-md">
                      Most Popular
                    </div>
                  )}
                  <div>
                    <div className="flex items-center justify-between gap-x-4">
                      <h3 
                        id={tier.id} 
                        className={`text-lg font-bold leading-8 ${tier.mostPopular ? 'text-white' : 'text-gray-900'}`}
                      >
                        {tier.name}
                      </h3>
                    </div>
                    <p className={`mt-4 text-sm leading-6 ${tier.mostPopular ? 'text-gray-300' : 'text-gray-600'}`}>
                      {tier.description}
                    </p>
                    <p className="mt-6 flex items-baseline gap-x-1">
                      <span className={`text-4xl font-bold tracking-tight ${tier.mostPopular ? 'text-white' : 'text-gray-900'}`}>
                        {tier.price}
                      </span>
                      <span className={`text-sm font-semibold leading-6 ${tier.mostPopular ? 'text-gray-300' : 'text-gray-600'}`}>
                        /month
                      </span>
                    </p>
                    <ul role="list" className={`mt-8 space-y-3 text-sm leading-6 ${tier.mostPopular ? 'text-gray-300' : 'text-gray-600'}`}>
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <Check className={`h-6 w-5 flex-none ${tier.mostPopular ? 'text-indigo-400' : 'text-indigo-600'}`} aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => handleSelectPlan(tier.name)}
                    aria-describedby={tier.id}
                    className={`mt-8 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      tier.mostPopular
                        ? 'bg-white text-gray-900 hover:bg-gray-100 focus-visible:outline-white'
                        : 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
                    }`}
                  >
                    Select Plan
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Feature Comparison</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Detailed breakdown of features included in each membership tier.
            </p>
          </div>

          <div className="relative overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-4 font-bold tracking-wider">Feature</th>
                  <th scope="col" className="px-6 py-4 font-bold tracking-wider text-center">Connect</th>
                  <th scope="col" className="px-6 py-4 font-bold tracking-wider text-center text-indigo-600">Performance+</th>
                  <th scope="col" className="px-6 py-4 font-bold tracking-wider text-center">Concierge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {COMPARISON_FEATURES.map((feature) => (
                  <tr key={feature.name} className="hover:bg-gray-50">
                    <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                      {feature.name}
                    </th>
                    <td className="px-6 py-4 text-center">
                      {feature.tiers.connect ? (
                        <Check className="mx-auto h-5 w-5 text-green-500" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-gray-300" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center bg-indigo-50/30">
                      {feature.tiers.performance ? (
                        <Check className="mx-auto h-5 w-5 text-green-500" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-gray-300" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {feature.tiers.concierge ? (
                        <Check className="mx-auto h-5 w-5 text-green-500" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-gray-300" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
            <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
              {FAQS.map((faq, index) => (
                <div key={faq.question} className="pt-6">
                  <dt>
                    <button
                      onClick={() => toggleFaq(index)}
                      className="flex w-full items-start justify-between text-left text-gray-900"
                    >
                      <span className="text-base font-semibold leading-7">{faq.question}</span>
                      <span className="ml-6 flex h-7 items-center">
                        <ChevronDown 
                          className={`h-6 w-6 transform transition-transform duration-200 ${openFaqIndex === index ? 'rotate-180' : 'rotate-0'}`} 
                          aria-hidden="true" 
                        />
                      </span>
                    </button>
                  </dt>
                  <div 
                    className={`mt-2 pr-12 overflow-hidden transition-all duration-300 ease-in-out ${
                      openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-base leading-7 text-gray-600 pb-4">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </dl>
          </div>
          
          <div className="mt-16 text-center">
             <button 
                onClick={() => navigateTo('Contact', { interest: 'Support Inquiry' })}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm hover:bg-gray-50 cursor-pointer transition-colors"
             >
               <HelpCircle className="h-4 w-4 text-indigo-600" />
               <span className="text-sm font-medium text-gray-900">Need more help? Contact Support</span>
               <ArrowRight className="h-3 w-3 text-gray-400" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
