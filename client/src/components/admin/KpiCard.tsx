import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  variant?: 'cyan' | 'orange' | 'green' | 'purple';
}

export const KpiCard: React.FC<KpiCardProps> = ({ label, value, icon: Icon, variant = 'cyan' }) => {
  const variants = {
    cyan: 'from-accent/20 to-transparent border-accent/30 text-accent',
    orange: 'from-accent-2/20 to-transparent border-accent-2/30 text-accent-2',
    green: 'from-accent-green/20 to-transparent border-accent-green/30 text-accent-green',
    purple: 'from-accent-3/20 to-transparent border-accent-3/30 text-accent-3',
  };

  return (
    <div className={`p-6 rounded-xl border bg-gradient-to-br ${variants[variant]}`}>
      <div className="flex justify-between items-start mb-4">
        <Icon className="w-8 h-8" />
        <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Status: OK</span>
      </div>
      <p className="text-3xl font-black text-white mb-1">{value}</p>
      <p className="text-xs uppercase tracking-[0.2em] font-bold text-nld-muted2">{label}</p>
    </div>
  );
};
