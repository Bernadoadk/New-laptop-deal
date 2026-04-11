import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../../components/client/Hero';
import { Ticker } from '../../components/client/Ticker';
import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from '../../components/client/ProductCard';
import { ChevronRight, Star, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export const Home = () => {
  const { data: products, isLoading } = useProducts({ bestseller: 'true' });

  return (
    <div className="bg-bg min-h-screen">
      <Ticker />
      <Hero />

      {/* Best Sellers Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black mb-4 flex items-center gap-3">
                <Star className="text-accent-yellow fill-accent-yellow" />
                <span className="glow-text">NOS BEST SELLERS</span>
              </h2>
              <p className="text-nld-muted2">Les configurations les plus plébiscitées par la communauté.</p>
            </div>
            <Link to="/catalogue" className="text-accent text-sm font-bold tracking-widest hover:underline flex items-center">
              VOIR TOUT LE CATALOGUE <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading
              ? Array(4).fill(0).map((_, i) => (
                  <div key={i} className="glass-panel h-[400px] animate-pulse bg-bg-2" />
                ))
              : products?.slice(0, 4).map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
          </div>
        </div>
      </section>

      {/* Configurator CTA section */}
      <section className="py-24 bg-bg-2 relative">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="glass-panel p-12 overflow-hidden relative">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-black mb-6 leading-tight">VOTRE SETUP, <br /><span className="text-accent underline decoration-accent-3">VOS RÈGLES.</span></h2>
                <p className="text-nld-muted2 text-lg mb-8">Utilisez notre configurateur 3D pour choisir chaque composant. Nos experts assemblent et optimisent votre machine sous 72h.</p>
                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex items-center gap-3"><Zap className="text-accent w-5 h-5" /> <span>Pièces 100% Neuves & Garanties</span></div>
                  <div className="flex items-center gap-3"><ShieldCheck className="text-accent-green w-5 h-5" /> <span>Câble management professionnel</span></div>
                </div>
                <Link to="/configurateur">
                  <Button size="lg">ACCÉDER AU CONFIGURATEUR</Button>
                </Link>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1593640408182-31c4de9fd4f0?w=800&q=80" 
                  className="rounded-xl shadow-glow border border-border"
                  alt="PC Parts"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
