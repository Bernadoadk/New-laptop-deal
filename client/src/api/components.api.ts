import api from './axios';
import { ComponentCategory, ComponentOption } from '../types';

export const fetchComponents = async () => {
  const { data } = await api.get<ComponentCategory[]>('/components');
  return data;
};

export const createOption = async (optionData: any) => {
  const { data } = await api.post<ComponentOption>('/components/option', optionData);
  return data;
};

export const updateOption = async (id: number, optionData: any) => {
  const { data } = await api.put<ComponentOption>(`/components/option/${id}`, optionData);
  return data;
};

export const deleteOption = async (id: number) => {
  const { data } = await api.delete(`/components/option/${id}`);
  return data;
};
