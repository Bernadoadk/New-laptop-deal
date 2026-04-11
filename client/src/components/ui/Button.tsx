import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  isLoading,
  children,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "btn-hex bg-accent text-bg hover:bg-accent-2 hover:text-white shadow-glow hover:shadow-glow-2",
    outline: "btn-hex-outline border-2 border-accent text-accent hover:bg-accent hover:text-bg",
    ghost: "bg-transparent text-nld-text hover:bg-border",
    danger: "bg-accent-red/20 text-accent-red border border-accent-red/50 hover:bg-accent-red hover:text-white",
  };

  const sizes = {
    sm: "px-4 py-1 text-sm",
    md: "px-6 py-2",
    lg: "px-8 py-3 text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </button>
  );
};
