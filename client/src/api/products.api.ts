import api from './axios';
import { Product } from '../types';

export const fetchProducts = async (params?: any) => {
  const { data } = await api.get<Product[]>('/products', { params });
  return data;
};

export const fetchProduct = async (id: number) => {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
};

export const createProduct = async (formData: FormData) => {
  const { data } = await api.post<Product>('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const updateProduct = async (id: number, formData: FormData) => {
  const { data } = await api.put<Product>(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const deleteProduct = async (id: number) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

export const updateStock = async (id: number, stock: string) => {
  const { data } = await api.patch(`/products/${id}/stock`, { stock });
  return data;
};
