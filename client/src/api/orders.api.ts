import api from './axios';
import { Order, AdminStats } from '../types';

export const fetchOrders = async (params?: any) => {
  const { data } = await api.get<Order[]>('/orders', { params });
  return data;
};

export const fetchOrder = async (id: number) => {
  const { data } = await api.get<Order>(`/orders/${id}`);
  return data;
};

export const createOrder = async (orderData: any) => {
  const { data } = await api.post<Order>('/orders', orderData);
  return data;
};

export const updateOrderStatus = async (id: number, status: string) => {
  const { data } = await api.patch(`/orders/${id}/status`, { status });
  return data;
};

export const deleteOrder = async (id: number) => {
  const { data } = await api.delete(`/orders/${id}`);
  return data;
};

export const fetchStats = async () => {
  const { data } = await api.get<AdminStats>('/orders/stats');
  return data;
};
