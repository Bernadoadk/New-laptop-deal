import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { toast } from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} ajouté au panier !`, {
      style: {
        background: '#12121e',
        color: '#00f0ff',
        border: '1px solid #1e1e32',
      },
    });
  };

  const getBadgeVariant = (badge: string | null) => {
    switch (badge) {
      case 'new': return 'cyan';
      case 'hot': return 'orange';
      case 'top': return 'purple';
      default: return 'gray';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-BJ', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="glass-panel group hover:border-accent/50 transition-all duration-500 overflow-hidden flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-bg-2">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.badge && <Badge variant={getBadgeVariant(product.badge)}>{product.badge}</Badge>}
          {product.isBestseller && <Badge variant="green">Bestseller</Badge>}
        </div>
        <div className="absolute inset-0 bg-bg/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <Button variant="outline" size="sm" className="bg-bg/60">
            <Eye className="w-4 h-4 mr-2" /> DÉTAILS
          </Button>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <span className="text-[10px] font-bold text-accent tracking-widest uppercase mb-1">{product.category}</span>
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-nld-muted2 mb-6 line-clamp-2">{product.description}</p>
        
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-border">
          <span className="text-xl font-black text-white">{formatPrice(product.price)}</span>
          <button 
            onClick={handleAdd}
            className="w-10 h-10 bg-accent/10 border border-accent/30 rounded-lg flex items-center justify-center text-accent hover:bg-accent hover:text-bg transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
