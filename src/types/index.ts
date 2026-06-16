export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: MenuCategory
  image: string
  rating?: number
  featured?: boolean
}

export type MenuCategory =
  | 'brewed-coffee'
  | 'pastries'
  | 'hearty-meals'
  | 'cold-beverages'

export interface CartItem {
  menuItem: MenuItem
  quantity: number
}

export interface CafeLocation {
  id: string
  name: string
  address: string
  phone: string
  hours: string
  coordinates: { lat: number; lng: number }
}

export interface NavLink {
  label: string
  to: string
}

export type OrderType = 'pickup' | 'delivery'

export type CheckoutStep = 'details' | 'fulfillment' | 'confirm'

export interface CheckoutForm {
  fullName: string
  email: string
  phone: string
  orderType: OrderType
  address: string
  notes: string
  locationId: string
}
