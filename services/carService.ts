import { api } from './api';
import { Car } from '../types';

export const carService = {
  getAll: async (): Promise<Car[]> => {
    return await api.get<Car[]>('/cars');
  },

  getById: async (id: string): Promise<Car> => {
    return await api.get<Car>(`/cars/${id}`);
  },

  create: async (car: Car): Promise<Car> => {
    return await api.post<Car>('/cars', car);
  },

  update: async (car: Car): Promise<Car> => {
    return await api.put<Car>(`/cars/${car.id}`, car);
  },

  delete: async (id: string): Promise<void> => {
    return await api.delete<void>(`/cars/${id}`);
  }
};
