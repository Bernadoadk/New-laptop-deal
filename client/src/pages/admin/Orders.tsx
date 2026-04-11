import React, { useState } from 'react';
import { useOrders, useUpdateOrderStatus, useDeleteOrder } from '../../hooks/useOrders';
import { DataTable } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import { OrderDetail } from '../../components/admin/OrderDetail';
import { Button } from '../../components/ui/Button';
import { Search, Eye, Trash2, CheckCircle, Package } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const Orders = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const { data: orders, isLoading } = useOrders({ search, status });
  const updateStatusMutation = useUpdateOrderStatus();
  const deleteOrderMutation = useDeleteOrder();

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      await updateStatusMutation.mutateAsync({ id, status: newStatus });
      toast.success(`Statut mis à jour : ${newStatus}`);
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Supprimer cette commande définitivement ?')) {
      try {
        await deleteOrderMutation.mutateAsync(id);
        toast.success('Commande supprimée');
      } catch (error) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-BJ', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(price);
  };

  const columns = [
    { header: 'Référence', accessor: (o: any) => <span className="font-mono text-accent">{o.reference}</span> },
    { header: 'Client', accessor: 'clientName' },
    { header: 'WhatsApp', accessor: 'clientPhone' },
    { header: 'Type', accessor: (o: any) => <span className="text-[10px] font-bold uppercase py-0.5 px-2 bg-bg rounded border border-border">{o.type}</span> },
    { header: 'Montant', accessor: (o: any) => formatPrice(o.totalAmount) },
    { header: 'Statut', accessor: (o: any) => <StatusBadge status={o.status} /> },
    { header: 'Date', accessor: (o: any) => new Date(o.createdAt).toLocaleDateString() },
    { 
      header: 'Actions', 
      accessor: (o: any) => (
        <div className="flex items-center gap-2">
          <button onClick={() => setSelectedOrder(o)} className="p-2 text-white hover:text-accent transition-colors"><Eye className="w-4 h-4" /></button>
          <div className="flex items-center gap-1 border-l border-border pl-2">
            {o.status === 'pending' && <button onClick={() => handleUpdateStatus(o.id, 'confirmed')} className="p-2 text-white hover:text-accent-green transition-colors" title="Confirmer"><CheckCircle className="w-4 h-4" /></button>}
            {o.status === 'confirmed' && <button onClick={() => handleUpdateStatus(o.id, 'delivered')} className="p-2 text-white hover:text-accent-3 transition-colors" title="Livrer"><Package className="w-4 h-4" /></button>}
          </div>
          <button onClick={() => handleDelete(o.id)} className="p-2 text-white hover:text-accent-red transition-colors"><Trash2 className="w-4 h-4" /></button>
        </div>
      )
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black mb-2 uppercase">Gestion des Commandes</h2>
        <p className="text-nld-muted2 text-sm">Suivi et traitement des flux de vente.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nld-muted" />
          <input 
            type="text" 
            placeholder="Rechercher ref ou client..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-bg-2 border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:border-accent outline-none"
          />
        </div>
        <select 
          className="bg-bg-2 border border-border rounded-lg px-4 py-2 text-sm text-white"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Tous les statuts</option>
          <option value="pending">En Attente</option>
          <option value="confirmed">Confirmé</option>
          <option value="delivered">Livré</option>
          <option value="cancelled">Annulé</option>
        </select>
      </div>

      <DataTable columns={columns} data={orders || []} isLoading={isLoading} />

      {selectedOrder && (
        <Modal 
          isOpen={!!selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
          title={`COMMANDE ${selectedOrder.reference}`}
        >
          <OrderDetail order={selectedOrder} />
          <div className="mt-8 flex justify-end">
            <Button variant="outline" onClick={() => setSelectedOrder(null)}>FERMER</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
