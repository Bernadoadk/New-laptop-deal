import React, { useState } from 'react';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../../hooks/useProducts';
import { DataTable, Column } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { Product } from '../../types';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { ProductForm } from '../../components/admin/ProductForm';
import { Search, Plus, Edit2, Trash2, Star } from 'lucide-react';
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
        toast.success('Produit mis à jour');
      } else {
        await createMutation.mutateAsync(formData);
        toast.success('Produit créé avec succès');
      }
      setIsFormOpen(false);
    } catch (error) {
      toast.error('Une erreur est survenue');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      try {
        await deleteMutation.mutateAsync(id);
        toast.success('Produit supprimé');
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
        <div className="w-12 h-12 rounded bg-bg-2 overflow-hidden">
          <img src={p.image || ''} alt="" className="w-full h-full object-cover" />
        </div>
      )
    },
    { header: 'Nom', accessor: 'name' },
    { header: 'Catégorie', accessor: (p) => <span className="text-[10px] uppercase font-bold text-nld-muted2">{p.category}</span> },
    { header: 'Prix', accessor: (p) => formatPrice(p.price) },
    { header: 'Stock', accessor: (p) => <StatusBadge status={p.stock} /> },
    { 
      header: 'Best-S.', 
      accessor: (p) => p.isBestseller ? <Star className="w-4 h-4 text-accent-yellow fill-accent-yellow" /> : <Star className="w-4 h-4 text-nld-muted" /> 
    },
    { 
      header: 'Actions', 
      accessor: (p) => (
        <div className="flex items-center gap-2">
          <button onClick={() => handleEdit(p)} className="p-2 text-white hover:text-accent transition-colors"><Edit2 className="w-4 h-4" /></button>
          <button onClick={() => handleDelete(p.id)} className="p-2 text-white hover:text-accent-red transition-colors"><Trash2 className="w-4 h-4" /></button>
        </div>
      )
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black mb-2 uppercase">Catalogue Produits</h2>
          <p className="text-nld-muted2 text-sm">Gérez vos stocks et fiches produits.</p>
        </div>
        <Button onClick={handleCreate}><Plus className="w-4 h-4 mr-2" /> AJOUTER UN PRODUIT</Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nld-muted" />
        <input 
          type="text" 
          placeholder="Rechercher un produit..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-bg-2 border border-border rounded-lg pl-10 pr-4 py-3 text-sm focus:border-accent outline-none"
        />
      </div>

      <DataTable columns={columns} data={products || []} isLoading={isLoading} />

      {isFormOpen && (
        <Modal 
          isOpen={isFormOpen} 
          onClose={() => setIsFormOpen(false)} 
          title={editingProduct ? 'MODIFIER LE PRODUIT' : 'NOUVEAU PRODUIT'}
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
