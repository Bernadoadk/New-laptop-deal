import React, { useState } from 'react';
import { useComponents, useCreateOption, useUpdateOption, useDeleteOption } from '../../hooks/useComponents';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Plus, Trash2, Edit2, Layers } from 'lucide-react';
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
      toast.success('Option ajoutée');
    } catch (error) {
      toast.error('Erreur lors de l\'ajout');
    }
  };

  const handleDeleteOption = async (id: number) => {
    if (window.confirm('Supprimer cette option ?')) {
      try {
        await deleteOptionMutation.mutateAsync(id);
        toast.success('Option supprimée');
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Erreur lors de la suppression');
      }
    }
  };

  if (isLoading) return <div className="p-10 text-accent animate-pulse uppercase font-black text-center tracking-widest">Initialisation des composants...</div>;

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-black mb-2 uppercase">Composants Configurateur</h2>
        <p className="text-nld-muted2 text-sm">Gérez les pièces détachées du build-builder.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {categories?.map((cat) => (
          <div key={cat.id} className="glass-panel overflow-hidden border-accent/10">
            <div className="bg-bg-3 px-6 py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">{cat.emoji}</span>
                <h3 className="font-bold text-white uppercase tracking-widest text-sm">{cat.label}</h3>
              </div>
              <span className="text-[10px] font-mono text-nld-muted">{cat.options.length} OPTIONS</span>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                {cat.options.map((opt) => (
                  <div key={opt.id} className="flex items-center justify-between group p-3 hover:bg-bg-2 rounded-lg transition-colors border border-transparent hover:border-border">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white">{opt.name}</span>
                      <span className="text-xs font-mono text-accent">+{new Intl.NumberFormat('fr-BJ').format(opt.price)} F</span>
                    </div>
                    <button 
                      onClick={() => handleDeleteOption(opt.id)}
                      className="p-2 text-nld-muted2 hover:text-accent-red opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Option Form */}
              <div className="pt-6 border-t border-border/50">
                <p className="text-[10px] font-black uppercase text-nld-muted mb-4 tracking-widest">Nouvelle Option {cat.label}</p>
                <div className="flex gap-3">
                  <div className="flex-grow">
                    <Input 
                      placeholder="Nom (ex: RTX 5090)" 
                      value={newOption.categoryId === cat.id ? newOption.name : ''} 
                      onChange={(e) => setNewOption({ categoryId: cat.id, name: e.target.value, price: newOption.categoryId === cat.id ? newOption.price : '' })}
                    />
                  </div>
                  <div className="w-32">
                    <Input 
                      placeholder="Prix" 
                      type="number" 
                      value={newOption.categoryId === cat.id ? newOption.price : ''} 
                      onChange={(e) => setNewOption({ categoryId: cat.id, name: newOption.categoryId === cat.id ? newOption.name : '', price: e.target.value })}
                    />
                  </div>
                  <button 
                    disabled={!newOption.name || !newOption.price || newOption.categoryId !== cat.id}
                    onClick={() => handleCreateOption(cat.id)}
                    className="w-12 h-12 bg-accent/10 border border-accent/30 rounded-lg flex items-center justify-center text-accent hover:bg-accent hover:text-bg disabled:opacity-20 transition-all"
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
