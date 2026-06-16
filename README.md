# TZEL CAFÉ

Premium coffeehouse and restaurant web experience built with Vue 3, Vite, Tailwind CSS, Pinia, and Vue Router.

Design reference: [Eato Restaurant UI Kit](https://www.figma.com/design/WXsrRKACAO6Qis8S3AUiHL/Eato---Restaurant---Cafe-Website-Figma-UI-Kit-FREE--Community-?node-id=18130-1723)

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
