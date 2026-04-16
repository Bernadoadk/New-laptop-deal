import React, { useState } from 'react';
import { useComponents, useCreateOption, useUpdateOption, useDeleteOption } from '../../hooks/useComponents';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Plus, Trash2, Edit2, Layers, Settings, Boxes } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const Components = () => {
  const { data: categories, isLoading } = useComponents();
  const createOptionMutation = useCreateOption();
  const updateOptionMutation = useUpdateOption();
  const deleteOptionMutation = useDeleteOption();

  const [newOption, setNewOption] = useState<{ categoryId: number | null, name: string, price: string }>({ categoryId: null, name: '', price: '' });

  const handleCreateOption = async (categoryId: number) => {
    if (!newOption.name || !newOption.price) return;
    try {
      await createOptionMutation.mutateAsync({ categoryId, name: newOption.name, price: newOption.price });
      setNewOption({ categoryId: null, name: '', price: '' });
      toast.success('Nouvelle option de configuration ajoutée');
    } catch (error) {
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const handleDeleteOption = async (id: number) => {
    if (window.confirm('Voulez-vous vraiment retirer ce composant du configurateur ?')) {
      try {
        await deleteOptionMutation.mutateAsync(id);
        toast.success('Option retirée du système');
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Erreur lors de la suppression');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin mb-6" />
        <div className="text-[10px] font-bold text-accent tracking-[0.4em] uppercase">Initialisation des ressources...</div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Settings className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Configuration Engine</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">MATRICE <span className="premium-gradient-text not-italic uppercase">Composants.</span></h2>
          <p className="text-nld-muted mt-2 text-lg font-medium">Gérez les pièces détachées et les options disponibles dans le configurateur Elite.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {categories?.map((cat) => (
          <div key={cat.id} className="premium-card overflow-hidden group">
            <div className="bg-white/5 px-8 py-5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl shadow-inner border border-white/5">
                  {cat.emoji}
                </div>
                <div>
                  <h3 className="font-bold text-white uppercase tracking-wider text-sm">{cat.label}</h3>
                  <p className="text-[10px] font-bold text-nld-muted/60 uppercase tracking-widest leading-none mt-1">Séquence 0{cat.id}</p>
                </div>
              </div>
              <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/5">
                <span className="text-[10px] font-bold text-nld-muted uppercase tracking-widest">{cat.options.length} RÉFÉRENCES</span>
              </div>
            </div>
            
            <div className="p-8">
              <div className="space-y-3 mb-10 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                {cat.options.map((opt) => (
                  <div key={opt.id} className="flex items-center justify-between group/item p-4 bg-white/2 hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white mb-0.5">{opt.name}</span>
                      <span className="text-[10px] font-mono font-bold text-accent">+{new Intl.NumberFormat('fr-BJ').format(opt.price)} F</span>
                    </div>
                    <button 
                      onClick={() => handleDeleteOption(opt.id)}
                      className="p-3 bg-red-500/5 hover:bg-red-500 hover:text-white text-red-400 rounded-xl opacity-0 group-hover/item:opacity-100 transition-all shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Option Form */}
              <div className="pt-8 border-t border-white/5">
                <div className="flex items-center gap-2 mb-6">
                  <Plus className="w-3.5 h-3.5 text-accent" />
                  <p className="text-[10px] font-bold uppercase text-nld-muted tracking-widest opacity-60 transition-all group-focus-within:opacity-100 group-focus-within:text-white">Ajouter une référence au segment {cat.label}</p>
                </div>
                <div className="flex gap-4 items-end">
                  <div className="flex-grow">
                    <Input 
                      placeholder="Modèle / Version" 
                      className="rounded-2xl bg-white/5 border-white/5 focus:border-accent/40"
                      value={newOption.categoryId === cat.id ? newOption.name : ''} 
                      onChange={(e) => setNewOption({ categoryId: cat.id, name: e.target.value, price: newOption.categoryId === cat.id ? newOption.price : '' })}
                    />
                  </div>
                  <div className="w-40">
                    <Input 
                      placeholder="Prix additif" 
                      type="number" 
                      className="rounded-2xl bg-white/5 border-white/5 focus:border-accent/40"
                      value={newOption.categoryId === cat.id ? newOption.price : ''} 
                      onChange={(e) => setNewOption({ categoryId: cat.id, name: newOption.categoryId === cat.id ? newOption.name : '', price: e.target.value })}
                    />
                  </div>
                  <button 
                    disabled={!newOption.name || !newOption.price || newOption.categoryId !== cat.id}
                    onClick={() => handleCreateOption(cat.id)}
                    className="w-14 h-14 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center text-accent hover:bg-accent hover:text-white disabled:opacity-30 disabled:grayscale transition-all shadow-lg"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
