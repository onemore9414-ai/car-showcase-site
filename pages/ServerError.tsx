import React from 'react';
import { RefreshCw, Wrench } from 'lucide-react';

export const ServerError: React.FC = () => {
  return (
    <div className="relative flex min-h-[70vh] w-full flex-col items-center justify-center bg-white px-6 text-center">
      {/* Visual Indicator */}
      <div className="mb-8 rounded-full bg-gray-50 p-6 ring-1 ring-gray-900/5">
        <Wrench className="h-8 w-8 text-gray-900" strokeWidth={1.5} />
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl font-light tracking-tight text-gray-900 sm:text-5xl">
        System Malfunction
      </h1>
      
      {/* Error Description */}
      <p className="mt-6 max-w-lg text-lg font-light text-gray-500">
        We have encountered an unexpected technical anomaly. 
        Our engineering team has been dispatched to restore full operational status.
      </p>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row">
        <button
          onClick={() => window.location.reload()}
          className="group flex items-center gap-2 rounded-full bg-black px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-gray-800 hover:shadow-lg"
        >
          <RefreshCw className="h-4 w-4 transition-transform group-hover:rotate-180" />
          Retry Connection
        </button>
        
        <button className="text-sm font-medium uppercase tracking-wider text-gray-500 hover:text-indigo-600 transition-colors">
          Contact Support
        </button>
      </div>

      {/* Error Code */}
      <div className="mt-16 border-t border-gray-100 pt-8">
        <span className="font-mono text-xs text-gray-400">Error Code: 500_INTERNAL_SERVER_ERROR</span>
      </div>
    </div>
  );
};