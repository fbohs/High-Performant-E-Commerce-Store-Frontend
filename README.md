# ShopHub — High-Performance E-Commerce Frontend

A full-featured e-commerce storefront built with React 19, TypeScript, Tailwind CSS v4, and Vite (Rolldown). Ships as a static SPA served via Nginx in Docker.

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 19 + TypeScript |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 (PostCSS) |
| Bundler | Vite 7 (rolldown-vite) |
| State | React Context + useReducer |
| Persistence | localStorage (cart + auth) |
| Production | Docker multi-stage + Nginx |

## Features

- Product catalogue with search, category filters, price range, and rating filters
- Product detail pages with image gallery, stock status, reviews, and related products
- Persistent cart with quantity management, tax and shipping calculation
- Auth flow (sign in / register) with protected routes
- User profile with order history and saved addresses
- Responsive layout — mobile-first, accessible (WCAG-aligned)
- Auto-rotating hero banner, category quick-links, multiple product carousels

## Project Structure

```
src/
├── context/
│   ├── AuthContext.tsx       # Auth state (login, register, logout)
│   └── CartContext.tsx       # Cart state with localStorage persistence
├── data/
│   └── mockData.ts           # 20 products, categories, users, orders + helper fns
├── types/
│   └── index.ts              # TypeScript types mirroring schema.prisma models
├── components/
│   ├── HeroBanner/           # Auto-rotating promotional banner
│   ├── Navbar/               # Search, cart count, auth-aware nav
│   ├── Footer/               # Links, back-to-top
│   ├── ProductCard/          # Card with rating, add-to-cart, discount badge
│   ├── ReviewCard/           # Single review with avatar initials
│   └── StarRating/           # SVG star renderer (full / half / empty)
└── pages/
    ├── Home/                 # Hero + category nav + product carousels
    ├── Products/             # Browse grid with sidebar filters + sort
    ├── ProductDetail/        # Gallery, pricing, qty selector, reviews
    ├── Cart/                 # Line items, shipping/tax summary, checkout
    ├── Auth/
    │   ├── Login.tsx
    │   └── Register.tsx
    ├── Profile/              # Orders, addresses, account details (tabbed)
    ├── About/
    ├── Blogs/
    └── NotFound/
```

## Data Model

Types in `src/types/index.ts` mirror `schema.prisma`. The mock layer in `src/data/mockData.ts` implements the same shape so the components are drop-in ready for a real API.

Key models: `User`, `Product`, `Category`, `Order`, `OrderItem`, `Review`, `CartItem`, `Address`, `Inventory`.

## Getting Started

```bash
npm install
npm run dev       # http://localhost:5173
```

**Demo credentials:** `demo@shophub.com` / `demo123`

## Available Scripts

```bash
npm run dev       # Development server (HMR)
npm run build     # TypeScript check + production bundle → dist/
npm run preview   # Preview production build locally
npm run lint      # ESLint
```

## Production (Docker)

```bash
docker build -t shophub-frontend .
docker run -p 80:80 shophub-frontend
```

The Dockerfile uses a two-stage build: Node 20 Alpine compiles the app, then Nginx Alpine serves the `dist/` directory. The Nginx config handles SPA routing (`try_files $uri /index.html`).

## Connecting a Real Backend

Replace the helper functions in `src/data/mockData.ts` with API calls. The TypeScript types in `src/types/index.ts` already match the Prisma schema so no type changes are needed in components.

The Prisma schema (`schema.prisma` at the repo root) defines the full data model: `User`, `Product`, `Category`, `Inventory`, `Review`, `CartItem`, `Order`, `OrderItem`, `Payment`.
