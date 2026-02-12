# Utility Functions

This directory contains utility functions and helper methods.

## Organization
- `formatters.ts` - Formatting functions (dates, currency, etc.)
- `validators.ts` - Validation functions
- `constants.ts` - Application constants

## Examples

### formatters.ts
```typescript
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR'
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-ZA').format(date);
};

export const formatWeight = (weight: number): string => {
  return `${weight.toFixed(1)} kg`;
};
```

### validators.ts
```typescript
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};
```

### constants.ts
```typescript
export const APP_NAME = 'AgriTrack';
export const API_TIMEOUT = 30000;

export const LIVESTOCK_SPECIES = [
  'Cattle',
  'Sheep',
  'Goat',
  'Pig',
  'Chicken',
] as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  LIVESTOCK: '/livestock',
} as const;
```

## Usage
```typescript
import { formatCurrency, formatDate } from '@utils/formatters';
import { isValidEmail } from '@utils/validators';
import { LIVESTOCK_SPECIES } from '@utils/constants';
```
