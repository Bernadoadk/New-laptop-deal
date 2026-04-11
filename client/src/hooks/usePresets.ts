import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/presets.api';

export const usePresets = () => {
  return useQuery({
    queryKey: ['presets'],
    queryFn: api.fetchPresets,
  });
};

export const useUpdatePreset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ key, optionIds }: { key: string; optionIds: number[] }) =>
      api.updatePreset(key, optionIds),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['presets'] }),
  });
};
