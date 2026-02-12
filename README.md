# AgriTrack - Livestock Management System

AgriTrack is a modern web application for managing livestock, tracking health records, managing inventory, and generating reports for agricultural operations.

## 🚀 Technology Stack

- **Frontend Framework:** React 18.3.1
- **Build Tool:** Vite 7.3.1
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.4.17
- **Routing:** React Router DOM 6.26.2
- **Icons:** Lucide React
- **UI Library:** Emotion React

## 📁 Project Structure

```
agrictrack/
├── src/
│   ├── assets/              # Static assets (images, icons, fonts)
│   ├── components/          # Reusable React components
│   │   ├── layout/          # Layout components (Sidebar, TopBar, etc.)
│   │   └── ui/              # UI components (Button, Card, Input, etc.)
│   ├── contexts/            # React Context providers for global state
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components for routing
│   ├── services/            # API calls and external services
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions and helpers
│   ├── App.tsx              # Main application component
│   ├── index.tsx            # Application entry point
│   └── index.css            # Global styles
├── .env.example             # Environment variables template
├── .prettierrc              # Prettier configuration
├── vite.config.ts           # Vite configuration
└── tsconfig.json            # TypeScript configuration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository** (or navigate to the project directory)

2. **Install dependencies:**
   ```powershell
   npm install
   ```

3. **Set up environment variables:**
   ```powershell
   cp .env.example .env
   ```
   Edit `.env` with your configuration values.

4. **Start the development server:**
   ```powershell
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:5173/`

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

## 🎨 Path Aliases

This project uses path aliases for cleaner imports:

```typescript
// Instead of: import Button from '../../../components/ui/Button'
import Button from '@components/ui/Button';

// Available aliases:
import { ... } from '@/...'           // src/
import { ... } from '@components/...' // src/components/
import { ... } from '@pages/...'      // src/pages/
import { ... } from '@hooks/...'      // src/hooks/
import { ... } from '@utils/...'      // src/utils/
import { ... } from '@types/...'      // src/types/
import { ... } from '@services/...'   // src/services/
import { ... } from '@contexts/...'   // src/contexts/
import { ... } from '@assets/...'     // src/assets/
```

## 🧪 Development Guidelines

### Code Formatting

This project uses Prettier for code formatting. Format your code with:
```powershell
npx prettier --write .
```

### TypeScript

- All new files should use TypeScript (`.ts` or `.tsx`)
- Define types in `src/types/` for reusability
- Use strict type checking

### Component Structure

- **UI Components** (`src/components/ui/`): Reusable, generic components
- **Layout Components** (`src/components/layout/`): App-specific layout components
- **Pages** (`src/pages/`): Route-level components

### Custom Hooks

- Place custom hooks in `src/hooks/`
- Name hooks with `use` prefix (e.g., `useAuth.ts`)
- Keep hooks focused and reusable

## 🐛 Troubleshooting

### Port already in use
If port 5173 is occupied, Vite will automatically use the next available port.

### Module not found errors
```powershell
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### TypeScript errors
Check `tsconfig.json` and ensure all path aliases are correctly configured.

## 📝 Features

- **Dashboard:** Overview of farm operations with key metrics
- **Livestock Management:** Track and manage livestock records
- **Health & Vaccination:** Monitor animal health and vaccination schedules
- **Inventory Management:** Track feed, supplies, and equipment
- **Reports:** Generate comprehensive reports and analytics
- **Training:** Access educational resources and best practices

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure code is formatted with Prettier
4. Run linting: `npm run lint`
5. Test your changes
6. Submit a pull request

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ for modern agriculture**
