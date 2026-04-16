import React from 'react';
import { useStats, useOrders } from '../../hooks/useOrders';
import { useProducts } from '../../hooks/useProducts';
import { KpiCard } from '../../components/admin/KpiCard';
import { DataTable, Column } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { Order } from '../../types';
import { ShoppingCart, Package, Clock, DollarSign, AlertCircle, TrendingUp } from 'lucide-react';

export const Dashboard = () => {
  const { data: stats, isLoading: loadingStats } = useStats();
  const { data: latestOrders, isLoading: loadingOrders } = useOrders();
  const { data: products } = useProducts();

  const lowStockProducts = products?.filter(p => p.stock !== 'instock') || [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-BJ', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(price);
  };

  const orderColumns: Column<Order>[] = [
    { header: 'Référence', accessor: (o) => <span className="font-mono text-accent font-bold">#{o.reference}</span> },
    { header: 'Client', accessor: 'clientName' },
    { header: 'Montant', accessor: (o) => <span className="font-bold text-white">{formatPrice(o.totalAmount)}</span> },
    { header: 'Statut', accessor: (o) => <StatusBadge status={o.status} /> },
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Performance Platforme</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">VUE D'ENSEMBLE.</h2>
          <p className="text-nld-muted mt-2 text-lg font-medium">Aperçu analytique en temps réel de votre activité commerciale.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <KpiCard label="Volume Commandes" value={stats?.totalOrders || 0} icon={ShoppingCart} variant="primary" />
        <KpiCard label="Flux en Attente" value={stats?.pendingOrders || 0} icon={Clock} variant="orange" />
        <KpiCard label="Inventaire Actif" value={stats?.productCount || 0} icon={Package} variant="purple" />
        <KpiCard label="Chiffre d'Affaires" value={formatPrice(stats?.revenue || 0)} icon={DollarSign} variant="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Transactions Récentes</h3>
          </div>
          <div className="premium-card p-1">
            <DataTable columns={orderColumns} data={latestOrders?.slice(0, 5) || []} isLoading={loadingOrders} />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Santé du Stock</h3>
          <div className="space-y-4">
            {lowStockProducts.length === 0 ? (
              <div className="premium-card p-12 text-center text-xs text-nld-muted uppercase tracking-widest border-dashed border-white/10 opacity-60">
                <Package className="w-8 h-8 mx-auto mb-4 opacity-20" />
                Inventaire Optimal
              </div>
            ) : (
              lowStockProducts.map(p => (
                <div key={p.id} className="premium-card p-5 flex items-center justify-between border-red-500/10 hover:border-red-500/30">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-400">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white mb-0.5">{p.name}</p>
                      <p className="text-[10px] text-nld-muted uppercase font-semibold tracking-wider">{p.category}</p>
                    </div>
                  </div>
                  <StatusBadge status={p.stock} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
