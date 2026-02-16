import React from 'react';
import { Target, Users, Award, TrendingUp } from 'lucide-react';
import { SEO } from '../components/SEO';

export const About: React.FC = () => {
  return (
    <div className="bg-white">
      <SEO 
        title="About Us - The Pursuit of Perfection" 
        description="Founded on the principles of aerospace precision and artistic passion, Brand Automotive represents the absolute cutting edge of automotive performance." 
      />

      {/* Hero Statement */}
      <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              We don't chase speed. <br/>
              <span className="text-indigo-600">We define it.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 font-light">
              Founded on the principles of aerospace precision and artistic passion, 
              Brand represents the absolute cutting edge of automotive performance.
            </p>
          </div>
        </div>
        {/* Background decorative element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-50/50 rounded-full blur-3xl -z-10" />
      </section>

      {/* Brand Story */}
      <section className="py-24 sm:py-32 bg-black text-white rounded-3xl mx-4 sm:mx-8 overflow-hidden relative" aria-label="Our Story">
         <img 
            src="https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2070&auto=format&fit=crop"
            alt="Brand Design Studio in Modena"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
         />
         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
         
         <div className="relative mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-400">Our Heritage</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Born on the Track. <br/>Refined for the Road.</h2>
              <div className="mt-6 space-y-6 text-gray-300 leading-relaxed">
                <p>
                  It started in a small garage in Modena, 1998. Our founder, a former F1 engineer, 
                  believed that the gap between racing technology and street legality was artificial.
                </p>
                <p>
                  Today, every vehicle we produce is a testament to that original vision. 
                  We don't use assembly lines; we use workstations. We don't have workers; 
                  we have artisans. Every stitch, every weld, every line of code is scrutinized 
                  for perfection.
                </p>
              </div>
            </div>
         </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 sm:py-32" aria-label="Mission">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
             <div className="order-2 lg:order-1 relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop"
                  alt="Engineering Precision"
                  className="absolute inset-0 h-full w-full object-cover"
                />
             </div>
             <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">The Pursuit of Perfection</h2>
                <p className="mt-6 text-lg text-gray-600">
                  Our mission is not just to build the fastest cars in the world, but to build 
                  the most emotional ones. We strive to create a connection between machine 
                  and driver that is telepathic.
                </p>
                
                <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
                   <div className="border-l-2 border-indigo-600 pl-4">
                      <h3 className="font-semibold text-gray-900">Innovation First</h3>
                      <p className="mt-2 text-sm text-gray-600">Pioneering hybrid powertrains before they were standard.</p>
                   </div>
                   <div className="border-l-2 border-indigo-600 pl-4">
                      <h3 className="font-semibold text-gray-900">Sustainable Velocity</h3>
                      <p className="mt-2 text-sm text-gray-600">Carbon-neutral manufacturing facilities since 2020.</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="border-y border-gray-100 bg-gray-50/50 py-24 sm:py-32" aria-label="Company Statistics">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">Global Showrooms</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">42</dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">Employees Worldwide</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">1,200+</dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">Racing Trophies</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">85</dd>
            </div>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-24 sm:py-32" aria-label="Leadership Team">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
           <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">The Visionaries</h2>
           <p className="mt-4 text-lg text-gray-600">The minds behind the machines.</p>
           
           <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {/* Team Member 1 */}
              <div className="group">
                 <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                      alt="Alessandro Rossi, Chief Executive Officer"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                 </div>
                 <h3 className="text-lg font-bold text-gray-900">Alessandro Rossi</h3>
                 <p className="text-sm text-indigo-600">Chief Executive Officer</p>
              </div>

              {/* Team Member 2 */}
              <div className="group">
                 <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
                      alt="Elena Vance, Head of Design"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                 </div>
                 <h3 className="text-lg font-bold text-gray-900">Elena Vance</h3>
                 <p className="text-sm text-indigo-600">Head of Design</p>
              </div>

               {/* Team Member 3 */}
              <div className="group">
                 <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop"
                      alt="Dr. Marcus Chen, Chief Engineer"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                 </div>
                 <h3 className="text-lg font-bold text-gray-900">Dr. Marcus Chen</h3>
                 <p className="text-sm text-indigo-600">Chief Engineer</p>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};