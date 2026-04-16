import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, ShieldCheck, Zap } from 'lucide-react';
import { Product } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useCartStore } from '../../store/cartStore';
import { toast } from 'react-hot-toast';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    addItem(product);
    toast.success(`${product.name} ajouté au panier !`, {
      style: {
        background: '#09090b',
        color: '#f8fafc',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
      },
    });
    onClose();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-BJ', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(price);
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-panel border border-white/10 rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row pointer-events-auto relative"
            >
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-1/2 bg-black relative aspect-square md:aspect-auto">
                <img
                  src={product.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                  <span className="text-xs font-bold text-accent tracking-[0.2em] uppercase">{product.category}</span>
                  <h2 className="text-3xl font-black text-white tracking-tight">{product.name}</h2>
                </div>
              </div>

              {/* Details Section */}
              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.badge && <Badge variant="primary">{product.badge.toUpperCase()}</Badge>}
                  {product.isBestseller && <Badge variant="green">Bestseller</Badge>}
                  <Badge variant={product.stock === 'instock' ? 'green' : product.stock === 'lowstock' ? 'orange' : 'red'}>
                    {product.stock === 'instock' ? 'En Stock' : product.stock === 'lowstock' ? 'Stock Limité' : 'Rupture'}
                  </Badge>
                </div>

                <div className="prose prose-invert prose-sm mb-8">
                  <p className="text-nld-muted leading-relaxed text-base">
                    {product.description || "Aucune description détaillée n'est disponible pour ce composant. Veuillez contacter un expert."}
                  </p>
                </div>

                <div className="flex flex-col gap-4 mb-10">
                  <div className="flex items-center gap-3 text-sm text-nld-muted bg-white/5 p-3 rounded-xl border border-white/5">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>Garantie constructeur intégrale incluse.</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-nld-muted bg-white/5 p-3 rounded-xl border border-white/5">
                    <Zap className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>Testé et certifié par nos ingénieurs experts.</span>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-col w-full sm:w-auto text-center sm:text-left">
                    <span className="text-xs text-nld-muted uppercase tracking-wider font-medium mb-1">Prix TTC</span>
                    <span className="text-3xl font-black text-white">{formatPrice(product.price)}</span>
                  </div>
                  <Button 
                    className="w-full sm:w-auto sm:flex-1 lg:flex-none shadow-premium-glow justify-center whitespace-nowrap"
                    onClick={handleAdd}
                    disabled={product.stock === 'outofstock'}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ajouter au panier
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
