import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && <label className="text-[10px] font-bold uppercase text-nld-muted tracking-[0.2em] ml-1">{label}</label>}
        <input
          ref={ref}
          className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} px-5 py-3.5 rounded-2xl focus:outline-none focus:border-accent/40 focus:bg-white/10 transition-all text-white font-medium placeholder:text-nld-muted/40 selection:bg-accent/30 ${className}`}
          {...props}
        />
        {error && <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest mt-1 ml-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
