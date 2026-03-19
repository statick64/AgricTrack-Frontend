import api from './api';
import type {
    InventoryItem,
    InventoryItemCreate,
    InventoryTransaction,
    InventoryTransactionCreate,
} from '../types';

export const inventoryService = {
    // GET /api/inventory/items
    async getAll(category?: string, status?: string): Promise<InventoryItem[]> {
        const params: Record<string, string> = {};
        if (category) params.category = category;
        if (status) params.status = status;
        const response = await api.get<InventoryItem[]>('/inventory/items', { params });
        return response.data;
    },

    // POST /api/inventory/items
    async create(data: InventoryItemCreate): Promise<InventoryItem> {
        const response = await api.post<InventoryItem>('/inventory/items', data);
        return response.data;
    },

    // GET /api/inventory/items/{item_id}
    async getById(id: number): Promise<InventoryItem> {
        const response = await api.get<InventoryItem>(`/inventory/items/${id}`);
        return response.data;
    },

    // PUT /api/inventory/items/{item_id}
    async update(id: number, data: Partial<InventoryItem>): Promise<InventoryItem> {
        const response = await api.put<InventoryItem>(`/inventory/items/${id}`, data);
        return response.data;
    },

    // DELETE /api/inventory/items/{item_id}
    async delete(id: number): Promise<void> {
        await api.delete(`/inventory/items/${id}`);
    },

    // GET /api/inventory/transactions
    async getTransactions(): Promise<InventoryTransaction[]> {
        const response = await api.get<InventoryTransaction[]>('/inventory/transactions');
        return response.data;
    },

    // POST /api/inventory/transactions
    async createTransaction(data: InventoryTransactionCreate): Promise<InventoryTransaction> {
        const response = await api.post<InventoryTransaction>('/inventory/transactions', data);
        return response.data;
    },
};
