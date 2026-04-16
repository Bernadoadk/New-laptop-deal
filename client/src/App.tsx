import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

// Client Pages
import { Home } from './pages/client/Home';
import { Catalogue } from './pages/client/Catalogue';
import { Configurateur } from './pages/client/Configurateur';
import { Panier } from './pages/client/Panier';
import { Reparation } from './pages/client/Reparation';
import { Navbar } from './components/client/Navbar';
import { Footer } from './components/client/Footer';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout, OwnerLayout } from './pages/admin/AdminLayout';
import { Dashboard } from './pages/admin/Dashboard';
import { Orders } from './pages/admin/Orders';
import { Products } from './pages/admin/Products';
import { Components } from './pages/admin/Components';
import { Presets } from './pages/admin/Presets';
import { OwnerDashboard } from './pages/admin/OwnerDashboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ClientLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          {/* Client Routes */}
          <Route path="/" element={<ClientLayout><Home /></ClientLayout>} />
          <Route path="/catalogue" element={<ClientLayout><Catalogue /></ClientLayout>} />
          <Route path="/configurateur" element={<ClientLayout><Configurateur /></ClientLayout>} />
          <Route path="/panier" element={<ClientLayout><Panier /></ClientLayout>} />
          <Route path="/reparation" element={<ClientLayout><Reparation /></ClientLayout>} />

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Owner Zone — accès exclusif propriétaire */}
          <Route path="/admin/owner" element={<OwnerLayout />}>
            <Route index element={<OwnerDashboard />} />
          </Route>

          {/* Employee Admin Zone */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
            <Route path="components" element={<Components />} />
            <Route path="presets" element={<Presets />} />
          </Route>
        </Routes>

        <Toaster position="bottom-right" />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
