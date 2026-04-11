import React, { useState, useEffect } from 'react';
import { useComponents } from '../../hooks/useComponents';
import { usePresets } from '../../hooks/usePresets';
import { ConfiguratorPanel } from '../../components/client/ConfiguratorPanel';
import { SummaryPanel } from '../../components/client/SummaryPanel';
import { OrderModal } from '../../components/client/OrderModal';
import { Zap, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export const Configurateur = () => {
  const { data: categories, isLoading: loadingCats } = useComponents();
  const { data: presets, isLoading: loadingPresets } = usePresets();
  
  const [selections, setSelections] = useState<Record<string, number>>({});
  const [total, setTotal] = useState(0);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Initialize with entry preset if available
  useEffect(() => {
    if (presets && presets.length > 0 && Object.keys(selections).length === 0) {
      applyPreset(presets[0]);
    }
  }, [presets]);

  // Calculate total whenever selections change
  useEffect(() => {
    if (!categories) return;
    
    let newTotal = 0;
    Object.entries(selections).forEach(([catKey, optId]) => {
      const cat = categories.find(c => c.key === catKey);
      const opt = cat?.options.find(o => o.id === optId);
      if (opt) newTotal += opt.price;
    });
    setTotal(newTotal);
  }, [selections, categories]);

  const applyPreset = (preset: any) => {
    const newSelections: Record<string, number> = {};
    preset.items.forEach((item: any) => {
      newSelections[item.option.category.key] = item.option.id;
    });
    setSelections(newSelections);
  };

  const handleSelect = (categoryKey: string, optionId: number) => {
    setSelections(prev => ({ ...prev, [categoryKey]: optionId }));
  };

  const getSelectedOptions = () => {
    if (!categories) return [];
    return Object.entries(selections).map(([catKey, optId]) => {
      const cat = categories.find(c => c.key === catKey);
      return cat?.options.find(o => o.id === optId);
    }).filter(Boolean);
  };

  if (loadingCats || loadingPresets) {
    return <div className="pt-40 text-center animate-pulse text-accent uppercase font-black tracking-[0.5em]">Chargement du configurateur...</div>;
  }

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-4">SETUP <span className="text-accent">BUILDER</span></h1>
          <p className="text-nld-muted2">Personnalisez chaque composant de votre future machine.</p>
        </div>

        {/* Presets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {presets?.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset)}
              className="glass-panel p-6 text-left group hover:border-accent transition-all relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{preset.emoji}</span>
                <Zap className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-black text-white group-hover:text-accent transition-colors">{preset.label}</h3>
              <p className="text-[10px] text-nld-muted mt-1 uppercase tracking-widest">Build recommandé</p>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg flex gap-4">
              <Info className="w-6 h-6 text-accent flex-shrink-0" />
              <p className="text-xs text-nld-muted2 leading-relaxed">
                Notre équipe vérifie systématiquement la compatibilité de vos composants. Si un souci technique est détecté (ex: alimentation insuffisante), nous vous contacterons avant l'assemblage.
              </p>
            </div>
            
            <ConfiguratorPanel 
              categories={categories || []} 
              selections={selections} 
              onSelect={handleSelect} 
            />
          </div>

          <div className="lg:col-span-1">
            <SummaryPanel 
              total={total} 
              selections={getSelectedOptions()} 
              onOrder={() => setIsOrderModalOpen(true)}
            />
          </div>
        </div>
      </div>

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        items={[]} // Main order is for "Custom Setup"
        totalAmount={total + 25000}
        type="setup"
        setupConfig={selections}
        onSuccess={() => {}}
      />
    </div>
  );
};
