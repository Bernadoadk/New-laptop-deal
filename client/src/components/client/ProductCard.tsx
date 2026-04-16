import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { toast } from 'react-hot-toast';
import { ProductModal } from './ProductModal';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} ajouté au panier !`, {
      style: {
        background: '#0f172a',
        color: '#f8fafc',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
      },
    });
  };

  const getBadgeVariant = (badge: string | null) => {
    switch (badge) {
      case 'new': return 'primary';
      case 'hot': return 'orange';
      case 'top': return 'purple';
      default: return 'gray';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-BJ', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="premium-card flex flex-col h-full group">
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-900/50">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.badge && <Badge variant={getBadgeVariant(product.badge)}>{product.badge}</Badge>}
          {product.isBestseller && <Badge variant="green">Bestseller</Badge>}
        </div>
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
          <Button 
            variant="secondary" 
            size="sm" 
            className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
          >
            <Eye className="w-4 h-4 mr-2" /> Aperçu
          </Button>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <span className="text-[10px] font-bold text-accent tracking-[0.2em] uppercase mb-1 block opacity-80">{product.category}</span>
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-accent transition-colors duration-300">{product.name}</h3>
          <p className="text-sm text-nld-muted line-clamp-2 leading-relaxed">{product.description}</p>
        </div>
        
        <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[10px] text-nld-muted uppercase tracking-wider font-medium">À partir de</span>
            <span className="text-2xl font-black text-white tracking-tight">{formatPrice(product.price)}</span>
          </div>
          <button 
            onClick={handleAdd}
            className="w-12 h-12 bg-white/5 hover:bg-accent text-white hover:text-white rounded-2xl flex items-center justify-center transition-all duration-300 group/btn shadow-sm hover:shadow-premium-glow"
          >
            <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
      
      <ProductModal 
        product={product} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};
