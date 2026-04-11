import React, { useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import { CartItem } from '../../components/client/CartItem';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';
import { OrderModal } from '../../components/client/OrderModal';

export const Panier = () => {
  const { items, clearCart } = useCartStore();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-BJ', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-24 min-h-screen">
        <div className="container mx-auto px-6 text-center">
          <div className="glass-panel inline-block p-16 max-w-xl">
            <ShoppingBag className="w-20 h-20 text-accent/20 mx-auto mb-8" />
            <h1 className="text-3xl font-black mb-4">TON PANIER EST VIDE</h1>
            <p className="text-nld-muted2 mb-10">L'aventure commence par un premier choix. Parcours notre catalogue et trouve l'équipement dont tu as besoin.</p>
            <Link to="/catalogue">
              <Button size="lg" className="px-12">VOIR LE CATALOGUE <ArrowRight className="w-5 h-5 ml-2" /></Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-black mb-2 uppercase">VOTRE PANIER</h1>
            <p className="text-nld-muted2">{items.length} article(s) prêt(s) pour la bataille.</p>
          </div>
          <button 
            onClick={clearCart}
            className="flex items-center gap-2 text-nld-muted hover:text-accent-red mt-4 transition-colors text-xs font-bold tracking-widest uppercase"
          >
            <Trash2 className="w-4 h-4" /> VIDER LE PANIER
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            
            <Link to="/catalogue" className="inline-flex items-center gap-2 text-accent mt-8 font-bold hover:underline">
              <ArrowLeft className="w-4 h-4" /> CONTINUER MES ACHATS
            </Link>
          </div>

          <div className="lg:col-span-1">
            <div className="glass-panel p-8 sticky top-24">
              <h2 className="text-xl font-bold mb-8 uppercase tracking-widest">RÉCAPITULATIF</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-nld-muted2">
                  <span>Sous-total</span>
                  <span className="text-white font-mono">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-nld-muted2">
                  <span>Livraison</span>
                  <span className="text-accent-green font-bold text-xs uppercase tracking-widest">GRATUIT</span>
                </div>
                <div className="pt-4 border-t border-border flex justify-between items-center">
                  <span className="font-bold text-white">TOTAL</span>
                  <span className="text-3xl font-black text-accent">{formatPrice(subtotal)}</span>
                </div>
              </div>

              <div className="bg-bg-3 p-4 rounded-lg mb-8 border border-border/50 text-xs text-nld-muted2 leading-relaxed italic">
                Paiement à la livraison après inspection de vos articles.
              </div>

              <Button size="lg" className="w-full" onClick={() => setIsOrderModalOpen(true)}>
                COMMANDER MAINTENANT
              </Button>
            </div>
          </div>
        </div>
      </div>

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        items={items}
        totalAmount={subtotal}
        type="product"
        onSuccess={clearCart}
      />
    </div>
  );
};
