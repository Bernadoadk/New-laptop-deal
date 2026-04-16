import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Sidebar } from '../../components/admin/Sidebar';
import { Topbar } from '../../components/admin/Topbar';

export const AdminLayout = () => {
  const { token, isOwner } = useAuthStore();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  
  // Redirection automatique vers la console owner uniquement si on est à la racine /admin
  if (isOwner() && location.pathname === '/admin') {
    return <Navigate to="/admin/owner" replace />;
  }

  return (
    <div className="flex bg-[#050505] min-h-screen text-white font-inter selection:bg-accent/30 selection:text-white">
      <Sidebar isOwner={isOwner()} />
      <div className="flex-grow flex flex-col max-h-screen overflow-hidden">
        <Topbar />
        <main className="flex-grow overflow-y-auto px-12 py-10 scrollbar-hide">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

// Layout Owner — structure différente pour la console propriétaire
export const OwnerLayout = () => {
  const { token, isOwner } = useAuthStore();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Les employés ne peuvent pas accéder à la zone owner
  if (!isOwner()) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="flex bg-[#050505] min-h-screen text-white font-inter selection:bg-accent/30 selection:text-white">
      <Sidebar isOwner />
      <div className="flex-grow flex flex-col max-h-screen overflow-hidden">
        <Topbar />
        <main className="flex-grow overflow-y-auto px-12 py-10 scrollbar-hide">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
