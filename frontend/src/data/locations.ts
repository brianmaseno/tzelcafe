import type { CafeLocation } from '@/types'
import { CONTACT } from '@/constants/contact'

/** TZEL CAFÉ — Siwaka Plaza (Madaraka, Nairobi) */
export const CAFE_LOCATIONS: CafeLocation[] = [
  {
    id: 'siwaka-plaza',
    name: 'TZEL CAFÉ — Siwaka Plaza',
    address:
      'Ole Sangale Road, Opposite Strathmore University, Madaraka, Langata Sub-County, Nairobi',
    phone: CONTACT.phone,
    hours: 'Mon – Sun: 7:00 AM – 10:00 PM',
    coordinates: { lat: -1.3092, lng: 36.8124 },
  },
]

export const PRIMARY_LOCATION = CAFE_LOCATIONS[0]
