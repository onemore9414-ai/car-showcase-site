import React from 'react';
import { Globe, ShieldCheck } from 'lucide-react';

export const MaintenanceMode: React.FC = () => {
  return (
    <div className="relative flex min-h-[80vh] w-full flex-col items-center justify-center bg-white px-6 text-center overflow-hidden">
      {/* Abstract Background Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      ></div>

      <div className="relative z-10 flex max-w-2xl flex-col items-center">
        {/* Logo Area */}
        <div className="mb-12 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white shadow-lg">
            <Globe className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-gray-900">Brand</span>
        </div>

        {/* Status Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 shadow-sm">
            <ShieldCheck className="h-4 w-4 text-gray-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-600">System Update</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl font-light tracking-tight text-gray-900 sm:text-6xl font-serif">
          Refining Excellence
        </h1>
        
        {/* Message */}
        <p className="mt-8 text-lg font-light text-gray-500 sm:text-xl leading-relaxed max-w-lg">
          We are currently enhancing our digital showroom to serve you better. 
          The pursuit of perfection never stops.
        </p>

        {/* Countdown Visual Placeholder */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 sm:gap-12">
          <div className="flex flex-col items-center group">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 text-3xl font-bold text-gray-900 ring-1 ring-gray-900/5 transition-all group-hover:bg-gray-100">00</div>
            <span className="mt-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Days</span>
          </div>
          <div className="pt-4 text-gray-300 text-2xl">:</div>
          <div className="flex flex-col items-center group">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 text-3xl font-bold text-gray-900 ring-1 ring-gray-900/5 transition-all group-hover:bg-gray-100">02</div>
            <span className="mt-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Hours</span>
          </div>
           <div className="pt-4 text-gray-300 text-2xl">:</div>
          <div className="flex flex-col items-center group">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 text-3xl font-bold text-gray-900 ring-1 ring-gray-900/5 transition-all group-hover:bg-gray-100">45</div>
            <span className="mt-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Minutes</span>
          </div>
        </div>
        
        <div className="mt-16 h-px w-24 bg-gray-200"></div>

        <p className="mt-8 text-sm text-gray-400">
            For immediate assistance, please contact our concierge at <br />
            <a href="mailto:concierge@brand.com" className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors mt-2 inline-block">concierge@brand.com</a>
        </p>
      </div>
    </div>
  );
};