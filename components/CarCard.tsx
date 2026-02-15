import React from 'react';
import { ArrowUpRight, Gauge, Zap } from 'lucide-react';
import { FadeInImage } from './FadeInImage';

interface CarCardProps {
  image: string;
  name: string;
  price: string;
  horsepower: string;
  acceleration: string;
  onViewDetails?: () => void;
}

export const CarCard: React.FC<CarCardProps> = ({
  image,
  name,
  price,
  horsepower,
  acceleration,
  onViewDetails,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onViewDetails && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onViewDetails();
    }
  };

  return (
    <div 
      className="group relative flex flex-col overflow-hidden rounded-xl bg-gray-950 ring-1 ring-white/10 shadow-2xl transition-all duration-700 hover:-translate-y-2 hover:shadow-brand-500/20"
    >
      {/* Image Container */}
      <div 
        className="relative aspect-[4/3] overflow-hidden bg-gray-900 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset"
        onClick={onViewDetails}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${name}`}
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-40" />
        
        {/* Single Image */}
        <div className="absolute inset-0">
          <FadeInImage
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-110"
            containerClassName="h-full w-full"
          />
        </div>
      </div>

      {/* Card Content */}
      <div className="relative z-20 flex flex-1 flex-col px-8 pb-8 -mt-12">
        <div className="mb-8 pointer-events-none">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-400 mb-2 opacity-0 -translate-y-2 transition-all duration-700 group-hover:opacity-100 group-hover:translate-y-0">Collection 2025</p>
          <h3 className="text-3xl font-light text-white tracking-tight font-serif">{name}</h3>
          <p className="text-gray-400 mt-2 text-sm">{price}</p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-8 border-t border-white/5 py-6 mb-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center text-gray-500 text-[10px] uppercase tracking-widest font-bold">
              <Gauge className="mr-1.5 h-3 w-3" aria-hidden="true" /> 0-60 mph
            </div>
            <span className="text-xl font-medium text-white">{acceleration}</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center text-gray-500 text-[10px] uppercase tracking-widest font-bold">
              <Zap className="mr-1.5 h-3 w-3" aria-hidden="true" /> Horsepower
            </div>
            <span className="text-xl font-medium text-white">{horsepower}</span>
          </div>
        </div>

        <button 
          onClick={onViewDetails}
          className="mt-auto group/btn flex w-full items-center justify-between bg-white/5 px-4 py-4 rounded-lg text-xs font-bold text-white uppercase tracking-widest transition-all duration-500 hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          aria-label={`Configure ${name}`}
        >
          <span>Configure</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};