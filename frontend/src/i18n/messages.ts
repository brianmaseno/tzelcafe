export type Locale = 'en' | 'sw'

const messages = {
  en: {
    home: 'Home',
    menu: 'Menu',
    about: 'About',
    contact: 'Contact',
    promotions: 'Promotions',
    login: 'Login',
    account: 'Account',
    orderNow: 'Order Now',
    newsletterTitle: 'Stay in the loop',
    newsletterPlaceholder: 'Your email',
    newsletterButton: 'Subscribe',
    newsletterSuccess: 'Thank you for subscribing!',
  },
  sw: {
    home: 'Nyumbani',
    menu: 'Menyu',
    about: 'Kuhusu',
    contact: 'Wasiliana',
    promotions: 'Matangazo',
    login: 'Ingia',
    account: 'Akaunti',
    orderNow: 'Agiza Sasa',
    newsletterTitle: 'Endelea kupata habari',
    newsletterPlaceholder: 'Barua pepe yako',
    newsletterButton: 'Jiandikishe',
    newsletterSuccess: 'Asante kwa kujiandikisha!',
  },
} as const

export function t(locale: Locale, key: keyof (typeof messages)['en']): string {
  return messages[locale][key] ?? messages.en[key]
}

export { messages }
