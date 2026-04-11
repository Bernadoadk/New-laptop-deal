import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

// Client Pages
import { Home } from './pages/client/Home';
import { Catalogue } from './pages/client/Catalogue';
import { Configurateur } from './pages/client/Configurateur';
import { Panier } from './pages/client/Panier';
import { Navbar } from './components/client/Navbar';
import { Footer } from './components/client/Footer';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { Dashboard } from './pages/admin/Dashboard';
import { Orders } from './pages/admin/Orders';
import { Products } from './pages/admin/Products';
import { Components } from './pages/admin/Components';
import { Presets } from './pages/admin/Presets';

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

const CursorDot = () => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [active, setActive] = React.useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    const onMouseDown = () => setActive(true);
    const onMouseUp = () => setActive(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <div 
      className={`cursor-dot hidden md:block ${active ? 'active' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
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
        <CursorDot />
        
        <Routes>
          {/* Client Routes */}
          <Route path="/" element={<ClientLayout><Home /></ClientLayout>} />
          <Route path="/catalogue" element={<ClientLayout><Catalogue /></ClientLayout>} />
          <Route path="/configurateur" element={<ClientLayout><Configurateur /></ClientLayout>} />
          <Route path="/panier" element={<ClientLayout><Panier /></ClientLayout>} />
          <Route path="/reparation" element={<ClientLayout><Catalogue /></ClientLayout>} /> {/* Temporary redirect */}

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
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
