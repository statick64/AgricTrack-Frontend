# Custom React Hooks

This directory contains custom React hooks for shared logic across components.

## Naming Convention
All hooks must start with `use` (e.g., `useAuth`, `useFetch`)

## Examples

### useLocalStorage
```typescript
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
```

### useAuth
```typescript
import { useContext } from 'react';
import { AuthContext } from '@contexts/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

## Usage
```typescript
import { useLocalStorage } from '@hooks/useLocalStorage';

function MyComponent() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  // ...
}
```
