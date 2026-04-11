import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'orange' | 'green' | 'red' | 'purple' | 'gray';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'cyan', size = 'sm' }) => {
  const variants = {
    cyan: 'bg-accent/10 text-accent border-accent/30',
    orange: 'bg-accent-2/10 text-accent-2 border-accent-2/30',
    green: 'bg-accent-green/10 text-accent-green border-accent-green/30',
    red: 'bg-accent-red/10 text-accent-red border-accent-red/30',
    purple: 'bg-accent-3/10 text-accent-3 border-accent-3/30',
    gray: 'bg-border/20 text-nld-muted2 border-border/50',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
  };

  return (
    <span className={`inline-block font-bold uppercase tracking-wider border rounded-full ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
};
