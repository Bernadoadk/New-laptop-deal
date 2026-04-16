import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  variant?: 'primary' | 'secondary' | 'green' | 'purple' | 'cyan' | 'orange';
}

export const KpiCard: React.FC<KpiCardProps> = ({ label, value, icon: Icon, variant = 'primary' }) => {
  const variants = {
    primary: 'text-accent bg-accent/5 border-accent/10',
    secondary: 'text-accent-2 bg-accent-2/5 border-accent-2/10',
    green: 'text-emerald-400 bg-emerald-500/5 border-emerald-500/10',
    purple: 'text-violet-400 bg-violet-500/5 border-violet-500/10',
    // Fallbacks
    cyan: 'text-accent bg-accent/5 border-accent/10',
    orange: 'text-orange-400 bg-orange-500/5 border-orange-500/10',
  };

  return (
    <div className={`p-8 premium-card border-white/5 group hover:border-white/10`}>
      <div className="flex justify-between items-start mb-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${variants[variant]}`}>
          <Icon className="w-7 h-7" />
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Live
          </span>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-4xl font-black text-white tracking-tighter font-outfit">{value}</p>
        <p className="text-xs font-bold text-nld-muted uppercase tracking-[0.2em] opacity-70">{label}</p>
      </div>
    </div>
  );
};
