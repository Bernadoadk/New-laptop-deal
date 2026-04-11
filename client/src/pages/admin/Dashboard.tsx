import React from 'react';
import { useStats, useOrders } from '../../hooks/useOrders';
import { useProducts } from '../../hooks/useProducts';
import { KpiCard } from '../../components/admin/KpiCard';
import { DataTable } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { ShoppingCart, Package, Clock, DollarSign, AlertCircle } from 'lucide-react';

export const Dashboard = () => {
  const { data: stats, isLoading: loadingStats } = useStats();
  const { data: latestOrders, isLoading: loadingOrders } = useOrders();
  const { data: products } = useProducts();

  const lowStockProducts = products?.filter(p => p.stock !== 'instock') || [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-BJ', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(price);
  };

  const orderColumns = [
    { header: 'Réf', accessor: (o: any) => <span className="font-mono text-accent">{o.reference}</span> },
    { header: 'Client', accessor: 'clientName' },
    { header: 'Montant', accessor: (o: any) => formatPrice(o.totalAmount) },
    { header: 'Statut', accessor: (o: any) => <StatusBadge status={o.status} /> },
  ];

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black mb-2 uppercase">Vue d'ensemble</h2>
          <p className="text-nld-muted2 text-sm">Aperçu en temps réel des performances de la plateforme.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard label="Commandes Totales" value={stats?.totalOrders || 0} icon={ShoppingCart} variant="cyan" />
        <KpiCard label="En Attente" value={stats?.pendingOrders || 0} icon={Clock} variant="orange" />
        <KpiCard label="Articles Actifs" value={stats?.productCount || 0} icon={Package} variant="purple" />
        <KpiCard label="Chiffre d'Affaire" value={formatPrice(stats?.revenue || 0)} icon={DollarSign} variant="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-nld-muted">Dernières Commandes</h3>
          </div>
          <DataTable columns={orderColumns} data={latestOrders?.slice(0, 5) || []} isLoading={loadingOrders} />
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-nld-muted">Alertes Stock</h3>
          <div className="space-y-3">
            {lowStockProducts.length === 0 ? (
              <div className="p-10 glass-panel text-center text-xs text-nld-muted uppercase tracking-widest border-dashed">
                Aucune alerte
              </div>
            ) : (
              lowStockProducts.map(p => (
                <div key={p.id} className="glass-panel p-4 flex items-center justify-between border-accent-red/20">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-4 h-4 text-accent-red" />
                    <div>
                      <p className="text-xs font-bold text-white">{p.name}</p>
                      <p className="text-[10px] text-nld-muted2 uppercase">{p.category}</p>
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
