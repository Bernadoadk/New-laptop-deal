import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Box, Layers, Zap, LogOut, Laptop } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const Sidebar = () => {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const menuItems = [
    { label: 'Tableau de Bord', icon: LayoutDashboard, path: '/admin' },
    { label: 'Commandes', icon: ShoppingCart, path: '/admin/orders' },
    { label: 'Produits', icon: Box, path: '/admin/products' },
    { label: 'Composants', icon: Layers, path: '/admin/components' },
    { label: 'Presets Setup', icon: Zap, path: '/admin/presets' },
  ];

  return (
    <div className="w-72 bg-bg-2 border-r border-border min-h-screen flex flex-col pt-8">
      <div className="px-8 mb-12">
        <Link to="/admin" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
            <Laptop className="text-bg w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-orbitron font-black text-xs text-white">NLD ADMIN</span>
            <span className="font-orbitron text-[8px] text-accent tracking-[0.3em]">CONSOLE V1.0</span>
          </div>
        </Link>
      </div>

      <nav className="flex-grow px-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
              location.pathname === item.path
                ? 'bg-accent/10 text-accent border border-accent/20'
                : 'text-nld-muted2 hover:bg-border hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-border">
        <button 
          onClick={logout}
          className="flex items-center gap-4 w-full px-4 py-3 text-nld-muted2 hover:text-accent-red transition-colors text-sm font-medium"
        >
          <LogOut className="w-5 h-5" />
          Déconnexion
        </button>
      </div>
    </div>
  );
};
