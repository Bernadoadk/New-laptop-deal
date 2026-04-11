import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && <label className="text-xs font-bold uppercase text-nld-muted tracking-widest">{label}</label>}
        <input
          ref={ref}
          className={`w-full bg-bg-2 border ${error ? 'border-accent-red' : 'border-border'} px-4 py-2.5 rounded-lg focus:outline-none focus:border-accent transition-colors text-nld-text placeholder:text-nld-muted/50 ${className}`}
          {...props}
        />
        {error && <p className="text-accent-red text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
