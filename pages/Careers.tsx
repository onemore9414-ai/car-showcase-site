import React from 'react';
import { Briefcase, Heart, Globe, Zap, Clock, GraduationCap, ArrowRight, MapPin } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ScrollReveal } from '../components/ScrollReveal';
import { FadeInImage } from '../components/FadeInImage';

const BENEFITS = [
  {
    title: 'Competitive Equity',
    description: 'We believe every employee should be an owner. Generous stock option packages for all roles.',
    icon: Zap,
  },
  {
    title: 'Health & Wellness',
    description: 'Comprehensive medical, dental, and vision coverage, plus a monthly wellness stipend.',
    icon: Heart,
  },
  {
    title: 'Global Mobility',
    description: 'Opportunities to work from our offices in Modena, Munich, London, or remotely.',
    icon: Globe,
  },
  {
    title: 'Flexible Schedule',
    description: 'We focus on output, not hours. Manage your own time to maintain a healthy work-life balance.',
    icon: Clock,
  },
  {
    title: 'Learning Budget',
    description: 'Annual stipend for conferences, courses, and books to keep your skills sharp.',
    icon: GraduationCap,
  },
  {
    title: 'Vehicle Program',
    description: 'After one year of tenure, access our employee lease program for the latest models.',
    icon: Briefcase, // Using Briefcase as a placeholder for a "Car" icon or similar benefit
  },
];

const OPEN_ROLES = [
  {
    id: 1,
    title: 'Senior Aerodynamics Engineer',
    department: 'Engineering',
    location: 'Modena, Italy',
    type: 'Full-time'
  },
  {
    id: 2,
    title: 'Lead UI/UX Designer',
    department: 'Design',
    location: 'Remote / London',
    type: 'Full-time'
  },
  {
    id: 3,
    title: 'Embedded Systems Architect',
    department: 'Software',
    location: 'Munich, Germany',
    type: 'Full-time'
  },
  {
    id: 4,
    title: 'Product Marketing Manager',
    department: 'Marketing',
    location: 'London, UK',
    type: 'Full-time'
  },
  {
    id: 5,
    title: 'Autonomous Driving Researcher',
    department: 'R&D',
    location: 'Modena, Italy',
    type: 'Full-time'
  },
  {
    id: 6,
    title: 'Supply Chain Operations Lead',
    department: 'Operations',
    location: 'Modena, Italy',
    type: 'Full-time'
  }
];

export const Careers: React.FC = () => {
  return (
    <div className="bg-white">
      <SEO 
        title="Careers at Brand" 
        description="Join the team redefining the future of automotive performance. Explore open roles in engineering, design, and software." 
      />

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <FadeInImage
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
          alt="Team collaboration"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
          containerClassName="absolute inset-0 -z-10 h-full w-full"
        />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Build the Impossible</h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              We are a team of dreamers, engineers, and artisans united by a single obsession: 
              creating the world's most advanced performance vehicles.
            </p>
          </div>
        </div>
      </div>

      {/* Culture Section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our DNA</h2>
              <div className="mt-6 space-y-6 text-lg leading-8 text-gray-600">
                <p>
                  At Brand, we don't just assemble cars; we cultivate a culture of relentless innovation. 
                  Our workshops in Modena are a fusion of Renaissance artistry and Silicon Valley agility.
                </p>
                <p>
                  We value <strong className="text-gray-900">precision over speed</strong> in our craft, 
                  but <strong className="text-gray-900">speed over bureaucracy</strong> in our decisions. 
                  Every team member, from the intern to the CEO, is empowered to challenge the status quo 
                  if it leads to a better driving experience.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-4">
                  <FadeInImage 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop" 
                    alt="Engineering Lab"
                    className="aspect-[3/4] rounded-2xl object-cover shadow-lg"
                    containerClassName="rounded-2xl overflow-hidden"
                  />
                  <FadeInImage 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" 
                    alt="Team Meeting"
                    className="aspect-[4/3] rounded-2xl object-cover shadow-lg"
                    containerClassName="rounded-2xl overflow-hidden"
                  />
               </div>
               <div className="space-y-4 pt-8">
                  <FadeInImage 
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop" 
                    alt="Design Studio"
                    className="aspect-[4/3] rounded-2xl object-cover shadow-lg"
                    containerClassName="rounded-2xl overflow-hidden"
                  />
                  <FadeInImage 
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1000&auto=format&fit=crop" 
                    alt="Workshop"
                    className="aspect-[3/4] rounded-2xl object-cover shadow-lg"
                    containerClassName="rounded-2xl overflow-hidden"
                  />
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600 uppercase tracking-wide">Perks & Benefits</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Fueling your best work
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We take care of the details so you can focus on the big picture.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {BENEFITS.map((benefit, index) => (
                <ScrollReveal key={benefit.title} delay={index * 100}>
                  <div className="flex flex-col bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-indigo-600">
                        <benefit.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      {benefit.title}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex-auto">{benefit.description}</p>
                    </dd>
                  </div>
                </ScrollReveal>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Open Roles Section */}
      <div className="py-24 sm:py-32" id="open-roles">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Open Roles</h2>
            <p className="mt-4 text-lg text-gray-600">
              Ready to accelerate your career? Find your place on the starting grid.
            </p>
          </div>

          <div className="mx-auto max-w-4xl divide-y divide-gray-100 border-t border-gray-200">
            {OPEN_ROLES.map((role, index) => (
              <ScrollReveal key={role.id} delay={index * 50}>
                <div className="group flex flex-col gap-6 py-6 sm:flex-row sm:items-center sm:justify-between transition-colors hover:bg-gray-50 rounded-lg px-4 -mx-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {role.title}
                      </h3>
                      <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                        {role.department}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                         <MapPin className="h-4 w-4" />
                         {role.location}
                      </div>
                      <div className="flex items-center gap-1">
                         <Clock className="h-4 w-4" />
                         {role.type}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-none items-center gap-4">
                    <a
                      href="#"
                      className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 flex items-center gap-2 group-hover:ring-indigo-600 group-hover:text-indigo-600 transition-all"
                    >
                      Apply Now <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-12 text-center">
             <p className="text-sm text-gray-500">
               Don't see the right role? <a href="#" className="text-indigo-600 hover:underline">Send us an open application.</a>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};