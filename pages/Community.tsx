import React from 'react';
import { MessageSquare, Calendar, Users, ArrowRight, Instagram, Twitter, Youtube, Hash, MapPin, Clock } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ScrollReveal } from '../components/ScrollReveal';
import { FadeInImage } from '../components/FadeInImage';

// Mock Data
const FORUM_CATEGORIES = [
  {
    id: 1,
    title: 'Owner\'s Lounge',
    description: 'Exclusive discussions for verified owners. Share your experiences, photos, and road trip stories.',
    threads: '1.2k',
    activeUsers: '450',
    icon: Users
  },
  {
    id: 2,
    title: 'Technical Support',
    description: 'Deep dives into engineering, maintenance, and troubleshooting. Help from certified technicians.',
    threads: '8.5k',
    activeUsers: '1.2k',
    icon: Hash
  },
  {
    id: 3,
    title: 'Modifications & Tuning',
    description: 'Showcase your builds, discuss aftermarket parts, and share performance tuning results.',
    threads: '3.4k',
    activeUsers: '890',
    icon: MessageSquare
  },
  {
    id: 4,
    title: 'Track Days & Racing',
    description: 'Coordinate meetups, share lap times, and discuss racing techniques and setups.',
    threads: '920',
    activeUsers: '340',
    icon: Calendar
  }
];

const EVENTS = [
  {
    id: 1,
    title: 'Global Owners Meet 2025',
    date: 'Aug 15-17, 2025',
    location: 'Modena, Italy',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop',
    description: 'Our annual pilgrimage to the factory. Factory tours, exclusive unveilings, and a gala dinner.',
    spots: 'Limited Availability'
  },
  {
    id: 2,
    title: 'Goodwood Festival of Speed',
    date: 'Jul 10-13, 2025',
    location: 'West Sussex, UK',
    image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=2070&auto=format&fit=crop',
    description: 'Join us at the Brand hospitality suite for the world\'s greatest celebration of motorsport culture.',
    spots: 'Open to Public'
  },
  {
    id: 3,
    title: 'Winter Drive Experience',
    date: 'Dec 05-10, 2025',
    location: 'Lapland, Finland',
    image: 'https://images.unsplash.com/photo-1483304528321-0674f0040030?q=80&w=2070&auto=format&fit=crop',
    description: 'Master the art of ice driving with our professional instructors on a frozen lake circuit.',
    spots: 'Sold Out (Waitlist)'
  }
];

export const Community: React.FC = () => {
  return (
    <div className="bg-white">
      <SEO 
        title="Community & Events" 
        description="Connect with fellow enthusiasts, join exclusive events, and participate in technical discussions." 
      />

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <FadeInImage
          src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop"
          alt="Car Meet"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
          containerClassName="absolute inset-0 -z-10 h-full w-full"
        />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Join the Club</h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              More than just ownership. It's a global family of drivers, dreamers, and engineering enthusiasts.
            </p>
          </div>
        </div>
      </div>

      {/* Forums Section */}
      <div className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-indigo-600 uppercase tracking-wide">Forums</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Join the conversation
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Connect with experts and owners from around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {FORUM_CATEGORIES.map((forum, index) => (
              <ScrollReveal key={forum.id} delay={index * 100}>
                <div className="relative flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-lg hover:border-indigo-100 group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 group-hover:bg-indigo-600 transition-colors">
                      <forum.icon className="h-6 w-6 text-indigo-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{forum.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{forum.description}</p>
                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-6">
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>{forum.threads} threads</span>
                      <span>{forum.activeUsers} online</span>
                    </div>
                    <span className="flex items-center text-sm font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
                      View Topics <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Upcoming Events</h2>
            <p className="mt-4 text-lg text-gray-600">
              Mark your calendars for these exclusive experiences.
            </p>
          </div>

          <div className="space-y-8">
            {EVENTS.map((event, index) => (
              <ScrollReveal key={event.id} delay={index * 100}>
                <div className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-900/5 transition-all hover:shadow-xl lg:flex-row">
                  <div className="relative h-64 overflow-hidden lg:h-auto lg:w-96 flex-none">
                    <FadeInImage
                      src={event.image}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      containerClassName="h-full w-full"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-8 sm:p-10">
                    <div>
                      <div className="flex items-center justify-between gap-4">
                         <h3 className="text-2xl font-bold tracking-tight text-gray-900">{event.title}</h3>
                         <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${
                           event.spots.includes('Sold Out') 
                             ? 'bg-red-50 text-red-700 ring-red-600/10' 
                             : 'bg-green-50 text-green-700 ring-green-600/20'
                         }`}>
                           {event.spots}
                         </span>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-indigo-500" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-indigo-500" />
                          {event.location}
                        </div>
                      </div>
                      <p className="mt-6 text-base leading-7 text-gray-600">
                        {event.description}
                      </p>
                    </div>
                    <div className="mt-8 flex items-center gap-4">
                      <button className="rounded-md bg-black px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition-colors">
                        Register Interest
                      </button>
                      <button className="text-sm font-semibold leading-6 text-gray-900">
                        Learn more <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          <div className="mt-12 text-center">
             <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 flex items-center justify-center gap-2 mx-auto">
               View Full Calendar <ArrowRight className="h-4 w-4" />
             </button>
          </div>
        </div>
      </div>

      {/* Social Links Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-3xl bg-gray-900 py-16 sm:py-24 px-6 lg:px-16 text-center relative overflow-hidden">
             {/* Background Pattern */}
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
             
             <div className="relative z-10">
               <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Stay Connected</h2>
               <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">
                 Follow us on social media for daily updates, behind-the-scenes content, and community highlights.
               </p>
               
               <div className="mx-auto mt-12 grid max-w-lg grid-cols-1 gap-8 sm:grid-cols-3">
                  <a href="#" className="flex flex-col items-center gap-4 group">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 transition-all group-hover:bg-white/10 group-hover:scale-110">
                      <Instagram className="h-8 w-8 text-white" />
                    </div>
                    <span className="text-base font-semibold text-white">Instagram</span>
                    <span className="text-sm text-gray-500">@brandauto</span>
                  </a>
                  
                  <a href="#" className="flex flex-col items-center gap-4 group">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 transition-all group-hover:bg-white/10 group-hover:scale-110">
                      <Twitter className="h-8 w-8 text-white" />
                    </div>
                    <span className="text-base font-semibold text-white">Twitter</span>
                    <span className="text-sm text-gray-500">@brandauto</span>
                  </a>
                  
                  <a href="#" className="flex flex-col items-center gap-4 group">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 transition-all group-hover:bg-white/10 group-hover:scale-110">
                      <Youtube className="h-8 w-8 text-white" />
                    </div>
                    <span className="text-base font-semibold text-white">YouTube</span>
                    <span className="text-sm text-gray-500">Brand Automotive</span>
                  </a>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};