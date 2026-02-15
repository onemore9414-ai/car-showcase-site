import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface FadeInImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  priority?: boolean;
}

export const FadeInImage: React.FC<FadeInImageProps> = ({ 
  containerClassName = '', 
  className = '', 
  alt,
  priority = false,
  ...props 
}) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  const handleLoad = () => setStatus('loaded');
  const handleError = () => setStatus('error');

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${containerClassName}`}>
      {/* Loading Skeleton */}
      <div 
        className={`absolute inset-0 bg-gray-200 z-10 transition-opacity duration-700 ease-out ${
          status === 'loading' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
      />

      {/* Error State */}
      {status === 'error' && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-100 text-gray-400">
          <ImageOff className="h-8 w-8" />
        </div>
      )}
      
      {/* Actual Image */}
      <img
        {...props}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] transform ${
          status === 'loaded'
            ? 'opacity-100 scale-100 blur-0' 
            : 'opacity-0 scale-110 blur-md'
        } ${className}`}
      />
    </div>
  );
};