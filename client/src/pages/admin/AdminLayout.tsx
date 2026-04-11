import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Sidebar } from '../../components/admin/Sidebar';
import { Topbar } from '../../components/admin/Topbar';

export const AdminLayout = () => {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex bg-bg min-h-screen">
      <Sidebar />
      <div className="flex-grow flex flex-col max-h-screen overflow-hidden">
        <Topbar />
        <main className="flex-grow overflow-y-auto p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
