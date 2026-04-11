import React from 'react';
import { Badge } from '../ui/Badge';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'pending':
      return <Badge variant="orange">EN ATTENTE</Badge>;
    case 'confirmed':
      return <Badge variant="cyan">CONFIRMÉ</Badge>;
    case 'delivered':
      return <Badge variant="green">LIVRÉ</Badge>;
    case 'cancelled':
      return <Badge variant="red">ANNULÉ</Badge>;
    case 'instock':
      return <Badge variant="green">EN STOCK</Badge>;
    case 'lowstock':
      return <Badge variant="orange">STOCK FAIBLE</Badge>;
    case 'outofstock':
      return <Badge variant="red">RUPTURE</Badge>;
    default:
      return <Badge variant="gray">{status.toUpperCase()}</Badge>;
  }
};
