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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-bg/80 backdrop-blur-xl border-b border-white/[0.05] py-3' : 'bg-transparent py-5'}`}>
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-accent rounded-xl flex items-center justify-center shadow-premium-glow group-hover:scale-105 transition-all duration-300">
            <Laptop className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-outfit font-black text-xl leading-none text-white tracking-tight">NEW LAPTOP</span>
            <span className="font-outfit font-bold text-xs leading-none text-accent tracking-[0.3em] mt-1 ml-0.5">DEAL</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium text-sm tracking-wide hover:text-white transition-colors relative group ${location.pathname === link.path ? 'text-white' : 'text-nld-muted'}`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`} />
            </Link>
          ))}
          
          <Link to="/panier" className="relative p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all group">
            <ShoppingCart className="w-5 h-5 text-white group-hover:text-accent transition-colors" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-premium ring-2 ring-bg">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2.5 bg-white/5 rounded-xl text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-bg/95 backdrop-blur-2xl border-b border-white/[0.05] shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium text-lg ${location.pathname === link.path ? 'text-accent' : 'text-nld-muted'}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-white/5 w-full" />
              <Link to="/panier" className="flex items-center justify-between font-medium text-lg text-white">
                <span>PANIER</span>
                <span className="bg-accent px-3 py-1 rounded-full text-xs">{itemCount} ARTICLES</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
