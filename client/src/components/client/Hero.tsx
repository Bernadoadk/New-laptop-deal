import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { Zap, Shield, Truck, Settings, ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-gradient-to-l from-accent/10 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-[120px] animate-slowPulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent-2/10 rounded-full blur-[120px] animate-slowPulse" />

      <div className="container-custom relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — Texte */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-xs text-white/70 tracking-wide">L'excellence technologique au Bénin</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black mb-8 leading-[1.05] tracking-tighter text-white">
              L'art de la <br />
              <span className="premium-gradient-text">performance.</span>
            </h1>

            <p className="text-xl text-nld-muted mb-12 max-w-xl leading-relaxed">
              Donnez vie à vos projets les plus ambitieux. Des stations de travail ultra-performantes, assemblées méticuleusement pour les professionnels de l'image, du code et du design.
            </p>

            <div className="flex flex-wrap gap-6 mb-20">
              <Link to="/catalogue">
                <Button size="lg" className="px-10 group">
                  EXPLORER LA COLLECTION <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/configurateur">
                <Button size="lg" variant="secondary" className="px-10">
                  CONFIGURATEUR SUR MESURE
                </Button>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-12 border-t border-white/10 pt-12"
            >
              {[
                { icon: Zap, label: 'Performance', desc: 'Optimisation Turbo' },
                { icon: Shield, label: 'Garantie', desc: 'Sérénité Totale' },
                { icon: Truck, label: 'Livraison', desc: 'Partout au Bénin' },
                { icon: Settings, label: 'Support', desc: 'Expertise 24/7' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-3 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-sm">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white uppercase tracking-wider">{item.label}</div>
                    <div className="text-xs text-nld-muted mt-1">{item.desc}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — Image bien contenue dans sa colonne */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex items-center justify-center relative"
          >
            <div className="relative w-full max-w-[520px] aspect-square mx-auto">
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-[100px] animate-slowPulse" />
              <img
                src="/premium_gpu_hero.png"
                alt="Premium Workstation"
                className="w-full h-full object-contain relative z-10 drop-shadow-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
