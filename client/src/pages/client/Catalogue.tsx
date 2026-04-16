import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from '../../components/client/ProductCard';
import { Search, Filter, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const Catalogue = () => {
  const [category, setCategory] = useState<string>('');
  const [search, setSearch] = useState('');
  
  const { data: products, isLoading } = useProducts({ 
    category: category || undefined,
    search: search || undefined
  });

  const categories = ['Setup Gaming', 'Laptop', 'Périphériques', 'Réparation', 'Accessoires'];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container-custom">
        <div className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                Collection <span className="premium-gradient-text">hardware.</span>
              </h1>
              <p className="text-nld-muted mt-4 text-lg max-w-2xl font-medium">L'équipement de pointe sélectionné par nos experts pour les professionnels et passionnés.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/5 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span className="text-xs font-bold text-emerald-400 tracking-wider">STOCK ACTUALISÉ</span>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col gap-6 mb-16">
          {/* Search Bar */}
          <div className="relative group w-full lg:max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-nld-muted w-5 h-5 group-focus-within:text-white transition-colors" />
            <input 
              type="text" 
              placeholder="Rechercher une référence, une marque..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 rounded-xl pl-12 pr-6 py-4 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all text-white placeholder:text-nld-muted font-medium shadow-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => setCategory('')}
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all border ${!category ? 'bg-white text-black border-transparent shadow-md' : 'bg-transparent border-white/10 text-nld-muted hover:bg-white/5 hover:text-white'}`}
            >
              Tous les produits
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-3 rounded-xl font-medium text-sm transition-all border ${category === cat ? 'bg-white text-black border-transparent shadow-md' : 'bg-transparent border-white/10 text-nld-muted hover:bg-white/5 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
          <div className="flex items-center gap-3 text-sm font-medium text-nld-muted">
            <SlidersHorizontal className="w-4 h-4 text-accent" />
            <span>{isLoading ? 'Synchronisation...' : `${products?.length || 0} configurations disponibles`}</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {isLoading ? (
            Array(8).fill(0).map((_, i) => (
              <div key={i} className="glass-panel h-[500px] animate-pulse bg-white/5" />
            ))
          ) : (
            products?.map((product, i) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

        {!isLoading && products?.length === 0 && (
          <div className="py-32 flex justify-center">
            <div className="glass-panel p-16 max-w-xl text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Filter className="w-10 h-10 text-white/20" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Aucun résultat</h3>
              <p className="text-nld-muted mb-10 text-lg">Nous n'avons trouvé aucun matériel correspondant à votre recherche. Nos experts peuvent peut-être vous aider à trouver une alternative.</p>
              <Button 
                variant="secondary"
                onClick={() => { setCategory(''); setSearch(''); }}
                className="group"
              >
                <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                RÉINITIALISER LES FILTRES
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
