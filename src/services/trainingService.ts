import api from './api';
import type { TrainingResource } from '../types';

export const trainingService = {
    async getAll(category?: string): Promise<TrainingResource[]> {
        const params = category ? { category } : {};
        const response = await api.get<TrainingResource[]>('/training/', { params });
        return response.data;
    },

    async getFeatured(): Promise<TrainingResource[]> {
        const response = await api.get<TrainingResource[]>('/training/featured');
        return response.data;
    },

    async getById(id: number): Promise<TrainingResource> {
        const response = await api.get<TrainingResource>(`/training/${id}`);
        return response.data;
    },
};
