import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/components.api';

export const useComponents = () => {
  return useQuery({
    queryKey: ['components'],
    queryFn: api.fetchComponents,
  });
};

export const useCreateOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createOption,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['components'] }),
  });
};

export const useUpdateOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, optionData }: { id: number; optionData: any }) =>
      api.updateOption(id, optionData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['components'] }),
  });
};

export const useDeleteOption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.deleteOption,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['components'] }),
  });
};
