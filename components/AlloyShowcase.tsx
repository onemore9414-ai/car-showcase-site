import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Settings, ArrowRight, Disc, Car } from 'lucide-react';
import { useNavigation } from '../contexts/NavigationContext';
import { FadeInImage } from './FadeInImage';
import { ScrollReveal } from './ScrollReveal';

const ALLOYS = [
  {
    id: '1',
    name: 'Vossen HF-5',
    price: '$2,400',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZZTPAPPgqy0nTgac6R2M_GeAUIl7fdYtJgA&s',
    carImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqnvaO-K6wmCvkvHrfnD_eoIFKJAPY4R72-Q&s', 
    material: 'Forged Hybrid',
    size: '22"'
  },
  {
    id: '2',
    name: 'HRE P101',
    price: '$12,000',
    image: 'https://images.unsplash.com/photo-1578844251758-2f71da645217?q=80&w=800&auto=format&fit=crop',
    carImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1000&auto=format&fit=crop',
    material: 'Monoblock',
    size: '21"'
  },
  {
    id: '3',
    name: 'BBS FI-R',
    price: '$8,900',
    image: 'https://images.unsplash.com/photo-1611821064430-0d410298a006?q=80&w=800&auto=format&fit=crop',
    carImage: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1000&auto=format&fit=crop',
    material: 'Forged Aluminum',
    size: '20"'
  },
  {
    id: '4',
    name: 'Rotiform LAS-R',
    price: '$3,200',
    image: 'https://images.unsplash.com/photo-1626202485566-70438a167083?q=80&w=800&auto=format&fit=crop',
    carImage: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=1000&auto=format&fit=crop',
    material: 'Cast Aero',
    size: '19"'
  },
  {
    id: '5',
    name: 'Vorsteiner V-FF',
    price: '$4,100',
    image: 'https://images.unsplash.com/photo-1597816821857-e6f7fa5eb532?q=80&w=800&auto=format&fit=crop',
    carImage: 'https://images.unsplash.com/photo-1580273916550-e323be2ebdd9?q=80&w=1000&auto=format&fit=crop',
    material: 'Flow Forged',
    size: '21"'
  },
  {
    id: '6',
    name: 'ADV.1 ADV005',
    price: '$14,500',
    image: 'https://images.unsplash.com/photo-1568285559868-b78917812542?q=80&w=800&auto=format&fit=crop',
    carImage: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1000&auto=format&fit=crop',
    material: 'Titanium Hardware',
    size: '22"'
  }
];

