import api from './axios';
import { SetupPreset } from '../types';

export const fetchPresets = async () => {
  const { data } = await api.get<SetupPreset[]>('/presets');
  return data;
};

export const updatePreset = async (key: string, optionIds: number[]) => {
  const { data } = await api.put<SetupPreset>(`/presets/${key}`, { optionIds });
  return data;
};
