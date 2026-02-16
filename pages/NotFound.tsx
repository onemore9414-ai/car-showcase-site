import React from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import { ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="relative flex min-h-[70vh] w-full flex-col items-center justify-center overflow-hidden bg-white">
      {/* Abstract Background Element */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <span className="text-[20rem] font-bold text-black leading-none">404</span>
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div className="mb-8 h-px w-16 bg-indigo-600" />
        
        <h1 className="text-4xl font-light tracking-tight text-gray-900 sm:text-5xl">
          Destination Unknown
        </h1>
        
        <p className="mt-6 max-w-md text-lg font-light text-gray-500">
          The route you are attempting to navigate does not exist in our current cartography. 
          Please recalibrate your trajectory.
        </p>

        <div className="mt-10">
          <button
            onClick={() => navigateTo('Home')}
            className="group flex items-center gap-3 border-b border-black pb-1 text-sm font-medium uppercase tracking-widest text-black transition-all hover:border-indigo-600 hover:text-indigo-600"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Return to Paddock
          </button>
        </div>
      </div>
    </div>
  );
};