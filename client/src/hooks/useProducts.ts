import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/products.api';

export const useProducts = (params?: any) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => api.fetchProducts(params),
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => api.fetchProduct(id),
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      api.updateProduct(id, formData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.deleteProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
};
