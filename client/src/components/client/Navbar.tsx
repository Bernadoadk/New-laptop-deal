import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Laptop } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const cartItems = useCartStore((state) => state.items);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  const navLinks = [
    { name: 'ACCUEIL', path: '/' },
    { name: 'CATALOGUE', path: '/catalogue' },
    { name: 'CONFIGURATEUR', path: '/configurateur' },
    { name: 'RÉPARATION', path: '/reparation' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-bg/90 backdrop-blur-lg border-b border-border py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
            <Laptop className="text-bg w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-orbitron font-black text-xl leading-none text-white">NEW LAPTOP</span>
            <span className="font-orbitron font-bold text-sm leading-none text-accent tracking-[0.2em]">DEAL</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-bold text-sm tracking-widest hover:text-accent transition-colors ${location.pathname === link.path ? 'text-accent' : 'text-nld-muted2'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/panier" className="relative p-2 hover:bg-border rounded-lg transition-colors group">
            <ShoppingCart className="w-6 h-6 text-white group-hover:text-accent" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-2 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-glow-2">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg-2 border-b border-border overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-bold text-lg tracking-widest ${location.pathname === link.path ? 'text-accent' : 'text-nld-muted2'}`}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/panier" className="flex items-center gap-3 font-bold text-lg text-white">
                PANIER ({itemCount})
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
