import type { MenuCategory } from '@/types'

export const BRAND = {
  name: 'TZEL',
  suffix: 'CAFÉ',
  tagline: 'EAT • SIP • CONNECT',
} as const

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Track Order', to: '/track-order' },
  { label: 'Our Story', to: '/our-story' },
  { label: 'Promotions', to: '/promotions' },
  { label: 'Contact', to: '/contact' },
] as const

export const FOOTER_LINKS = [
  { label: 'Track Order', to: '/track-order' },
  { label: 'Our Story', to: '/our-story' },
  { label: 'Contact', to: '/contact' },
  { label: 'Blog', to: '/blog' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Careers', to: '/careers' },
  { label: 'Franchise', to: '/franchise' },
  { label: 'Gift Cards', to: '/gift-cards' },
  { label: 'Events', to: '/events' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Reviews', to: '/reviews' },
] as const

export const MENU_CATEGORIES: { id: MenuCategory; label: string }[] = [
  { id: 'brewed-coffee', label: 'Brewed Coffee' },
  { id: 'pastries', label: 'Pastries' },
  { id: 'hearty-meals', label: 'Hearty Meals' },
  { id: 'cold-beverages', label: 'Cold Beverages' },
]
