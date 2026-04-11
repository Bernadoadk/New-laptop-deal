import React from 'react';
import { Button } from '../ui/Button';
import { Shield, Settings, Info } from 'lucide-react';

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
    <div className="glass-panel p-6 sticky top-24 border-accent/20">
      <h2 className="text-xl font-bold mb-6 border-b border-border pb-4">RÉSUMÉ DU BUILD</h2>
      
      <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2">
        {selections.map((opt, i) => (
          <div key={i} className="flex justify-between items-start text-sm">
            <span className="text-nld-muted2 flex-grow pr-4">{opt.name}</span>
            <span className="text-white font-mono whitespace-nowrap">{formatPrice(opt.price)}</span>
          </div>
        ))}
        <div className="flex justify-between items-start text-sm pt-2 border-t border-border/50">
          <span className="text-nld-muted2">Assemblage & Optimisation</span>
          <span className="text-white font-mono">{formatPrice(25000)}</span>
        </div>
      </div>

      <div className="bg-bg-2 p-4 rounded-lg mb-8 border border-border">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-bold uppercase text-accent">Total Estimé</span>
          <span className="text-2xl font-black text-white">{formatPrice(total + 25000)}</span>
        </div>
        <p className="text-[10px] text-nld-muted text-right italic">TVA incluse. Prix de base indicatif.</p>
      </div>

      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 text-xs text-nld-muted2">
          <Shield className="w-4 h-4 text-accent-green" />
          Garantie matérielle 6 mois incluse
        </div>
        <div className="flex items-center gap-2 text-xs text-nld-muted2">
          <Settings className="w-4 h-4 text-accent" />
          Windows 11 Pro pré-installé
        </div>
        <div className="flex items-center gap-2 text-xs text-nld-muted2">
          <Info className="w-4 h-4 text-accent-yellow" />
          Délai de montage : 2-3 jours
        </div>
      </div>

      <div className="space-y-4">
        <Button size="lg" className="w-full" onClick={onOrder}>COMMANDER CE SETUP</Button>
        <Button variant="outline" className="w-full">NÉGOCIER LE PRIX</Button>
      </div>
    </div>
  );
};
