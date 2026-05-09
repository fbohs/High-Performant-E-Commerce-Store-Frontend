# ShopHub — Engineering Guide

## Stack

- **Next.js 16** with the **App Router** (no Pages Router; do not introduce `pages/`)
- **React 19** Server Components by default; `'use client'` only where required
- **TypeScript** with `strict: true`
- **Tailwind CSS v4** for layout, spacing, and utility styling
- **Material UI v9** (`@mui/material`) for components, theming, and a11y primitives
- **Zustand v5** for client-side, domain-scoped stores
- **Vitest** for unit and component tests

## Coding Standards and Patterns

### TypeScript Best Practices
- Use strict typing with explicit type annotations
- Prefer `interface` over `type` for object shapes
- Use discriminated unions for union types
- Implement proper error handling with custom error classes
- Use `readonly` for immutable data structures and component props
- Leverage utility types like `Partial<T>`, `Pick<T>`, `Omit<T>`
- Never use `any`. If a type is truly unknown, use `unknown` and narrow it.

### SOLID Principles

**Single Responsibility — split stores by domain**
```typescript
// src/stores/useUserStore.ts
export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))

// src/stores/useAuthStore.ts
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
}))
```

**Open/Closed — composition over inheritance**
```typescript
interface ProductRenderer {
  render: (product: Product) => React.ReactNode
}

const renderers: Record<string, ProductRenderer> = {
  // Add new renderers without changing existing ones
}
```

**Liskov Substitution — props contract holds for all variants**
```typescript
interface ListProps<T> {
  readonly data: readonly T[]
  readonly loading: boolean
  readonly error: string | null
}
```

### Zustand Store Pattern

```typescript
// src/stores/useAppStore.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type ThemeMode = 'light' | 'dark'

interface AppState {
  readonly theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        theme: 'light',
        setTheme: (theme) => set({ theme }),
        toggleTheme: () =>
          set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      }),
      { name: 'app-storage' },
    ),
  ),
)
```

Stores are client-only — any component that imports them must be a Client Component (`'use client'`).

## Project Architecture

### Folder Structure

```
src/
├── app/                  # Next.js App Router (routes, layouts, route handlers)
│   ├── layout.tsx        # Root layout — wraps children in ThemeRegistry
│   ├── page.tsx          # Home route
│   ├── globals.css       # Tailwind v4 entry + global styles
│   └── (feature)/        # Route groups per feature
├── components/           # Feature-grouped UI components
│   ├── Navbar/           # index.tsx + helpers (Logo, SearchBar, CartIconButton, …)
│   ├── Footer/           # index.tsx + helpers (FooterLinkColumn, NewsletterSignup, …)
│   └── Hero/             # index.tsx + helpers (HeroCarousel, CategoryFilter, …)
├── features/             # Feature-scoped logic (user, auth, cart, checkout)
├── hooks/                # Reusable client hooks
├── stores/               # Zustand stores, one per domain
├── services/             # API clients, fetchers (server- and client-safe)
├── lib/                  # Cross-cutting utilities (theme, ThemeRegistry, fetcher)
├── utils/                # Pure helpers
├── types/                # Shared TypeScript types
└── constants/            # Static data (countries, categories, hero slides, …)
```

**Component organization.** Each public component lives in a PascalCase folder named after itself. The entry component is `index.tsx` so consumers import the bare folder path: `import { Navbar } from '@/components/Navbar'`. Helper subcomponents only used by that feature are colocated as siblings (`components/Navbar/Logo.tsx`, etc.). When a helper is reused across two features, lift it to its own folder under `components/`. Avoid the atoms/molecules/organisms split; folder-by-feature scales better and keeps related code together.

### Server vs Client Components

- **Default to Server Components.** They render on the server, ship no JS, and can fetch data directly.
- Add `'use client'` only when the component needs: hooks (`useState`, `useEffect`, Zustand), browser APIs, event handlers, or `<ThemeProvider>` context.
- Keep the client boundary as low in the tree as possible. A typical page is a Server Component that imports a small Client Component for the interactive part.
- Pass plain serializable props from server to client. Don't pass functions or class instances across the boundary.

### Tailwind + MUI coexistence

- **Tailwind for layout, spacing, flex/grid, simple text utilities.** Apply via `className`.
- **MUI for components, theming, and accessibility-heavy primitives** (Buttons, Dialogs, Inputs, etc.).
- Don't use MUI's `sx` prop for things Tailwind already handles (margin/padding/flex). Reserve `sx` for theme-aware values (`palette.primary.main`, `theme.spacing(2)`).
- Don't apply Tailwind classes that fight MUI's internal styles (e.g., overriding `<Button>` background). Use the MUI theme to customize component variants instead.

