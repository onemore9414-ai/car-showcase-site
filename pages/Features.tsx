import React from 'react';
import { Wind, Zap, Shield, Wifi, Leaf, Cpu, Layers, Eye, Gauge } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ScrollReveal } from '../components/ScrollReveal';

const FEATURES = [
  {
    title: 'Active Aerodynamics',
    description: 'Intelligent airflow management systems that adapt 500 times per second to optimize downforce and reduce drag.',
    icon: Wind,
  },
  {
    title: 'Hyper-Drive Powertrain',
    description: 'Next-generation electric motors delivering instant torque vectoring for unparalleled cornering precision.',
    icon: Zap,
  },
  {
    title: 'Structural Safety',
    description: 'Monocoque carbon-fiber chassis providing Formula 1 levels of driver protection and structural rigidity.',
    icon: Shield,
  },
  {
    title: 'Neural Connectivity',
    description: 'Seamless integration with your digital ecosystem, featuring predictive navigation and OTA updates.',
    icon: Wifi,
  },
  {
    title: 'Sustainable Luxury',
    description: 'Interiors crafted from ethically sourced, vegan, and recycled materials without compromising on quality.',
    icon: Leaf,
  },
  {
    title: 'AI Co-Pilot',
    description: 'Advanced driver assistance systems that learn your driving style to enhance safety and performance.',
    icon: Cpu,
  },
  {
    title: 'Adaptive Suspension',
    description: 'Magnetic ride control that reads the road surface to deliver a cloud-like ride or track-ready stiffness.',
    icon: Layers,
  },
  {
    title: 'Augmented Reality',
    description: 'Heads-up display projecting critical telemetry and navigation data directly onto the windshield.',
    icon: Eye,
  },
  {
    title: 'Precision Telemetry',
    description: 'Track-grade data logging and analysis tools built directly into the vehicle interface.',
    icon: Gauge,
  },
];

export const Features: React.FC = () => {
  return (
    <div className="bg-white">
      <SEO 
        title="Features & Technology" 
        description="Explore the cutting-edge technology and engineering features that define Brand Automotive vehicles." 
      />

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop"
          alt="Engine detail"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
        />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Engineered for Excellence</h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Every component is designed with a singular purpose: to create the ultimate driving experience.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-indigo-600 uppercase tracking-wide">Technology</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to command the road
          </p>
        </div>
        
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {FEATURES.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 100}>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              </ScrollReveal>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};