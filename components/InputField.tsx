import React from 'react';
import { AlertCircle } from 'lucide-react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  disabled,
  ...props
}) => {
  const inputId = id || props.name;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label 
        htmlFor={inputId}
        className={`
          text-xs font-bold uppercase tracking-widest transition-colors
          ${error ? 'text-red-500' : 'text-gray-500'}
        `}
      >
        {label}
      </label>
      
      <div className="relative group">
        <input
          id={inputId}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={`
            w-full rounded-lg border px-4 py-3.5 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-300 focus-visible:ring-2 focus-visible:ring-offset-1
            ${error 
              ? 'border-red-300 bg-red-50/10 focus:border-red-500 focus-visible:ring-red-500' 
              : 'border-gray-200 bg-white hover:border-gray-300 focus:border-black focus-visible:ring-black'
            }
            ${disabled ? 'cursor-not-allowed bg-gray-50 opacity-70' : ''}
          `}
          {...props}
        />
        
        {error && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 animate-in fade-in zoom-in duration-200 pointer-events-none">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
          </div>
        )}
      </div>

      {error ? (
        <span 
          id={errorId}
          className="text-xs font-medium text-red-500 ml-1 flex items-center gap-1 animate-pulse"
          role="alert"
        >
          {error}
        </span>
      ) : helperText ? (
        <span 
          id={helperId}
          className="text-xs text-gray-400 ml-1"
        >
          {helperText}
        </span>
      ) : null}
    </div>
  );
};