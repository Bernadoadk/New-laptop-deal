import React, { useState } from 'react';
import { usePresets, useUpdatePreset } from '../../hooks/usePresets';
import { useComponents } from '../../hooks/useComponents';
import { PresetEditor } from '../../components/admin/PresetEditor';
import { Zap, Info, Edit3, X, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Button } from '../../components/ui/Button';

export const Presets = () => {
  const { data: presets, isLoading: loadingPresets } = usePresets();
  const { data: categories, isLoading: loadingCats } = useComponents();
  const updatePresetMutation = useUpdatePreset();

  const [activePreset, setActivePreset] = useState<any>(null);

  const handleSavePreset = async (optionIds: number[]) => {
    if (!activePreset) return;
    try {
      await updatePresetMutation.mutateAsync({ key: activePreset.key, optionIds });
      toast.success(`Profil ${activePreset.label} synchronisé.`);
      setActivePreset(null);
    } catch (error) {
      toast.error('Erreur lors de la synchronisation.');
    }
  };

  if (loadingPresets || loadingCats) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin mb-6" />
        <p className="text-[10px] font-bold text-accent tracking-[0.4em] uppercase">Calcul des configurations algorithmiques...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Logic Engine</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight italic uppercase">PROFILS <span className="premium-gradient-text not-italic uppercase">Presets.</span></h2>
          <p className="text-nld-muted mt-2 text-lg font-medium">Définissez les architectures recommandées et les gammes de performance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {presets?.map((preset) => (
          <div 
            key={preset.id} 
            className={`premium-card overflow-hidden transition-all duration-700 ${activePreset?.id === preset.id ? 'ring-2 ring-accent/50 shadow-premium-glow' : 'opacity-80 hover:opacity-100'}`}
          >
            <div className="bg-white/5 px-10 py-8 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-4xl shadow-inner border border-white/5">
                  {preset.emoji}
                </div>
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-wider">{preset.label}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest">ID: {preset.key}</span>
                    <span className="w-1 h-1 bg-white/20 rounded-full" />
                    <span className="text-[10px] font-bold text-nld-muted uppercase tracking-widest">{preset.items.length} COMPOSANTS INCLUS</span>
                  </div>
                </div>
              </div>
              <Button 
                variant={activePreset?.id === preset.id ? 'secondary' : 'primary'}
                onClick={() => setActivePreset(activePreset?.id === preset.id ? null : preset)}
                className="group px-8"
              >
                {activePreset?.id === preset.id ? (
                  <><X className="w-4 h-4 mr-2" /> ANNULER</>
                ) : (
                  <><Edit3 className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" /> MODIFIER L'ARCHITECTURE</>
                )}
              </Button>
            </div>

            <div className={`transition-all duration-700 ease-in-out overflow-hidden ${activePreset?.id === preset.id ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-10 bg-white/[0.02]">
                <PresetEditor 
                  preset={preset} 
                  categories={categories || []} 
                  onSave={handleSavePreset}
                  isLoading={updatePresetMutation.isPending}
                />
              </div>
            </div>

            {!activePreset && (
              <div className="px-10 py-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-6 bg-white/[0.01]">
                {preset.items.map((item: any) => (
                  <div key={item.id} className="flex flex-col gap-1.5 p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[9px] font-black uppercase text-accent tracking-widest leading-none">{item.option.category.label}</span>
                    <span className="text-[11px] text-white/80 font-bold truncate leading-none">{item.option.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-8 bg-accent/5 border border-accent/10 rounded-3xl flex gap-6 items-start max-w-4xl">
        <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0">
          <Info className="w-6 h-6 text-accent" />
        </div>
        <div className="text-sm text-nld-muted leading-relaxed font-medium">
          <p className="text-white font-bold mb-2 text-base italic uppercase tracking-wider">Note d'architecture Système</p>
          <p>Les presets constituent la base structurelle du configurateur. Ils garantissent que chaque client débute avec une configuration cohérente et fonctionnelle.</p>
          <p className="mt-3 py-2 px-4 bg-accent/10 rounded-xl border border-accent/20 inline-block font-bold text-accent">
            Règle critique : Chaque preset doit contenir une référence unique par segment matériel actif.
          </p>
        </div>
      </div>
    </div>
  );
};
