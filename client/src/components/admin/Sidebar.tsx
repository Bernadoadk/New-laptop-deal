import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Box, Layers, Zap, LogOut, Laptop, ChevronRight, Users, Crown } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface SidebarProps {
  isOwner?: boolean;
}

export const Sidebar = ({ isOwner = false }: SidebarProps) => {
  const location = useLocation();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const employeeMenuItems = [
    { label: 'Tableau de Bord', icon: LayoutDashboard, path: '/admin' },
    { label: 'Commandes', icon: ShoppingCart, path: '/admin/orders' },
    { label: 'Produits', icon: Box, path: '/admin/products' },
    { label: 'Composants', icon: Layers, path: '/admin/components' },
    { label: 'Presets Build', icon: Zap, path: '/admin/presets' },
  ];

  const ownerMenuItems = [
    { label: 'Console Owner', icon: Crown, path: '/admin/owner' },
    { label: 'Commandes', icon: ShoppingCart, path: '/admin/orders' },
    { label: 'Produits', icon: Box, path: '/admin/products' },
    { label: 'Composants', icon: Layers, path: '/admin/components' },
    { label: 'Presets Build', icon: Zap, path: '/admin/presets' },
    { label: 'Employés', icon: Users, path: '/admin/owner#employees' },
  ];

  const menuItems = isOwner ? ownerMenuItems : employeeMenuItems;

  return (
    <div className="w-72 bg-bg/50 backdrop-blur-2xl border-r border-white/5 min-h-screen flex flex-col pt-10">
      <div className="px-8 mb-16">
        <Link to={isOwner ? '/admin/owner' : '/admin'} className="flex items-center gap-4 group">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-premium-glow group-hover:scale-105 transition-all ${
            isOwner ? 'bg-amber-500' : 'bg-accent'
          }`}>
            {isOwner ? <Crown className="text-white w-5 h-5" /> : <Laptop className="text-white w-5 h-5" />}
          </div>
          <div className="flex flex-col">
            <span className="font-outfit font-black text-sm text-white tracking-widest uppercase">NLD PANEL</span>
            <span className={`text-[9px] font-black tracking-[0.2em] mt-0.5 ${isOwner ? 'text-amber-400' : 'text-nld-muted opacity-60'}`}>
              {isOwner ? '⬡ PROPRIÉTAIRE' : 'ADMINISTRATION'}
            </span>
          </div>
        </Link>
      </div>

      <nav className="flex-grow px-4 space-y-1.5">
        <div className="px-4 mb-4">
          <span className="text-[10px] font-bold text-nld-muted/40 uppercase tracking-[0.2em]">Menu Principal</span>
        </div>
        {menuItems.map((item) => {
          const path = item.path.split('#')[0];
          const isActive = location.pathname === path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between px-5 py-3.5 rounded-2xl font-semibold text-sm transition-all group ${
                isActive
                  ? isOwner
                    ? 'bg-amber-500/10 text-white shadow-sm border border-amber-500/20'
                    : 'bg-accent/10 text-white shadow-sm border border-accent/20'
                  : 'text-nld-muted hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon className={`w-5 h-5 transition-colors ${
                  isActive
                    ? isOwner ? 'text-amber-400' : 'text-accent'
                    : 'text-nld-muted group-hover:text-white'
                }`} />
                {item.label}
              </div>
              {isActive && <ChevronRight className={`w-4 h-4 ${isOwner ? 'text-amber-400' : 'text-accent'}`} />}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 w-full px-5 py-4 bg-red-500/5 border border-red-500/10 rounded-2xl text-red-400 hover:bg-red-500 hover:text-white transition-all text-sm font-bold group"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Déconnexion
        </button>
      </div>
    </div>
  );
};
