# API Services

This directory contains API calls and external service integrations.

## Purpose
Centralize all API logic for easier testing and maintenance.

## Organization
- `api.ts` - Base API configuration
- `authService.ts` - Authentication API calls
- `livestockService.ts` - Livestock-related API calls
- `healthService.ts` - Health records API calls
- `inventoryService.ts` - Inventory API calls

## Example

### api.ts
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = {
  baseURL: API_URL,
  timeout: 30000,

  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  },
};
```

### livestockService.ts
```typescript
import { api } from './api';
import { Livestock } from '@types/livestock.types';

export const livestockService = {
  getAll: () => api.request<Livestock[]>('/livestock'),
  
  getById: (id: string) => api.request<Livestock>(`/livestock/${id}`),
  
  create: (data: Omit<Livestock, 'id'>) =>
    api.request<Livestock>('/livestock', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  update: (id: string, data: Partial<Livestock>) =>
    api.request<Livestock>(`/livestock/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  delete: (id: string) =>
    api.request<void>(`/livestock/${id}`, {
      method: 'DELETE',
    }),
};
```

## Usage
```typescript
import { livestockService } from '@services/livestockService';

// In a component or hook
const livestock = await livestockService.getAll();
```
