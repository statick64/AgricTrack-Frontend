import api from './api';
import type { Livestock, LivestockCreate, LivestockUpdate, LivestockStats } from '../types';

export const livestockService = {
    async getAll(animalType?: string): Promise<Livestock[]> {
        const params = animalType ? { animal_type: animalType } : {};
        const response = await api.get<Livestock[]>('/livestock/', { params });
        return response.data;
    },

    async getById(id: number): Promise<Livestock> {
        const response = await api.get<Livestock>(`/livestock/${id}`);
        return response.data;
    },

    async create(data: LivestockCreate): Promise<Livestock> {
        const response = await api.post<Livestock>('/livestock/', data);
        return response.data;
    },

    async update(id: number, data: LivestockUpdate): Promise<Livestock> {
        const response = await api.put<Livestock>(`/livestock/${id}`, data);
        return response.data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/livestock/${id}`);
    },

    async getStats(): Promise<LivestockStats> {
        const response = await api.get<LivestockStats>('/livestock/stats/summary');
        return response.data;
    },
};
