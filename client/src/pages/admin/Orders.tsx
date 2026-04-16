import React, { useState } from 'react';
import { useOrders, useUpdateOrderStatus, useDeleteOrder } from '../../hooks/useOrders';
import { DataTable, Column } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { Order } from '../../types';
import { Modal } from '../../components/ui/Modal';
import { OrderDetail } from '../../components/admin/OrderDetail';
import { Button } from '../../components/ui/Button';
import { Search, Eye, Trash2, CheckCircle, Package, Filter, Calendar, ShoppingCart } from 'lucide-react';
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
      toast.success(`Statut mis à jour : ${newStatus.toUpperCase()}`);
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Voulez-vous vraiment annuler et supprimer cette commande ?')) {
      try {
        await deleteOrderMutation.mutateAsync(id);
        toast.success('Dossier supprimé');
      } catch (error) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-BJ', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(price);
  };

  const columns: Column<Order>[] = [
    { header: 'Référence', accessor: (o) => <span className="font-mono text-accent font-bold">#{o.reference}</span> },
    { header: 'Client', accessor: (o) => <span className="font-bold text-white">{o.clientName}</span> },
    { header: 'Contact', accessor: (o) => <span className="text-nld-muted text-xs font-medium">{o.clientPhone}</span> },
    { 
      header: 'Type', 
      accessor: (o) => (
        <span className={`text-[9px] font-black uppercase py-1 px-3 rounded-lg border ${o.type === 'setup' ? 'bg-amber-500/5 text-amber-400 border-amber-500/10' : 'bg-accent/5 text-accent border-accent/10'}`}>
          {o.type}
        </span>
      ) 
    },
    { header: 'Chiffre d\'Aff.', accessor: (o) => <span className="font-mono font-bold text-white/90">{formatPrice(o.totalAmount)}</span> },
    { header: 'Progression', accessor: (o) => <StatusBadge status={o.status} /> },
    { 
      header: 'Enregistré le', 
      accessor: (o) => (
        <div className="flex items-center gap-2 text-nld-muted text-xs font-medium">
          <Calendar className="w-3 h-3 opacity-40" />
          {new Date(o.createdAt).toLocaleDateString('fr-FR')}
        </div>
      ) 
    },
    { 
      header: 'Gestion', 
      accessor: (o) => (
        <div className="flex items-center gap-2">
          <button onClick={() => setSelectedOrder(o)} className="p-2.5 bg-white/5 hover:bg-white/10 text-white hover:text-accent rounded-xl transition-all" title="Détails"><Eye className="w-4 h-4" /></button>
          <div className="flex items-center gap-2 border-l border-white/5 pl-2">
            {o.status === 'pending' && <button onClick={() => handleUpdateStatus(o.id, 'confirmed')} className="p-2.5 bg-emerald-500/5 hover:bg-emerald-500/20 text-emerald-400 rounded-xl transition-all" title="Confirmer"><CheckCircle className="w-4 h-4" /></button>}
            {o.status === 'confirmed' && <button onClick={() => handleUpdateStatus(o.id, 'delivered')} className="p-2.5 bg-accent/5 hover:bg-accent/20 text-accent rounded-xl transition-all" title="Expédier"><Package className="w-4 h-4" /></button>}
          </div>
          <button onClick={() => handleDelete(o.id)} className="p-2.5 bg-white/5 hover:bg-white/10 text-white hover:text-red-400 rounded-xl transition-all" title="Supprimer"><Trash2 className="w-4 h-4" /></button>
        </div>
      )
    },
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ShoppingCart className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Order Management</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">COMMANDES CLIENTS.</h2>
          <p className="text-nld-muted mt-2 text-lg font-medium">Traitez les commandes et gérez les interactions clients.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="relative flex-grow group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nld-muted group-focus-within:text-accent transition-colors" />
          <input 
            type="text" 
            placeholder="Rechercher par référence, nom de client ou téléphone..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm text-white placeholder:text-nld-muted/60 focus:outline-none focus:border-accent/40 focus:bg-white/10 transition-all font-medium"
          />
        </div>
        <div className="relative group">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-nld-muted" />
          <select 
            className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-10 py-4 text-sm text-white font-bold outline-none appearance-none hover:bg-white/10 focus:border-accent/40 transition-all min-w-[200px]"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Tous les flux</option>
            <option value="pending">En Attente</option>
            <option value="confirmed">Confirmé</option>
            <option value="delivered">Expédié</option>
            <option value="cancelled">Annulé</option>
          </select>
        </div>
      </div>

      <div className="premium-card p-1">
        <DataTable columns={columns} data={orders || []} isLoading={isLoading} />
      </div>

      {selectedOrder && (
        <Modal 
          isOpen={!!selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
          title={`DOSSIER #${selectedOrder.reference}`}
        >
          <OrderDetail order={selectedOrder} />
          <div className="mt-10 flex justify-end">
            <Button variant="secondary" onClick={() => setSelectedOrder(null)} className="px-10">FERMER</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
