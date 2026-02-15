import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  width?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  noPadding?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  width = 'lg',
  noPadding = false,
}) => {
  const maxWidths = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[96rem]',
    full: 'max-w-full',
  };

  return (
    <div
      className={`mx-auto w-full ${maxWidths[width]} ${
        noPadding ? 'px-0' : 'px-4 sm:px-6 lg:px-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};