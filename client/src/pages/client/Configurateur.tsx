import React, { useState, useEffect } from 'react';
import { useComponents } from '../../hooks/useComponents';
import { usePresets } from '../../hooks/usePresets';
import { ConfiguratorPanel } from '../../components/client/ConfiguratorPanel';
import { SummaryPanel } from '../../components/client/SummaryPanel';
import { OrderModal } from '../../components/client/OrderModal';
import { Zap, Info, Box } from 'lucide-react';
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
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg">
        <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin mb-6" />
        <div className="text-sm font-bold text-accent tracking-[0.4em] uppercase">Initialisation du Configurateur Elite</div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-bg">
      <div className="container-custom">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Box className="w-5 h-5 text-accent" />
            <span className="text-xs font-bold text-accent tracking-[0.3em] uppercase">Custom Build Expert</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            Configurateur <span className="premium-gradient-text">Elite.</span>
          </h1>
          <p className="text-nld-muted mt-4 text-lg max-w-2xl font-medium">Définissez chaque détail de votre matériel. Nos experts s'occupent du reste.</p>
        </div>

        {/* Presets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {presets?.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset)}
              className="premium-card p-8 group text-left relative"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-3xl transition-transform duration-500 group-hover:scale-110">
                  {preset.emoji}
                </div>
                <Zap className="w-5 h-5 text-accent opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors mb-2">{preset.label}</h3>
              <p className="text-[10px] text-nld-muted uppercase tracking-widest font-semibold">Profil Recommandé</p>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="p-6 bg-accent/5 border border-accent/20 rounded-2xl flex gap-5 items-start backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <p className="text-sm text-nld-muted leading-relaxed font-medium">
                <span className="text-white font-bold block mb-1 uppercase text-xs tracking-wider">Note de l'Expert</span>
                Notre équipe vérifie systématiquement la compatibilité technique de chaque build. En cas de doute (ex: équilibre PSU/GPU), un technicien certifié vous recontactera immédiatement après votre commande.
              </p>
            </div>
            
            <ConfiguratorPanel 
              categories={categories || []} 
              selections={selections} 
              onSelect={handleSelect} 
            />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <SummaryPanel 
                total={total} 
                selections={getSelectedOptions()} 
                onOrder={() => setIsOrderModalOpen(true)}
              />
            </div>
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
