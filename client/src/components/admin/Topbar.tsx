import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { Bell, User, LayoutGrid, Crown } from 'lucide-react';

export const Topbar = () => {
  const user = useAuthStore((state) => state.user);
  const isOwner = user?.role === 'owner';

  return (
    <header className="h-24 bg-bg/40 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-10">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-nld-muted">
          <LayoutGrid className="w-5 h-5" />
        </div>
        <h1 className="text-sm font-bold text-white uppercase tracking-[0.2em]">
          {isOwner ? 'CONSOLE PROPRIÉTAIRE' : 'DASHBOARD'}{' '}
          <span className="text-white/30 font-medium">/ SYSTÈME</span>
        </h1>
      </div>

      <div className="flex items-center gap-8">
        <button className="relative p-3 rounded-2xl bg-white/5 text-nld-muted hover:text-white hover:bg-white/10 transition-all group">
          <Bell className="w-5 h-5" />
          <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-bg group-hover:scale-125 transition-transform" />
        </button>

        <div className="flex items-center gap-4 pl-8 border-l border-white/5">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-white leading-none mb-1">{user?.name}</p>
            <div className="flex items-center justify-end gap-1.5 mt-1">
              {isOwner ? (
                <span className="flex items-center gap-1 text-[9px] font-black tracking-widest uppercase px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full">
                  <Crown className="w-2.5 h-2.5" /> OWNER
                </span>
              ) : (
                <span className="text-[9px] font-black tracking-widest uppercase px-2 py-0.5 bg-accent/10 text-accent border border-accent/20 rounded-full">
                  EMPLOYÉ
                </span>
              )}
            </div>
          </div>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border cursor-pointer transition-all hover:scale-105 ${
            isOwner
              ? 'bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20'
              : 'bg-accent/10 border-accent/20 hover:bg-accent/20'
          }`}>
            {isOwner
              ? <Crown className="text-amber-400 w-6 h-6" />
              : <User className="text-accent w-6 h-6" />
            }
          </div>
        </div>
      </div>
    </header>
  );
};
