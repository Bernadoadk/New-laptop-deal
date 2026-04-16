import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'green' | 'red' | 'purple' | 'gray' | 'cyan' | 'orange';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', size = 'sm' }) => {
  const variants = {
    primary: 'bg-accent/10 text-accent border-accent/20',
    secondary: 'bg-accent-2/10 text-accent-2 border-accent-2/20',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
    purple: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    gray: 'bg-white/5 text-nld-muted border-white/10',
    // Fallbacks for existing code
    cyan: 'bg-accent/10 text-accent border-accent/20',
    orange: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
  };

  return (
    <span className={`inline-block font-semibold uppercase tracking-wider border rounded-lg backdrop-blur-md ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
};