export const AlloyShowcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'alloy' | 'scenario'>('alloy');
  const [isAnimating, setIsAnimating] = useState(false);
  const { navigateTo } = useNavigation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Throttle animation to prevent rapid-click glitches
  const handleNav = (direction: 'next' | 'prev') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    if (direction === 'next') {
      setActiveIndex((prev) => (prev + 1) % ALLOYS.length);
    } else {
      setActiveIndex((prev) => (prev - 1 + ALLOYS.length) % ALLOYS.length);
    }

    // Lock interaction for animation duration (match CSS transition)
    setTimeout(() => setIsAnimating(false), 500); 
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handleNav('prev');
    } else if (e.key === 'ArrowRight') {
      handleNav('next');
    }
  };

  // Circular offset calculation
  const getOffset = (index: number) => {
    const len = ALLOYS.length;
    let offset = index - activeIndex;
    if (offset > len / 2) offset -= len;
    if (offset < -len / 2) offset += len;
    return offset;
  };

  return (
    <section 
      className="bg-black py-24 overflow-hidden relative outline-none select-none" 
      aria-label="Bespoke Alloys Carousel"
      role="region"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      ref={containerRef}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-900 via-black to-black opacity-80 pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 h-full">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-500 mb-3 block">Customization</span>
            <h2 className="text-4xl font-light text-white sm:text-5xl leading-tight font-serif">
              Forged in Fire. <br/>
              <span className="text-gray-500">Sculpted by Air.</span>
            </h2>
            <p className="mt-4 text-gray-400 font-light max-w-xl mx-auto mb-8">
              Select your stance. Toggle between studio details and on-road scenarios.
            </p>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-gray-900/80 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
              <button
                onClick={() => setViewMode('alloy')}
                className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  viewMode === 'alloy' 
                    ? 'bg-white text-black shadow-lg scale-105' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Disc className="h-3 w-3" /> Studio
              </button>
              <button
                onClick={() => setViewMode('scenario')}
                className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  viewMode === 'scenario' 
                    ? 'bg-white text-black shadow-lg scale-105' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Car className="h-3 w-3" /> Scenario
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* 3D Arc Carousel Container */}
        <div 
          className="relative h-[500px] w-full flex justify-center items-center"
          style={{ perspective: '1200px' }}
          aria-live="polite"
        >
          {ALLOYS.map((alloy, index) => {
            const offset = getOffset(index);
            // Show more items to avoid gaps, adjust visibility logic
            const isVisible = Math.abs(offset) <= 2;
            
            // Animation Math
            // Increase spacing for better clickability
            const translateX = offset * 320; 
            const translateY = Math.abs(offset) * 40;
            const rotateY = offset * -25; // Rotate around Y for a coverflow-like effect
            const rotateZ = 0;
            const scale = 1 - Math.abs(offset) * 0.15;
            // Ensure active is always on top (high z-index)
            const zIndex = 50 - Math.abs(offset);
            const opacity = 1 - Math.abs(offset) * 0.3;

            if (!isVisible) return null;

            const isActive = offset === 0;

            return (
              <div
                key={alloy.id}
                className="absolute top-10 transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform cursor-pointer"
                style={{
                  transform: `translateX(-50%) translate3d(${translateX}px, ${translateY}px, -${Math.abs(offset) * 100}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex: zIndex,
                  opacity: Math.max(opacity, 0),
                  left: '50%',
                  // No marginLeft needed if using translateX(-50%)
                }}
                onClick={() => {
                   if (!isActive) {
                      // Allow clicking side items to navigate
                      if (offset > 0) handleNav('next');
                      else handleNav('prev');
                   }
                }}
                aria-hidden={!isActive}
              >
                {/* Card */}
                <div 
                  className={`
                    group relative h-[420px] w-[300px] overflow-hidden rounded-2xl border bg-gray-900 shadow-2xl transition-all duration-500
                    ${isActive ? 'border-brand-500/50 active-card-glow ring-2 ring-brand-500/20' : 'border-white/10 grayscale-[0.5]'}
                  `}
                >
                  {/* Images Container */}
                  <div className="relative h-[280px] w-full overflow-hidden bg-gray-800">
                    
                    {/* Primary Rim Image */}
                    <div className={`absolute inset-0 transition-all duration-700 ${viewMode === 'scenario' ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                      <div 
                         className="h-full w-full"
                         style={{ 
                           animation: isActive && viewMode === 'alloy' ? 'spin-slow 20s linear infinite' : 'none' 
                         }}
                      >
                        <FadeInImage
                          src={alloy.image}
                          alt={`${alloy.name} rim design`}
                          className="h-full w-full object-cover"
                          containerClassName="h-full w-full"
                        />
                      </div>
                      <div className="absolute inset-0 bg-[radial-gradient(circle,_transparent_30%,_rgba(0,0,0,0.8)_100%)]" />
                    </div>

                    {/* Secondary Car Image (Scenario Mode) */}
                    <div className={`absolute inset-0 transition-all duration-700 ${viewMode === 'scenario' ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}>
                      <FadeInImage
                        src={alloy.carImage}
                        alt={`${alloy.name} fitted on vehicle`}
                        className="h-full w-full object-cover"
                        containerClassName="h-full w-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                    </div>

                    {/* Badge */}
                    <div className="absolute top-4 right-4 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white border border-white/10 shadow-lg z-10">
                      {viewMode === 'alloy' ? alloy.material : 'Scenario View'}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative h-[140px] p-6 flex flex-col justify-between bg-gradient-to-b from-gray-900 to-black">
                    <div>
                       <div className="flex items-center justify-between">
                         <h3 className="text-xl font-bold text-white">{alloy.name}</h3>
                         <span className="text-brand-400 font-mono text-sm">{alloy.price}</span>
                       </div>
                       <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                          <Disc className="h-3 w-3" />
                          <span>{alloy.size} Configuration</span>
                       </div>
                    </div>

                    {/* Action Buttons */}
                    <div className={`flex gap-2 mt-4 transition-all duration-300 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-80'}`}>
                       <button 
                         onClick={(e) => { e.stopPropagation(); navigateTo('Collection'); }}
                         className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-[10px] font-bold uppercase tracking-widest text-black hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                         tabIndex={isActive ? 0 : -1}
                       >
                         <Settings className="h-3 w-3" /> Configure
                       </button>
                       <button 
                         onClick={(e) => { e.stopPropagation(); navigateTo('Collection'); }}
                         className="flex items-center justify-center rounded-lg border border-white/20 bg-transparent px-3 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                         aria-label="View Details"
                         tabIndex={isActive ? 0 : -1}
                       >
                         <ArrowRight className="h-4 w-4" />
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Navigation Controls - Placed AFTER items to ensure Z-Index stacking works naturally, plus explicit z-index */}
          <div className="absolute inset-y-0 left-0 right-0 pointer-events-none flex items-center justify-between z-[100] max-w-5xl mx-auto w-full px-4">
            <button 
              onClick={() => handleNav('prev')}
              disabled={isAnimating}
              className={`pointer-events-auto group flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white transition-all backdrop-blur-md shadow-2xl ${
                isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:text-black hover:scale-110 active:scale-95'
              }`}
              aria-label="Previous alloy"
            >
              <ChevronLeft className="h-8 w-8 transition-transform group-hover:-translate-x-1" />
            </button>
            <button 
              onClick={() => handleNav('next')}
              disabled={isAnimating}
              className={`pointer-events-auto group flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white transition-all backdrop-blur-md shadow-2xl ${
                isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:text-black hover:scale-110 active:scale-95'
              }`}
              aria-label="Next alloy"
            >
              <ChevronRight className="h-8 w-8 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};