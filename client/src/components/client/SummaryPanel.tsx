import React from 'react';
import { Button } from '../ui/Button';
import { Shield, Settings, Info, ShoppingCart, MessageSquare } from 'lucide-react';

interface SummaryPanelProps {
  total: number;
  selections: any[]; // List of selected option objects
  onOrder: () => void;
}

export const SummaryPanel: React.FC<SummaryPanelProps> = ({ total, selections, onOrder }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-BJ', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="premium-card p-8 border-accent/20">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
        <ShoppingCart className="w-5 h-5 text-accent" />
        <h2 className="text-xl font-bold text-white tracking-tight">VOTRE CONFIGURATION</h2>
      </div>
      
      <div className="space-y-4 mb-10 max-h-[40vh] overflow-y-auto pr-3 scrollbar-hide">
        {selections.map((opt, i) => (
          <div key={i} className="flex justify-between items-start text-sm group">
            <span className="text-nld-muted group-hover:text-white transition-colors flex-grow pr-4">{opt.name}</span>
            <span className="text-white font-mono font-medium whitespace-nowrap">{formatPrice(opt.price)}</span>
          </div>
        ))}
        <div className="flex justify-between items-start text-sm pt-4 border-t border-white/5">
          <span className="text-nld-muted italic">Assemblage & Optimisation Pro</span>
          <span className="text-white font-mono font-medium">{formatPrice(25000)}</span>
        </div>
      </div>

      <div className="bg-white/5 p-6 rounded-2xl mb-10 border border-white/5 shadow-inner">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-bold uppercase text-accent tracking-[0.2em]">Total Final</span>
          <span className="text-3xl font-black text-white tracking-tighter">{formatPrice(total + 25000)}</span>
        </div>
        <p className="text-[10px] text-nld-muted text-right italic opacity-60">Livraison estimée sous 72h-96h</p>
      </div>

      <div className="space-y-4 mb-10">
        <div className="flex items-center gap-3 text-xs text-nld-muted font-medium py-1 px-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
          <Shield className="w-4 h-4 text-emerald-400" />
          Garantie premium 6 mois incluse
        </div>
        <div className="flex items-center gap-3 text-xs text-nld-muted font-medium py-1 px-3 bg-accent/5 rounded-xl border border-accent/10">
          <Settings className="w-4 h-4 text-accent" />
          Windows 11 Pro & Drivers optimisés
        </div>
        <div className="flex items-center gap-3 text-xs text-nld-muted font-medium py-1 px-3 bg-amber-500/5 rounded-xl border border-amber-500/10">
          <Info className="w-4 h-4 text-amber-400" />
          Service Après-Vente Prioritaire
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Button size="lg" className="w-full shadow-premium-glow" onClick={onOrder}>
          VALIDER LA COMMANDE
        </Button>
        <Button variant="outline" className="w-full group">
          <MessageSquare className="w-4 h-4 mr-2 opacity-60 group-hover:opacity-100 transition-opacity" />
          DEMANDER UN DEVIS
        </Button>
      </div>
    </div>
  );
};
