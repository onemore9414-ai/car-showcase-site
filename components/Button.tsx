import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold uppercase tracking-widest transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl border border-transparent focus-visible:ring-gray-900',
    secondary: 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md focus-visible:ring-gray-200',
    outline: 'bg-transparent text-gray-900 border border-gray-900 hover:bg-gray-900 hover:text-white focus-visible:ring-gray-900',
    ghost: 'bg-transparent text-gray-900 hover:bg-brand-50 hover:text-brand-600 focus-visible:ring-brand-500',
  };

  const sizes = {
    sm: 'text-[10px] px-4 py-2 rounded-md gap-2',
    md: 'text-xs px-6 py-3.5 rounded-lg gap-2',
    lg: 'text-sm px-8 py-4 rounded-lg gap-3',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={size === 'lg' ? 20 : 16} aria-hidden="true" />
      ) : (
        <>
          {leftIcon && <span className="flex items-center" aria-hidden="true">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="flex items-center" aria-hidden="true">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};