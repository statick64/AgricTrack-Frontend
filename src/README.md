# Source Code Structure

This directory contains the source code for the AgriTrack application.

## Directory Overview

### 📁 `assets/`
Static assets for the application.
- **`images/`** - Image files (logos, backgrounds, etc.)
- **`icons/`** - Icon files and custom SVGs
- **`fonts/`** - Custom font files

### 📁 `components/`
Reusable React components organized by purpose.

#### `components/layout/`
Layout-specific components that structure the application:
- `DashboardLayout.tsx` - Main dashboard layout wrapper
- `Sidebar.tsx` - Navigation sidebar
- `TopBar.tsx` - Top navigation bar

#### `components/ui/`
Generic, reusable UI components:
- `Badge.tsx` - Status badges
- `Button.tsx` - Button component with variants
- `Card.tsx` - Card container
- `DataTable.tsx` - Data table with sorting/filtering
- `Input.tsx` - Form input component
- `Modal.tsx` - Modal dialog
- `Select.tsx` - Select dropdown
- `StatCard.tsx` - Statistics card for dashboard

### 📁 `contexts/`
React Context providers for global state management.

**Purpose:** Share state across components without prop drilling.

**Examples:**
- Authentication state
- Theme preferences
- User settings

**Usage:**
```typescript
// Create a context
export const AuthContext = createContext<AuthContextType | null>(null);

// Use in components
const { user, login, logout } = useContext(AuthContext);
```

### 📁 `hooks/`
Custom React hooks for reusable logic.

**Purpose:** Extract and share component logic.

**Naming Convention:** All hooks must start with `use` (e.g., `useAuth`, `useFetch`)

**Examples:**
- `useAuth.ts` - Authentication logic
- `useLocalStorage.ts` - Local storage management
- `useFetch.ts` - Data fetching logic

### 📁 `pages/`
Page-level components mapped to routes.

**Current Pages:**
- `LandingPage.tsx` - Landing/home page
- `LoginPage.tsx` - User login
- `RegisterPage.tsx` - User registration
- `DashboardPage.tsx` - Main dashboard
- `LivestockPage.tsx` - Livestock management
- `HealthPage.tsx` - Health & vaccination tracking
- `InventoryPage.tsx` - Inventory management
- `ReportsPage.tsx` - Reports and analytics
- `TrainingPage.tsx` - Training resources

### 📁 `services/`
API calls and external service integrations.

**Purpose:** Centralize all API logic for easier testing and maintenance.

**Examples:**
```typescript
// api.ts - Base API configuration
export const api = {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
};

// livestockService.ts - Livestock-specific API calls
export const livestockService = {
  getAll: () => fetch(`${api.baseURL}/livestock`),
  getById: (id) => fetch(`${api.baseURL}/livestock/${id}`),
  create: (data) => fetch(`${api.baseURL}/livestock`, { method: 'POST', body: JSON.stringify(data) }),
};
```

### 📁 `types/`
TypeScript type definitions and interfaces.

**Purpose:** Centralized type management for better type safety.

**Organization:**
- Group related types in files (e.g., `livestock.types.ts`, `user.types.ts`)
- Export types for use across the application

**Examples:**
```typescript
// livestock.types.ts
export interface Livestock {
  id: string;
  tagNumber: string;
  species: string;
  breed: string;
  dateOfBirth: Date;
  weight: number;
  status: 'healthy' | 'sick' | 'quarantine';
}

export type LivestockStatus = Livestock['status'];
```

### 📁 `utils/`
Utility functions and helper methods.

**Purpose:** Pure functions for data manipulation, formatting, and validation.

**Examples:**
- `formatters.ts` - Date, currency, number formatting
- `validators.ts` - Form validation functions
- `constants.ts` - Application constants

```typescript
// formatters.ts
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(amount);
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-ZA').format(date);
};
```

## Coding Conventions

### Imports
Use path aliases for cleaner imports:
```typescript
// ✅ Good
import { Button } from '@components/ui/Button';
import { useAuth } from '@hooks/useAuth';

// ❌ Avoid
import { Button } from '../../../components/ui/Button';
```

### Component Structure
```typescript
// 1. Imports
import React from 'react';
import { Button } from '@components/ui/Button';

// 2. Types/Interfaces
interface MyComponentProps {
  title: string;
}

// 3. Component
export function MyComponent({ title }: MyComponentProps) {
  // 4. Hooks
  const [state, setState] = useState();

  // 5. Handlers
  const handleClick = () => {};

  // 6. Render
  return <div>{title}</div>;
}
```

### File Naming
- **Components:** PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- **Hooks:** camelCase with `use` prefix (e.g., `useAuth.ts`)
- **Utils:** camelCase (e.g., `formatters.ts`, `validators.ts`)
- **Types:** camelCase with `.types` suffix (e.g., `user.types.ts`)

## Best Practices

1. **Keep components small and focused** - Single responsibility principle
2. **Extract reusable logic to hooks** - Don't repeat yourself
3. **Use TypeScript strictly** - Avoid `any` types
4. **Write self-documenting code** - Clear naming over comments
5. **Organize imports** - Group by external, internal, relative
6. **Use constants for magic values** - Define in `utils/constants.ts`

## Questions?

If you're unsure where to place new code:
- **Reusable UI?** → `components/ui/`
- **Page component?** → `pages/`
- **Business logic?** → `hooks/` or `services/`
- **Type definition?** → `types/`
- **Helper function?** → `utils/`
