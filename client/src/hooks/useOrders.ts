import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/orders.api';

export const useOrders = (params?: any) => {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => api.fetchOrders(params),
  });
};

export const useStats = () => {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: api.fetchStats,
  });
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: api.createOrder,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      api.updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.deleteOrder,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
  });
};
