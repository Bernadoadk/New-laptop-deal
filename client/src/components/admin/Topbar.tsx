import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { Bell, User } from 'lucide-react';

export const Topbar = () => {
  const admin = useAuthStore((state) => state.admin);

  return (
    <header className="h-20 bg-bg border-b border-border flex items-center justify-between px-8">
      <div>
        <h1 className="text-lg font-bold text-white uppercase tracking-widest font-orbitron">
          Console de Gestion
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-nld-muted2 hover:text-white transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent-red rounded-full" />
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-border">
          <div className="text-right">
            <p className="text-xs font-bold text-white leading-none mb-1">{admin?.name}</p>
            <p className="text-[10px] text-nld-muted2 uppercase tracking-widest">{admin?.email}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center border border-accent/40">
            <User className="text-accent w-6 h-6" />
          </div>
        </div>
      </div>
    </header>
  );
};
