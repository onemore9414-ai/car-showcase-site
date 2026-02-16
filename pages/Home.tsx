
import React, { useRef, useState, MouseEvent } from 'react';
import { ArrowRight, Zap, Wind, Timer, Play, Car as CarIcon, AlertCircle, RefreshCw } from 'lucide-react';
import { CarCard } from '../components/CarCard';
import { SectionTitle } from '../components/SectionTitle';
import { Button } from '../components/Button';
import { useNavigation } from '../contexts/NavigationContext';
import { useCars } from '../contexts/CarContext';
import { useSite } from '../contexts/SiteContext';
import { ScrollReveal } from '../components/ScrollReveal';
import { FadeInImage } from '../components/FadeInImage';
import { SEO } from '../components/SEO';
import { AlloyShowcase } from '../components/AlloyShowcase';

export const Home: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { cars, isLoading, error, refreshCars } = useCars();
  const { config } = useSite();
  
  // 3D Tilt State
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 60; // Reduced sensitivity for subtler effect
    const y = -(e.clientY - top - height / 2) / 60; 

    setRotate({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const handleWatchFilm = () => {
    // Simple placeholder for video functionality
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  };

  const handleDownloadBrochure = () => {
    alert("Brochure download started...");
  };

  // Get featured cars - Logic: featured=true, limit=5
  const featuredCars = cars.filter(car => car.featured).slice(0, 5);

  return (
    <div className="flex flex-col gap-24 pb-12">
      <SEO 
        title="Luxury Electric & Performance Vehicles" 
        description="Experience the pinnacle of automotive engineering. Brand defines the future of speed with luxury electric and hypercar performance." 
      />

      <style>{`
        @keyframes heroSpawn {
          0% {
            opacity: 0;
            transform: scale(1.3) translateY(20px);
            filter: blur(15px) brightness(0);
          }
          40% {
             opacity: 1;
             filter: blur(10px) brightness(0.5);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0) brightness(1);
          }
        }
        .animate-hero-spawn {
          animation: heroSpawn 2.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .text-glow {
          text-shadow: 0 0 30px rgba(255,255,255,0.4);
        }
      `}</style>

      {/* 3D Hero Section */}
      <section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-[85vh] min-h-[600px] w-full overflow-hidden rounded-3xl bg-gray-950 shadow-2xl ring-1 ring-white/10 group perspective-1000"
        style={{ perspective: '2000px' }}
        aria-label="Hero Section"
      >
        {/* Animated Hero Background Image */}
        <div className="absolute inset-0 h-full w-full animate-hero-spawn overflow-hidden">
          <FadeInImage
            src={config.hero.heroImage}
            alt="Brand Luxury Sports Car Hero"
            priority={true} 
            className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-[20s] ease-linear group-hover:scale-105"
            containerClassName="absolute inset-0 h-full w-full"
          />
          {/* High Contrast Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
        </div>
        
        {/* 3D Content Container */}
        <div 
          className="relative flex h-full flex-col justify-end px-6 pb-24 sm:px-12 sm:pb-32 lg:px-16"
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div className="max-w-4xl">
            {/* Tagline */}
            <div className="overflow-hidden mb-4">
              <span className="block text-sm font-bold uppercase tracking-[0.3em] text-brand-400 animate-in slide-in-from-bottom-4 duration-700 delay-100">
                {config.hero.tagline}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-6xl font-sans font-extrabold tracking-tighter text-white sm:text-8xl lg:text-9xl leading-[0.9] mb-6">
              <span className="block animate-in slide-in-from-bottom-8 duration-700 delay-200">{config.hero.headlinePrefix}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 animate-in slide-in-from-bottom-8 duration-700 delay-300">{config.hero.headlineGradient}</span>
            </h1>

            {/* Subheadline */}
            <p className="max-w-xl text-lg text-gray-300 font-light leading-relaxed animate-in slide-in-from-bottom-4 duration-700 delay-500 border-l-2 border-brand-600 pl-6 mb-10">
              {config.hero.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 animate-in fade-in zoom-in duration-700 delay-700">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={() => navigateTo('Collection')}
                rightIcon={<ArrowRight className="h-4 w-4" />}
                className="bg-white text-black hover:bg-gray-200 border-none px-8"
              >
                Discover Collection
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleWatchFilm}
                className="text-white border-white/30 bg-white/5 hover:bg-white/10 hover:text-white hover:border-white backdrop-blur-md px-8"
                leftIcon={<Play className="h-4 w-4 fill-current" />}
              >
                Watch Film
              </Button>
            </div>
          </div>
        </div>

        {/* Stylish & Unique Bottom Text */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center pointer-events-none">
            <div className="text-center space-y-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-[1800ms]">
                <div className="flex items-center justify-center gap-4 text-white/30 mb-2">
                    <div className="h-px w-8 sm:w-16 bg-white/30"></div>
                    <span className="text-[10px] tracking-[0.4em] uppercase font-sans text-white/60">Limitless</span>
                    <div className="h-px w-8 sm:w-16 bg-white/30"></div>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-white tracking-[0.2em] leading-tight text-glow mix-blend-overlay">
                    PRECISION <span className="text-brand-300">///</span> SOUL
                </h2>
            </div>
        </div>

      </section>

      {/* Brand Statement */}
      <section className="flex justify-center px-6 sm:px-12" aria-label="Brand Philosophy">
        <ScrollReveal>
          <SectionTitle 
            title='"We don&apos;t just build cars. We sculpt motion."'
            subtitle="The Philosophy"
            alignment="center"
          />
        </ScrollReveal>
      </section>

      {/* Featured Cars */}
      <section className="px-6 sm:px-12" aria-label="Featured Collection">
        <ScrollReveal className="flex items-end justify-between mb-12">
           <div>
             <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 mb-2 block">Exclusive</span>
             <h2 className="text-3xl font-light text-gray-900 font-serif">The Collection</h2>
           </div>
           <Button 
             variant="ghost" 
             onClick={() => navigateTo('Collection')}
             rightIcon={<ArrowRight className="h-4 w-4" />}
             className="hidden sm:inline-flex hover:translate-x-1"
           >
             View all models
           </Button>
        </ScrollReveal>
        
        {isLoading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[420px] rounded-xl bg-gray-100 animate-pulse border border-gray-200">
                <div className="h-2/3 bg-gray-200 w-full" />
                <div className="p-6 space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <ScrollReveal>
            <div className="flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/50 py-16 text-center">
              <div className="mb-4 rounded-full bg-red-100 p-3">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Unable to load collection</h3>
              <p className="mt-2 text-sm text-gray-500 mb-6">{error}</p>
              <Button 
                onClick={refreshCars} 
                variant="secondary"
                leftIcon={<RefreshCw className="h-4 w-4" />}
              >
                Retry Connection
              </Button>
            </div>
          </ScrollReveal>
        ) : featuredCars.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredCars.map((car, index) => (
              <ScrollReveal key={car.id} delay={index * 150}>
                <article>
                  <CarCard 
                    image={car.image}
                    name={car.name}
                    price={car.price}
                    acceleration={car.acceleration}
                    horsepower={car.horsepower}
                    onViewDetails={() => navigateTo('ProductDetail', { id: car.id })}
                  />
                </article>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <ScrollReveal>
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-24 text-center">
              <div className="mb-6 rounded-full bg-gray-100 p-4">
                <CarIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Showroom Update in Progress</h3>
              <p className="mt-2 max-w-md text-sm text-gray-500">
                Our featured collection is currently being curated for the upcoming season. 
                Please explore our full inventory to see available models.
              </p>
              <Button 
                variant="primary" 
                size="md" 
                className="mt-8"
                onClick={() => navigateTo('Collection')}
              >
                Browse Full Inventory
              </Button>
            </div>
          </ScrollReveal>
        )}
        
        <div className="mt-8 flex justify-center sm:hidden">
           <Button 
             variant="ghost" 
             onClick={() => navigateTo('Collection')}
             rightIcon={<ArrowRight className="h-4 w-4" />}
           >
             View all models
           </Button>
        </div>
      </section>

      {/* Alloy Showcase Animation */}
      <AlloyShowcase />

      {/* Highlights / Specs */}
      <ScrollReveal>
        <section className="relative overflow-hidden rounded-3xl bg-gray-950 py-16 sm:py-24 px-6 sm:px-12 shadow-2xl" aria-label="Performance Statistics">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-brand-900/20 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-brand-800/20 blur-3xl animate-pulse delay-700" />
          
          <div className="relative z-10 grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-400">Performance</span>
              <h2 className="mt-4 text-4xl font-light text-white sm:text-5xl leading-tight font-serif">Unrivaled Statistics</h2>
              <p className="mt-6 text-lg text-gray-400 leading-relaxed">
                Our proprietary hyper drivetrain delivers instant torque and unmatched handling. 
                Designed for the track, liberated for the road.
              </p>
              
              <dl className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
                {[
                  { icon: Zap, label: '0-60 mph', value: '1.9s' },
                  { icon: Wind, label: 'Top Speed', value: '250+' },
                  { icon: Timer, label: 'Nürburgring', value: '6:35' }
                ].map((stat, i) => (
                  <ScrollReveal key={stat.label} delay={i * 200} className="flex flex-col border-l border-brand-600/30 pl-6">
                    <dt className="flex items-center text-xs font-bold uppercase tracking-wider text-gray-500">
                      <stat.icon className="mr-2 h-3 w-3 text-brand-400" /> {stat.label}
                    </dt>
                    <dd className="mt-2 text-3xl font-medium text-white">{stat.value}</dd>
                  </ScrollReveal>
                ))}
              </dl>
            </div>
            <ScrollReveal delay={300} className="relative aspect-video rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
              <FadeInImage
                src="https://cdn.wallpapersafari.com/5/48/Ahoipz.jpg" 
                alt="High performance engine detail view" 
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-[2s] ease-out opacity-90 hover:opacity-100"
                containerClassName="h-full w-full"
              />
            </ScrollReveal>
          </div>
        </section>
      </ScrollReveal>

      {/* Call to Action */}
      <ScrollReveal>
        <section className="bg-gray-50 rounded-3xl p-12 sm:p-20 text-center transition-colors hover:bg-gray-100 duration-500" aria-label="CTA">
           <h2 className="text-3xl font-light tracking-tight text-gray-900 sm:text-5xl mb-8 font-serif">Ready to drive the future?</h2>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button 
                variant="primary" 
                size="lg" 
                className="hover:scale-105 transition-transform"
                onClick={() => navigateTo('Contact', { interest: 'Find Dealer' })}
              >
                Find a Dealer
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                className="hover:scale-105 transition-transform"
                onClick={handleDownloadBrochure}
              >
                Download Brochure
              </Button>
           </div>
        </section>
      </ScrollReveal>
    </div>
  );
};