### MUI App Router integration

The MUI emotion cache must be set up via `AppRouterCacheProvider` so SSR styles match the client. This lives in `src/lib/ThemeRegistry.tsx` and is rendered from the root layout.

```tsx
// src/lib/ThemeRegistry.tsx
'use client'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import { buildTheme } from '@/lib/theme'
import { useAppStore } from '@/stores/useAppStore'

export const ThemeRegistry: React.FC<{ readonly children: React.ReactNode }> = ({
  children,
}) => {
  const mode = useAppStore((s) => s.theme)
  return (
    <AppRouterCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={buildTheme(mode)}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
```

### Theme factory

```ts
// src/lib/theme.ts
import { createTheme, type Theme } from '@mui/material/styles'

export const buildTheme = (mode: 'light' | 'dark'): Theme =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#1976d2' },
      secondary: { main: '#dc004e' },
    },
    typography: {
      fontFamily: ['Roboto', 'sans-serif'].join(','),
    },
  })
```

### Data fetching

- Prefer **server-side fetching in Server Components** with `fetch()` and Next.js cache directives (`{ next: { revalidate: 60 } }`, `{ cache: 'no-store' }`).
- Use **route handlers** under `src/app/api/.../route.ts` for endpoints owned by the frontend.
- For client-side mutations, call route handlers; do not duplicate fetch logic in client components.

## Build Commands and Test Instructions

### Build & Run
```bash
npm run dev          # Next.js dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Run the production build
npm run type-check   # tsc --noEmit
npm run lint         # next lint
npm run lint:fix
npm run format       # Prettier
```

### Tests (Vitest)
```bash
npm run test                 # Run all tests
npm run test:watch           # Watch mode
npm run test:coverage        # With coverage
npm run test -- src/components/atoms/HelloWorld.test.tsx
```

### Test patterns

```typescript
import { render, screen } from '@testing-library/react'
import { HelloWorld } from './HelloWorld'

describe('HelloWorld', () => {
  it('renders the default greeting', () => {
    render(<HelloWorld />)
    expect(screen.getByRole('heading', { name: /hello, world/i })).toBeInTheDocument()
  })

  it('renders a custom name', () => {
    render(<HelloWorld name="ShopHub" />)
    expect(screen.getByText(/hello, shophub/i)).toBeInTheDocument()
  })
})
```

### Store tests
```typescript
import { useAppStore } from '@/stores/useAppStore'

describe('useAppStore', () => {
  beforeEach(() => {
    useAppStore.setState({ theme: 'light' })
  })

  it('toggles theme', () => {
    useAppStore.getState().toggleTheme()
    expect(useAppStore.getState().theme).toBe('dark')
  })
})
```

## Patterns to Avoid

**1. Pages Router**
Don't add a `pages/` directory. This project is App Router only.

**2. Unnecessary `'use client'`**
Don't put `'use client'` at the top of layouts or pages just to make MUI work. Push the boundary into a small Client Component (e.g., `ThemeRegistry`).

**3. Massive stores**
Don't create one giant store with cart + user + cms + UI state. Split by domain.

**4. Inline magic styles**
```tsx
// Avoid
<div style={{ color: '#ff0000', padding: 17 }} />

// Prefer Tailwind for spacing/layout
<div className="text-red-600 p-4" />

// Or MUI's sx with theme tokens for theme-aware values
<Box sx={{ color: 'error.main', p: 2 }} />
```

**5. `any` and unchecked casts**
```typescript
// Avoid
const handle = (data: any) => { ... }

// Prefer
const handle = (data: User[]) => { ... }
```

**6. Mixed naming**
```typescript
// Avoid
const user_data = {}
const UserData = {}

// Prefer
const userData = {}             // variables/functions: camelCase
const UserCard: React.FC = ...  // components: PascalCase
type UserDTO = { ... }          // types/interfaces: PascalCase
```

### Testing Anti-Patterns

**1. Testing implementation details**
```typescript
// Avoid
expect(component.state.isOpen).toBe(true)

// Prefer
expect(screen.getByRole('dialog')).toBeVisible()
```

**2. Over-mocking**
Mock only what crosses an external boundary (network, filesystem). Don't mock React, Zustand, or your own modules.

**3. Real network in tests**
Stub HTTP via `vi.fn()` or MSW. Tests must run offline and deterministically.
