import React from 'react';
import { Smartphone, Music, Map, Home, Server, Shield, Cloud, Radio, MessageSquare, ArrowRight, Code } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ScrollReveal } from '../components/ScrollReveal';

const INTEGRATIONS = [
  {
    name: 'Apple CarPlay',
    description: 'Seamlessly connect your iPhone for maps, music, and messages directly on the dashboard.',
    icon: Smartphone,
    category: 'Connectivity'
  },
  {
    name: 'Android Auto',
    description: 'Integrate your Android device to access your favorite apps and Google Assistant on the go.',
    icon: Smartphone,
    category: 'Connectivity'
  },
  {
    name: 'Spotify',
    description: 'Native integration with high-fidelity streaming support for an immersive audio experience.',
    icon: Music,
    category: 'Entertainment'
  },
  {
    name: 'Google Maps',
    description: 'Real-time traffic updates, satellite view, and predictive routing powered by Google.',
    icon: Map,
    category: 'Navigation'
  },
  {
    name: 'Smart Home',
    description: 'Control your garage door, lights, and thermostat directly from your vehicle interface.',
    icon: Home,
    category: 'IoT'
  },
  {
    name: 'Cloud Sync',
    description: 'Automatically sync driver profiles, seat preferences, and destinations across your fleet.',
    icon: Cloud,
    category: 'Services'
  }
];

export const Integrations: React.FC = () => {
  return (
    <div className="bg-white">
      <SEO 
        title="Integrations & Ecosystem" 
        description="Connect your digital life with your driving experience. Explore our supported platforms, apps, and developer API." 
      />

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Connected Ecosystem</h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Your vehicle shouldn't be an island. We integrate seamlessly with the services and devices you use every day.
            </p>
          </div>
        </div>
      </div>

      {/* Integration Grid */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Supported Platforms</h2>
            <p className="mt-4 text-lg text-gray-600">Native support for the world's leading technology standards.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {INTEGRATIONS.map((integration, index) => (
              <ScrollReveal key={integration.name} delay={index * 100}>
                <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-8 ring-1 ring-gray-200 transition-all hover:shadow-lg hover:ring-indigo-600/20">
                  <div>
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 group-hover:bg-indigo-600 transition-colors duration-300">
                      <integration.icon className="h-6 w-6 text-indigo-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                       <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                         {integration.category}
                       </span>
                    </div>
                    <h3 className="text-lg font-bold leading-8 text-gray-900">{integration.name}</h3>
                    <p className="mt-2 text-base leading-7 text-gray-600">{integration.description}</p>
                  </div>
                  <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-indigo-600">
                    Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* API Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Developer API</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Build the future of mobility. Our open API allows authorized developers to create custom applications, 
              telemetry analysis tools, and fleet management solutions.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {[
              {
                title: 'Real-time Telemetry',
                description: 'Access millisecond-level data on vehicle performance, battery status, and location.',
                icon: Server,
              },
              {
                title: 'Remote Control SDK',
                description: 'Securely manage climate control, locks, and charging schedules programmatically.',
                icon: Radio,
              },
              {
                title: 'Enterprise Security',
                description: 'Bank-grade encryption and OAuth 2.0 authentication ensure your data remains secure.',
                icon: Shield,
              },
            ].map((feature) => (
              <div key={feature.title} className="flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900">
                  <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold leading-8 text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-base leading-7 text-gray-600 flex-auto">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Read Documentation
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-2">
              Request Access <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};