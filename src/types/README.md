# TypeScript Types

This directory contains TypeScript type definitions and interfaces.

## Organization
Group related types in files (e.g., `livestock.types.ts`, `user.types.ts`)

## Example

### livestock.types.ts
```typescript
export interface Livestock {
  id: string;
  tagNumber: string;
  species: string;
  breed: string;
  dateOfBirth: Date;
  weight: number;
  status: LivestockStatus;
}

export type LivestockStatus = 'healthy' | 'sick' | 'quarantine';

export interface HealthRecord {
  id: string;
  livestockId: string;
  date: Date;
  type: 'vaccination' | 'treatment' | 'checkup';
  notes: string;
}
```

## Usage
```typescript
import { Livestock, LivestockStatus } from '@types/livestock.types';

const animal: Livestock = {
  id: '1',
  tagNumber: 'A001',
  // ...
};
```
