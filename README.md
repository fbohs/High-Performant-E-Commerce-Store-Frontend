# ShopHub — High-Performance E-Commerce Frontend

A full-featured e-commerce storefront built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Material UI**, and **Zustand**.

## Stack

- **Next.js 16** — App Router, React Server Components, Turbopack
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** — utility-first styling, layout, and spacing
- **Material UI v9** — component library, theming, accessibility primitives
- **Zustand v5** — domain-scoped client state (theme, cart, etc.)
- **Vitest** — unit/component tests

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command               | Purpose                          |
| --------------------- | -------------------------------- |
| `npm run dev`         | Start the dev server             |
| `npm run build`       | Production build                 |
| `npm run start`       | Run the production build         |
| `npm run lint`        | Lint with `next lint`            |
| `npm run type-check`  | TypeScript type check (no emit)  |
| `npm run test`        | Run Vitest test suite            |
| `npm run test:watch`  | Vitest in watch mode             |

## Project layout

See `CLAUDE.md` for the full architectural conventions, folder structure, and patterns to follow when contributing.
