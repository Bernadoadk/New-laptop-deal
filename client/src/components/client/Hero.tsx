import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { Zap, Shield, Truck, Settings } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-accent/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent-3/20 rounded-full blur-[120px] animate-pulse" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/30 rounded-full mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-ping" />
              <span className="text-[10px] font-bold text-accent tracking-[0.2em] uppercase">Level Up Your Setup</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              DOMINE LE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-3 glow-text">GAME.</span>
            </h1>
            
            <p className="text-xl text-nld-muted2 mb-10 max-w-2xl leading-relaxed">
              Le premier tech-shop au Bénin dédié à l'élite. PCs Gamer sur mesure, Laptops haute performance et périphériques d'exception. Livraison Rapide & SAV Pro.
            </p>

            <div className="flex flex-wrap gap-6">
              <Link to="/catalogue">
                <Button size="lg" className="px-10">DÉCOUVRIR LE CATALOGUE</Button>
              </Link>
              <Link to="/configurateur">
                <Button size="lg" variant="outline" className="px-10">BÂTIR MON SETUP</Button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {[
              { icon: Zap, label: 'Performance Max' },
              { icon: Shield, label: 'Garantie 6 Mois' },
              { icon: Truck, label: 'Livraison Express' },
              { icon: Settings, label: 'Service Expert' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 glass-panel flex items-center justify-center text-accent">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-nld-muted2">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Hero Image / Decor */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/3 aspect-square"
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-accent/20 rounded-full blur-[100px]" />
          <img 
            src="https://images.unsplash.com/photo-1587202372775-e229f172b9d2?w=800&q=80" 
            alt="Gaming PC" 
            className="w-full h-full object-contain relative z-10 animate-float"
          />
        </div>
      </motion.div>
    </div>
  );
};
