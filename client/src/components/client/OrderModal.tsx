import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useCreateOrder } from '../../hooks/useOrders';
import { toast } from 'react-hot-toast';

const orderSchema = z.object({
  clientName: z.string().min(2, 'Nom requis'),
  clientPhone: z.string().regex(/^\+229\d{8}$/, 'Format requis: +229XXXXXXXX'),
  zone: z.string().min(3, 'Zone requise'),
  notes: z.string().optional(),
});

type OrderFormData = z.infer<typeof orderSchema>;

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  totalAmount: number;
  type: 'product' | 'setup';
  setupConfig?: any;
  onSuccess?: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  items,
  totalAmount,
  type,
  setupConfig,
  onSuccess,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
  });

  const createOrderMutation = useCreateOrder();

  const onSubmit = async (data: OrderFormData) => {
    try {
      await createOrderMutation.mutateAsync({
        ...data,
        totalAmount,
        type,
        items: items.map(i => ({
          productId: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity || 1
        })),
        setupConfig,
      });
      toast.success('Commande reçue ! Nous vous contacterons sur WhatsApp.');
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error('Erreur lors de la commande.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="FINALISER LA COMMANDE">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Nom Complet"
          placeholder="Jean Dupont"
          {...register('clientName')}
          error={errors.clientName?.message}
        />
        <Input
          label="Numéro WhatsApp (avec +229)"
          placeholder="+22900000000"
          {...register('clientPhone')}
          error={errors.clientPhone?.message}
        />
        <Input
          label="Zone de Livraison"
          placeholder="Cotonou - Fidjrossè"
          {...register('zone')}
          error={errors.zone?.message}
        />
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase text-nld-muted tracking-widest">Notes particulières</label>
          <textarea
            className="w-full bg-bg-2 border border-border px-4 py-2.5 rounded-lg focus:outline-none focus:border-accent transition-colors text-nld-text min-h-[100px]"
            placeholder="Précisez un détail ou une préférence..."
            {...register('notes')}
          />
        </div>

        <div className="bg-bg-3 p-4 rounded-lg border border-border/50">
          <div className="flex justify-between items-center">
            <span className="text-nld-muted2 text-sm">TOTAL À PAYER</span>
            <span className="text-xl font-black text-white">
              {new Intl.NumberFormat('fr-BJ', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(totalAmount)}
            </span>
          </div>
        </div>

        <Button type="submit" className="w-full" isLoading={createOrderMutation.isPending}>
          VALIDER LA COMMANDE
        </Button>
      </form>
    </Modal>
  );
};
