import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

interface CartItemProps {
  item: any;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeItem, updateQuantity } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-BJ', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 glass-panel p-4 mb-4">
      <div className="w-24 h-24 rounded-lg overflow-hidden bg-bg-2 flex-shrink-0">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-grow text-center md:text-left">
        <h3 className="font-bold text-white text-lg">{item.name}</h3>
        <p className="text-accent text-sm font-bold uppercase tracking-widest">{item.category}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center border border-border rounded-lg bg-bg">
          <button 
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-2 hover:text-accent transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-10 text-center font-bold text-white">{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-2 hover:text-accent transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="w-32 text-right">
          <p className="font-black text-white">{formatPrice(item.price * item.quantity)}</p>
          <p className="text-[10px] text-nld-muted">{formatPrice(item.price)} / unité</p>
        </div>

        <button 
          onClick={() => removeItem(item.id)}
          className="p-2 text-nld-muted2 hover:text-accent-red transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
