import type { MenuCategory } from '@/types'

export const BRAND = {
  name: 'TZEL',
  suffix: 'CAFÉ',
  tagline: 'EAT • SIP • CONNECT',
} as const

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'About', to: '/#about' },
  { label: 'Contact', to: '/#contact' },
] as const

export const MENU_CATEGORIES: { id: MenuCategory; label: string }[] = [
  { id: 'brewed-coffee', label: 'Brewed Coffee' },
  { id: 'pastries', label: 'Pastries' },
  { id: 'hearty-meals', label: 'Hearty Meals' },
  { id: 'cold-beverages', label: 'Cold Beverages' },
]
