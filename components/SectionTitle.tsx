import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  alignment = 'center',
  className = '',
}) => {
  const alignmentStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const lineStyles = {
    left: 'bg-gradient-to-r from-brand-600 to-transparent',
    center: 'bg-brand-600',
    right: 'bg-gradient-to-l from-brand-600 to-transparent',
  };

  return (
    <div className={`flex flex-col ${alignmentStyles[alignment]} ${className}`}>
      {subtitle && (
        <span className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-brand-600">
          {subtitle}
        </span>
      )}
      <h2 className="max-w-4xl text-4xl font-light leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl font-serif">
        {title}
      </h2>
      <div className={`mt-8 h-0.5 w-24 ${lineStyles[alignment]} opacity-80`} />
    </div>
  );
};