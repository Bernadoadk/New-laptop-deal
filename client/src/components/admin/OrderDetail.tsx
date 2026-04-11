import React from 'react';
import { Order } from '../../types';
import { StatusBadge } from './StatusBadge';
import { Phone, MapPin, Calendar, CreditCard, ShoppingBag, Settings } from 'lucide-react';

interface OrderDetailProps {
  order: Order;
}

export const OrderDetail: React.FC<OrderDetailProps> = ({ order }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-BJ', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="space-y-8 py-4">
      {/* Client Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-bg-3 p-5 rounded-xl border border-border">
          <h3 className="text-[10px] font-black uppercase text-accent tracking-[0.2em] mb-4">Informations Client</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <span className="w-8 h-8 rounded-lg bg-bg flex items-center justify-center text-nld-muted"><Phone className="w-4 h-4" /></span>
              <div>
                <p className="text-white font-bold">{order.clientName}</p>
                <p className="text-nld-muted2 text-xs">{order.clientPhone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-8 h-8 rounded-lg bg-bg flex items-center justify-center text-nld-muted"><MapPin className="w-4 h-4" /></span>
              <div>
                <p className="text-white font-bold">{order.zone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-3 p-5 rounded-xl border border-border">
          <h3 className="text-[10px] font-black uppercase text-accent tracking-[0.2em] mb-4">Méta-données Commande</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <span className="w-8 h-8 rounded-lg bg-bg flex items-center justify-center text-nld-muted"><Calendar className="w-4 h-4" /></span>
              <div>
                <p className="text-white font-bold">{new Date(order.createdAt).toLocaleDateString('fr-BJ', { dateStyle: 'long' })}</p>
                <p className="text-nld-muted2 text-xs">Créé à {new Date(order.createdAt).toLocaleTimeString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-8 h-8 rounded-lg bg-bg flex items-center justify-center text-nld-muted"><CreditCard className="w-4 h-4" /></span>
              <StatusBadge status={order.status} />
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-bg-3 rounded-xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-[10px] font-black uppercase text-accent tracking-[0.2em]">Articles Commandés</h3>
          <ShoppingBag className="w-4 h-4 text-nld-muted" />
        </div>
        <table className="w-full">
          <thead className="bg-bg text-left text-[10px] font-black text-nld-muted uppercase">
            <tr>
              <th className="px-6 py-3">Article</th>
              <th className="px-6 py-3 text-center">Quantité</th>
              <th className="px-6 py-3 text-right">Prix</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {order.items.map((item, i) => (
              <tr key={i}>
                <td className="px-6 py-4 text-sm font-bold text-white">{item.name}</td>
                <td className="px-6 py-4 text-sm text-center font-mono">x{item.quantity}</td>
                <td className="px-6 py-4 text-sm text-right font-mono">{formatPrice(item.price)}</td>
              </tr>
            ))}
            {order.type === 'setup' && (
              <tr className="bg-accent/5">
                <td className="px-6 py-4 text-sm font-bold text-accent italic">
                  Configuration PC Custom Build
                </td>
                <td className="px-12 py-4" colSpan={2}>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {/* JSON config rendering could go here */}
                    <span className="text-[8px] border border-accent/30 px-2 py-1 rounded">BUILD_NATIVE_NLD</span>
                  </div>
                </td>
              </tr>
            )}
            <tr className="bg-bg/50">
              <td colSpan={2} className="px-6 py-4 text-sm font-black text-white text-right uppercase tracking-widest">Total Payé</td>
              <td className="px-6 py-4 text-lg font-black text-accent text-right">{formatPrice(order.totalAmount)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {order.notes && (
        <div className="p-4 bg-bg-2 border-l-4 border-accent-yellow rounded flex gap-4">
          <Settings className="w-5 h-5 text-accent-yellow flex-shrink-0" />
          <p className="text-xs text-nld-muted2">{order.notes}</p>
        </div>
      )}
    </div>
  );
};
