import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../../components/client/Hero';
import { Ticker } from '../../components/client/Ticker';
import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from '../../components/client/ProductCard';
import { ChevronRight, Star, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export const Home = () => {
  const { data: products, isLoading } = useProducts({ bestseller: 'true' });

  return (
    <div className="bg-bg min-h-screen">
      <Ticker />
      <Hero />

      {/* Best Sellers Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-lg mb-4">
                <Star className="w-3.5 h-3.5 text-accent-gold fill-accent-gold" />
                <span className="text-[10px] font-bold text-accent tracking-widest uppercase">Sélection Elite</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                Nos <span className="text-accent">best sellers.</span>
              </h2>
              <p className="text-nld-muted mt-4 text-lg max-w-xl">Les configurations les plus performantes, plébiscitées par nos clients les plus exigeants.</p>
            </div>
            <Link to="/catalogue" className="group flex items-center gap-2 text-sm font-bold tracking-widest text-white hover:text-accent transition-all">
              VOIR LE CATALOGUE COMPLET <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading
              ? Array(4).fill(0).map((_, i) => (
                  <div key={i} className="glass-panel h-[450px] animate-pulse bg-white/5" />
                ))
              : products?.slice(0, 4).map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
          </div>
        </div>
      </section>

      {/* Configurator CTA section */}
      <section className="section-padding bg-bg-2/50 relative">
        <div className="container-custom relative z-10">
          <div className="glass-panel overflow-hidden relative">
            <div className="absolute -right-20 -top-20 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
              <div className="p-8 md:p-16 lg:p-24 relative z-10">
                <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-white tracking-tighter">
                  Votre vision, <br />
                  <span className="premium-gradient-text">notre expertise.</span>
                </h2>
                <p className="text-nld-muted text-lg mb-10 leading-relaxed font-medium">
                  Utilisez notre configurateur assisté par IA pour choisir chaque composant. Nos experts certifiés assemblent, testent et optimisent votre machine sous 72h.
                </p>
                <div className="flex flex-col gap-6 mb-12">
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                      <Zap className="w-5 h-5" />
                    </div>
                    <span className="text-white font-semibold">Composants 100% Neufs & Garantie Zen</span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                      < ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="text-white font-semibold">Câblage & Optimisation Pro-Grade</span>
                  </div>
                </div>
                <Link to="/configurateur">
                  <Button size="lg" className="px-10 group shadow-premium-glow">
                    ACCÉDER AU CONFIGURATEUR <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div className="relative h-full min-h-[400px]">
                <img 
                  src="/professional_assembly.png" 
                  className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-1000"
                  alt="Professional Assembly"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-bg-2 via-transparent to-transparent lg:from-bg-2" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
