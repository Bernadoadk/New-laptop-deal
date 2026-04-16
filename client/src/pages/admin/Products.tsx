import React, { useState } from 'react';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../../hooks/useProducts';
import { DataTable, Column } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { Product } from '../../types';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { ProductForm } from '../../components/admin/ProductForm';
import { Search, Plus, Edit2, Trash2, Star, Package } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const Products = () => {
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const { data: products, isLoading } = useProducts({ search });
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      if (editingProduct) {
        await updateMutation.mutateAsync({ id: editingProduct.id, formData });
        toast.success('Référence mise à jour avec succès');
      } else {
        await createMutation.mutateAsync(formData);
        toast.success('Nouvelle référence ajoutée au catalogue');
      }
      setIsFormOpen(false);
    } catch (error) {
      toast.error('Une erreur technique est survenue');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Voulez-vous vraiment retirer cette référence du catalogue ?')) {
      try {
        await deleteMutation.mutateAsync(id);
        toast.success('Référence supprimée');
      } catch (error) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-BJ', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(price);
  };

  const columns: Column<Product>[] = [
    { 
      header: 'Aperçu', 
      accessor: (p) => (
        <div className="w-14 h-14 rounded-2xl bg-white/5 overflow-hidden border border-white/5 group-hover:scale-105 transition-transform duration-500">
          <img src={p.image || ''} alt="" className="w-full h-full object-cover" />
        </div>
      )
    },
    { header: 'Désignation', accessor: (p) => <span className="font-bold text-white tracking-tight">{p.name}</span> },
    { header: 'Catégorie', accessor: (p) => <span className="text-[10px] uppercase font-bold text-nld-muted tracking-widest">{p.category}</span> },
    { header: 'Tarif Unit.', accessor: (p) => <span className="font-mono text-white/90">{formatPrice(p.price)}</span> },
    { header: 'Disponibilité', accessor: (p) => <StatusBadge status={p.stock} /> },
    { 
      header: 'Bestseller', 
      accessor: (p) => p.isBestseller ? <Star className="w-5 h-5 text-accent-gold fill-accent-gold" /> : <Star className="w-5 h-5 text-white/10" /> 
    },
    { 
      header: 'Gestion', 
      accessor: (p) => (
        <div className="flex items-center gap-2">
          <button onClick={() => handleEdit(p)} className="p-3 bg-white/5 hover:bg-white/10 text-white hover:text-accent rounded-xl transition-all"><Edit2 className="w-4 h-4" /></button>
          <button onClick={() => handleDelete(p.id)} className="p-3 bg-white/5 hover:bg-white/10 text-white hover:text-red-400 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
        </div>
      )
    },
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Inventory Management</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight italic">CATALOGUE <span className="premium-gradient-text not-italic uppercase">Hardware.</span></h2>
          <p className="text-nld-muted mt-2 text-lg font-medium">Contrôlez vos références, stocks et positionnement marketing.</p>
        </div>
        <Button onClick={handleCreate} className="shadow-premium-glow">
          <Plus className="w-5 h-5 mr-2" /> AJOUTER UNE RÉFÉRENCE
        </Button>
      </div>

      <div className="relative group max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nld-muted group-focus-within:text-accent transition-colors" />
        <input 
          type="text" 
          placeholder="Filtrer par référence, marque ou catégorie..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm text-white placeholder:text-nld-muted/60 focus:outline-none focus:border-accent/40 focus:bg-white/10 transition-all font-medium"
        />
      </div>

      <div className="premium-card p-1">
        <DataTable columns={columns} data={products || []} isLoading={isLoading} />
      </div>

      {isFormOpen && (
        <Modal 
          isOpen={isFormOpen} 
          onClose={() => setIsFormOpen(false)} 
          title={editingProduct ? 'ÉDITION DE RÉFÉRENCE' : 'NOUVELLE RÉFÉRENCE'}
        >
          <ProductForm 
            initialData={editingProduct} 
            onSubmit={handleSubmit} 
            isLoading={createMutation.isPending || updateMutation.isPending} 
          />
        </Modal>
      )}
    </div>
  );
};
