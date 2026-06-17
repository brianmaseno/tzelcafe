# TZEL CAFÉ

Premium coffeehouse and restaurant web experience built with Vue 3, Vite, Tailwind CSS, Pinia, and Vue Router.

Design reference: [Eato Restaurant UI Kit](https://www.figma.com/design/WXsrRKACAO6Qis8S3AUiHL/Eato---Restaurant---Cafe-Website-Figma-UI-Kit-FREE--Community-?node-id=18130-1723)

## Environment

| Variable | Local | Production |
|----------|-------|------------|
| `VITE_API_BASE_URL` | `http://localhost:9000` | `https://tzelcafebackend-gixrp.ondigitalocean.app` |

Copy `.env.example` to `.env` for local dev. Production builds use `.env.production` automatically (`npm run build`).

On **DigitalOcean App Platform** (frontend app), set in **Settings → Environment variables**:

```
VITE_API_BASE_URL=https://tzelcafebackend-gixrp.ondigitalocean.app
```

Set **Source directory** to `frontend` if the repo root contains both frontend and backend folders.

## Quick start

```bash
npm install
npm run dev
```

## Project structure

```
src/
├── assets/styles/       # Global Tailwind theme & base styles
├── components/
│   ├── cart/            # CartDrawer
│   ├── home/            # HeroSection, future home sections
│   ├── layout/          # AppNavbar, AppFooter
│   ├── menu/            # MenuItemCard, CategoryFilter (next phase)
│   └── ui/              # PrimaryButton, shared primitives
├── constants/           # Brand tokens, nav links
├── router/              # Route-level code splitting
├── stores/              # Pinia (cart, session, orders)
├── types/               # Shared TypeScript interfaces
└── views/               # HomeView, MenuView, CheckoutView
```
