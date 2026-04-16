import React, { useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import { CartItem } from '../../components/client/CartItem';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, ArrowRight, Trash2, ShieldCheck, Truck } from 'lucide-react';
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
      <div className="pt-48 pb-24 min-h-screen bg-bg">
        <div className="container-custom text-center">
          <div className="glass-panel inline-block p-16 max-w-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-inner">
              <ShoppingBag className="w-10 h-10 text-nld-muted/30" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-6 tracking-tight">Votre panier est vide.</h1>
            <p className="text-nld-muted text-lg mb-12 font-medium leading-relaxed">
              L'excellence matériel commence par une première sélection. <br />Parcourez notre collection et découvrez des configurations d'exception.
            </p>
            <Link to="/catalogue">
              <Button size="lg" className="px-12 shadow-premium-glow">
                EXPLORER LE CATALOGUE <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-24 min-h-screen bg-bg">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-xs font-bold text-accent tracking-[0.3em] uppercase">Checkout Secure</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Votre <span className="premium-gradient-text">sélection.</span></h1>
            <p className="text-nld-muted mt-4 text-lg font-medium">{items.length} article(s) méticuleusement choisis.</p>
          </div>
          <button 
            onClick={clearCart}
            className="flex items-center gap-2 text-nld-muted hover:text-red-400 transition-all text-[10px] font-bold tracking-[0.2em] uppercase py-2 px-4 bg-white/5 rounded-xl border border-white/5 hover:border-red-500/20"
          >
            <Trash2 className="w-3.5 h-3.5" /> VIDER LE PANIER
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-2">
            <div className="divide-y divide-white/5">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            
            <Link to="/catalogue" className="inline-flex items-center gap-2 text-white/50 hover:text-accent mt-12 font-bold transition-all group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> CONTINUER MES ACHATS
            </Link>
          </div>

          <div className="lg:col-span-4">
            <div className="premium-card p-10 sticky top-32">
              <h2 className="text-xl font-bold text-white mb-10 tracking-tight flex items-center gap-3 pb-6 border-b border-white/5">
                RÉCAPITULATIF PRO-FORMA
              </h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center text-nld-muted font-medium">
                  <span className="text-sm">Sous-total</span>
                  <span className="font-mono text-white text-lg">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-nld-muted font-medium">Logistique & Livraison</span>
                  <span className="text-emerald-400 font-bold text-[10px] uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">OFFERT</span>
                </div>
                <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                  <span className="font-black text-white tracking-widest text-xs uppercase opacity-40">TOTAL À RÉGLER</span>
                  <span className="text-4xl font-black text-white tracking-tighter">{formatPrice(subtotal)}</span>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 text-xs text-nld-muted font-medium p-3 bg-white/5 rounded-xl border border-white/5">
                  <Truck className="w-4 h-4 text-accent" />
                  Paiement sécurisé à la livraison
                </div>
                <div className="flex items-center gap-3 text-xs text-nld-muted font-medium p-3 bg-white/5 rounded-xl border border-white/5">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  Inspection initiale garantie
                </div>
              </div>

              <Button size="lg" className="w-full shadow-premium-glow group" onClick={() => setIsOrderModalOpen(true)}>
                COMMANDER CES ARTICLES <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
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
