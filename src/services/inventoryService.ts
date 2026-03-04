import api from './api';
import type {
    InventoryItem,
    InventoryItemCreate,
    InventoryTransaction,
    InventoryTransactionCreate,
    LowStockAlert,
} from '../types';

export const inventoryService = {
    async getAll(category?: string, status?: string): Promise<InventoryItem[]> {
        const params: Record<string, string> = {};
        if (category) params.category = category;
        if (status) params.status = status;
        const response = await api.get<InventoryItem[]>('/inventory/', { params });
        return response.data;
    },

    async create(data: InventoryItemCreate): Promise<InventoryItem> {
        const response = await api.post<InventoryItem>('/inventory/', data);
        return response.data;
    },

    async update(id: number, data: Partial<InventoryItem>): Promise<InventoryItem> {
        const response = await api.put<InventoryItem>(`/inventory/${id}`, data);
        return response.data;
    },

    async getLowStockAlerts(): Promise<LowStockAlert> {
        const response = await api.get<LowStockAlert>('/inventory/alerts');
        return response.data;
    },

    async createTransaction(data: InventoryTransactionCreate): Promise<InventoryTransaction> {
        const response = await api.post<InventoryTransaction>('/inventory/transactions', data);
        return response.data;
    },
};
