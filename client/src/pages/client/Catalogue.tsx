import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from '../../components/client/ProductCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
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
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-4">CATALOGUE <span className="text-accent underline decoration-accent/30 decoration-4 underline-offset-8">HARDWARE</span></h1>
          <p className="text-nld-muted2">L'équipement de pointe sélectionné par nos experts.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-nld-muted w-5 h-5" />
            <input 
              type="text" 
              placeholder="Rechercher un produit, une marque..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-bg-2 border border-border rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setCategory('')}
              className={`px-6 py-4 rounded-xl font-bold text-xs tracking-widest uppercase transition-all ${!category ? 'bg-accent text-bg shadow-glow' : 'glass-panel hover:bg-border'}`}
            >
              TOUS
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-4 rounded-xl font-bold text-xs tracking-widest uppercase transition-all ${category === cat ? 'bg-accent text-bg shadow-glow' : 'glass-panel hover:bg-border'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
          <div className="flex items-center gap-2 text-sm text-nld-muted2">
            <SlidersHorizontal className="w-4 h-4 text-accent" />
            <span>{isLoading ? 'Récupération...' : `${products?.length || 0} résultats trouvés`}</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            Array(8).fill(0).map((_, i) => (
              <div key={i} className="glass-panel h-[400px] animate-pulse bg-bg-2" />
            ))
          ) : (
            products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

        {!isLoading && products?.length === 0 && (
          <div className="py-24 text-center">
            <div className="glass-panel inline-block p-12 max-w-md">
              <Filter className="w-12 h-12 text-accent mx-auto mb-6 opacity-30" />
              <p className="text-xl font-bold mb-2">Aucun matériel trouvé</p>
              <p className="text-nld-muted2 mb-8">Essayez de modifier vos filtres ou contactez-nous pour une commande spéciale.</p>
              <Button onClick={() => { setCategory(''); setSearch(''); }}>RÉINITIALISER LES FILTRES</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
