import React, { useState } from 'react';
import { usePresets, useUpdatePreset } from '../../hooks/usePresets';
import { useComponents } from '../../hooks/useComponents';
import { PresetEditor } from '../../components/admin/PresetEditor';
import { Zap, Info } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const Presets = () => {
  const { data: presets, isLoading: loadingPresets } = usePresets();
  const { data: categories, isLoading: loadingCats } = useComponents();
  const updatePresetMutation = useUpdatePreset();

  const [activePreset, setActivePreset] = useState<any>(null);

  const handleSavePreset = async (optionIds: number[]) => {
    if (!activePreset) return;
    try {
      await updatePresetMutation.mutateAsync({ key: activePreset.key, optionIds });
      toast.success(`Preset ${activePreset.label} mis à jour avec succès.`);
      setActivePreset(null);
    } catch (error) {
      toast.error('Erreur lors de la mise à jour.');
    }
  };

  if (loadingPresets || loadingCats) return <div className="p-10 text-accent animate-pulse uppercase font-black text-center tracking-widest">Calcul des configurations...</div>;

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-black mb-2 uppercase">Configurations Presets</h2>
        <p className="text-nld-muted2 text-sm">Définissez les builds recommandés par défaut.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {presets?.map((preset) => (
          <div key={preset.id} className={`glass-panel overflow-hidden border-2 transition-all ${activePreset?.id === preset.id ? 'border-accent shadow-glow' : 'border-border/30'}`}>
            <div className="bg-bg-3 px-6 py-5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-3xl">{preset.emoji}</span>
                <div>
                  <h3 className="font-black text-white uppercase tracking-[0.2em]">{preset.label}</h3>
                  <p className="text-[10px] text-nld-muted uppercase tracking-widest mt-1">Key Identifer: {preset.key}</p>
                </div>
              </div>
              <button 
                onClick={() => setActivePreset(activePreset?.id === preset.id ? null : preset)}
                className={`btn-hex px-8 py-2 text-xs ${activePreset?.id === preset.id ? 'bg-accent-red hover:bg-red-600' : ''}`}
              >
                {activePreset?.id === preset.id ? 'ANNULER' : 'MODIFIER LA CONFIG'}
              </button>
            </div>

            <div className={`transition-all duration-500 overflow-hidden ${activePreset?.id === preset.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-8 bg-bg-2">
                <PresetEditor 
                  preset={preset} 
                  categories={categories || []} 
                  onSave={handleSavePreset}
                  isLoading={updatePresetMutation.isPending}
                />
              </div>
            </div>

            {!activePreset && (
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 opacity-50">
                {preset.items.map((item: any) => (
                  <div key={item.id} className="flex flex-col gap-1">
                    <span className="text-[8px] font-black uppercase text-accent tracking-tighter truncate">{item.option.category.label}</span>
                    <span className="text-[10px] text-white truncate font-medium">{item.option.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-6 bg-accent/5 border border-accent/20 rounded-xl flex gap-4">
        <Info className="w-6 h-6 text-accent flex-shrink-0" />
        <div className="text-sm text-nld-muted2 space-y-2 leading-relaxed">
          <p>Les presets servent de base pour le configurateur client. Lorsqu'un client clique sur un preset, toutes les options correspondantes sont pré-sélectionnées.</p>
          <p className="font-bold text-accent">Attention : assurez-vous que chaque preset possède EXACTEMENT une option pour chaque catégorie active.</p>
        </div>
      </div>
    </div>
  );
};
