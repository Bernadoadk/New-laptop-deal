import React, { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string | number; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && <label className="text-xs font-bold uppercase text-nld-muted tracking-widest">{label}</label>}
        <select
          ref={ref}
          className={`w-full bg-bg-2 border ${error ? 'border-accent-red' : 'border-border'} px-4 py-2.5 rounded-lg focus:outline-none focus:border-accent transition-colors text-nld-text ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-bg-3">
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-accent-red text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
