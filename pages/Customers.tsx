import React from 'react';
import { Quote, ArrowRight, Building2, Trophy, Zap } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ScrollReveal } from '../components/ScrollReveal';
import { FadeInImage } from '../components/FadeInImage';

// Mock Data
const LOGOS = [
  { name: 'Apex Racing', icon: Trophy },
  { name: 'Quantum Energy', icon: Zap },
  { name: 'Global Logistics', icon: Building2 },
  { name: 'Nebula Tech', icon: Zap },
  { name: 'Vanguard Corp', icon: Building2 },
  { name: 'Horizon Sport', icon: Trophy },
];

const TESTIMONIALS = [
  {
    content: "The Phantom GT isn't just a vehicle; it's a competitive advantage. The telemetry data we gather from track days has revolutionized our driver training program.",
    author: "Christian Wolff",
    role: "Team Principal",
    company: "Apex Racing Team",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
  },
  {
    content: "Switching our executive fleet to the Vortex S was a statement of intent. We reduced our carbon footprint by 40% while providing our leadership with unparalleled comfort and performance.",
    author: "Sarah Connor",
    role: "Chief Sustainability Officer",
    company: "Cyberdyne Systems",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
  },
  {
    content: "The level of customization available is unheard of. Brand didn't just sell me a car; they co-created a masterpiece that fits my lifestyle perfectly.",
    author: "James Bond",
    role: "Private Collector",
    company: "London, UK",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
  }
];

const CASE_STUDIES = [
  {
    title: "Electrifying the Pacific Highway",
    client: "EcoTour Adventures",
    description: "How a fleet of Vortex S vehicles completed a 1,500-mile endurance run on a single rapid-charge cycle per day.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop",
    stat: "40% Efficiency Gain"
  },
  {
    title: "Autonomous Logistics at Scale",
    client: "Global Freight",
    description: "Implementing our AI Co-Pilot technology to manage a fleet of 50 transport vehicles with zero incidents over 12 months.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    stat: "Zero Incidents"
  },
  {
    title: "The Le Mans Hybrid Challenge",
    client: "Redline Motorsport",
    description: "Developing a custom kinetic energy recovery system that helped Redline secure a podium finish.",
    image: "https://images.unsplash.com/photo-1532906619279-a76e0594ba72?q=80&w=2062&auto=format&fit=crop",
    stat: "1.2s Lap Time Reduction"
  }
];

export const Customers: React.FC = () => {
  return (
    <div className="bg-white">
      <SEO 
        title="Our Customers" 
        description="See how the world's leading organizations and individuals are driving the future with Brand Automotive." 
      />

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Driven by Leaders</h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              We are proud to power the ambitions of the world's most innovative companies and discerning individuals.
            </p>
          </div>
        </div>
      </div>

      {/* Logo Cloud */}
      <div className="py-24 sm:py-32 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold leading-8 text-gray-900 mb-12 uppercase tracking-widest">
            Trusted by industry pioneers
          </h2>
          <div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-6">
            {LOGOS.map((logo, index) => (
              <ScrollReveal key={logo.name} delay={index * 50}>
                <div className="flex flex-col items-center justify-center gap-4 opacity-50 transition-opacity hover:opacity-100">
                  <logo.icon className="h-12 w-12 text-gray-900" strokeWidth={1} />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-900">{logo.name}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-indigo-600 uppercase tracking-wide">Testimonials</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Voices from the driver's seat
            </p>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {TESTIMONIALS.map((testimonial, index) => (
              <ScrollReveal key={testimonial.author} delay={index * 100}>
                <div className="flex flex-col justify-between h-full bg-white p-8 rounded-2xl shadow-sm ring-1 ring-gray-900/5">
                  <div>
                    <Quote className="h-8 w-8 text-indigo-600 mb-6" />
                    <p className="text-lg leading-7 text-gray-900">"{testimonial.content}"</p>
                  </div>
                  <div className="mt-8 flex items-center gap-x-4 border-t border-gray-100 pt-6">
                    <img className="h-10 w-10 rounded-full bg-gray-50 object-cover" src={testimonial.image} alt={testimonial.author} />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-gray-600">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Case Studies Preview */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Success Stories</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Deep dives into how our technology solves complex challenges.
            </p>
          </div>
          
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {CASE_STUDIES.map((study, index) => (
              <ScrollReveal key={study.title} delay={index * 100}>
                <article className="flex flex-col items-start justify-between group cursor-pointer">
                  <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100 mb-6">
                    <FadeInImage
                      src={study.image}
                      alt={study.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      containerClassName="h-full w-full"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-600 shadow-sm">
                      {study.stat}
                    </div>
                  </div>
                  <div className="max-w-xl">
                    <div className="mt-2 flex items-center gap-x-4 text-xs">
                      <span className="text-gray-500">Case Study</span>
                      <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                        {study.client}
                      </span>
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-lg font-bold leading-6 text-gray-900 group-hover:text-indigo-600 transition-colors">
                        <a href="#">
                          <span className="absolute inset-0" />
                          {study.title}
                        </a>
                      </h3>
                      <p className="mt-4 text-sm leading-6 text-gray-600 line-clamp-3">
                        {study.description}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-indigo-600">
                      Read full story <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};