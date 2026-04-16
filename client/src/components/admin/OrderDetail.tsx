import React from 'react';
import { Order } from '../../types';
import { StatusBadge } from './StatusBadge';
import { Phone, MapPin, Calendar, CreditCard, ShoppingBag, Settings, Hash, User, Clock } from 'lucide-react';

interface OrderDetailProps {
  order: Order;
}

export const OrderDetail: React.FC<OrderDetailProps> = ({ order }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-BJ', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="space-y-10 py-2">
      {/* Information Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-inter">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/5 shadow-inner">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-4 h-4 text-accent" />
            <h3 className="text-[10px] font-bold uppercase text-nld-muted tracking-[0.3em]">Profil Client</h3>
          </div>
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-lg">{order.clientName.charAt(0)}</span>
              </div>
              <div className="pt-1">
                <p className="text-white font-bold text-lg leading-none mb-1.5">{order.clientName}</p>
                <div className="flex items-center gap-2 text-nld-muted">
                  <Phone className="w-3.5 h-3.5" />
                  <span className="text-sm font-medium">{order.clientPhone}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/2 p-4 rounded-xl border border-white/5">
              <MapPin className="w-4 h-4 text-accent opacity-50" />
              <p className="text-sm font-bold text-white/90">{order.zone}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 p-8 rounded-2xl border border-white/5 shadow-inner">
          <div className="flex items-center gap-3 mb-6">
            <Hash className="w-4 h-4 text-accent" />
            <h3 className="text-[10px] font-bold uppercase text-nld-muted tracking-[0.3em]">Détails du Dossier</h3>
          </div>
          <div className="space-y-5">
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-nld-muted">
                <Calendar className="w-5 h-5 opacity-60" />
              </div>
              <div>
                <p className="text-white font-bold">{new Date(order.createdAt).toLocaleDateString('fr-FR', { dateStyle: 'long' })}</p>
                <div className="flex items-center gap-2 text-nld-muted text-xs mt-0.5">
                  <Clock className="w-3 h-3" />
                  <span>Enregistré à {new Date(order.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between bg-white/2 p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-4 text-nld-muted text-sm font-medium">
                <CreditCard className="w-4 h-4 opacity-50" />
                Statut Actuel
              </div>
              <StatusBadge status={order.status} />
            </div>
          </div>
        </div>
      </div>

      {/* Items Matrix Section */}
      <div className="overflow-hidden bg-white/5 rounded-2xl border border-white/5">
        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-4 h-4 text-accent" />
            <h3 className="text-[10px] font-bold uppercase text-white tracking-[0.2em]">MATRICE DE COMMANDE</h3>
          </div>
          <span className="text-[9px] font-mono text-nld-muted/40 uppercase tracking-widest">{order.items.length} Article(s)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/2 text-[10px] font-bold text-nld-muted/60 uppercase tracking-widest border-b border-white/5">
                <th className="px-8 py-4">DESIGNATION</th>
                <th className="px-8 py-4 text-center">QTÉ</th>
                <th className="px-8 py-4 text-right">MONTANT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {order.items.map((item, i) => (
                <tr key={i} className="hover:bg-white/[0.01] transition-colors">
                  <td className="px-8 py-5 text-sm font-bold text-white tracking-tight">{item.name}</td>
                  <td className="px-8 py-5 text-sm text-center">
                    <span className="px-3 py-1 bg-white/5 rounded-lg text-nld-muted font-mono font-bold text-xs">x{item.quantity}</span>
                  </td>
                  <td className="px-8 py-5 text-sm text-right font-mono font-bold text-white/90">{formatPrice(item.price)}</td>
                </tr>
              ))}
              {order.type === 'setup' && (
                <tr className="bg-accent/5">
                  <td colSpan={3} className="px-8 py-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Settings className="w-4 h-4 text-accent" />
                        <span className="text-sm font-black text-accent italic uppercase tracking-tight">Configuration Custom Build</span>
                      </div>
                      <span className="text-[9px] font-black bg-accent/10 text-accent border border-accent/20 px-3 py-1.5 rounded-xl uppercase tracking-widest">NLD_H_DYNAMICS</span>
                    </div>
                  </td>
                </tr>
              )}
              <tr className="bg-white/5">
                <td colSpan={2} className="px-8 py-8 text-[11px] font-black text-white/40 text-right uppercase tracking-[0.3em] italic">Valeur Totale Dossier</td>
                <td className="px-8 py-8 text-3xl font-black text-white text-right italic tracking-tighter">{formatPrice(order.totalAmount)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {order.notes && (
        <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex gap-4">
          <Settings className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] font-bold uppercase text-amber-400 tracking-widest mb-1.5 opacity-60 italic">Note Technique / Client</p>
            <p className="text-sm text-nld-muted leading-relaxed font-medium">{order.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
};
