export interface SitePageSection {
  title: string
  body: string
}

export interface SitePage {
  title: string
  description: string
  intro?: string
  sections: SitePageSection[]
}

export const SITE_PAGES: Record<string, SitePage> = {
  about: {
    title: 'About TZEL CAFÉ',
    description: 'Our story, promise, and purpose — where great taste meets great purpose.',
    intro: 'TZEL CAFÉ is a premium coffeehouse and restaurant built on one simple idea: Eat. Sip. Connect.',
    sections: [
      { title: 'Our Story', body: 'Born from a passion for exceptional coffee and meaningful community spaces, TZEL CAFÉ brings together world-class flavours and warm Kenyan hospitality.' },
      { title: 'Our Promise', body: 'Freshly prepared food and beverages, premium ingredients, affordable excellence, and experiences that bring people together.' },
      { title: 'Eat. Sip. Connect.', body: 'Whether you are meeting a friend, closing a deal, or treating your family — TZEL is your place.' },
    ],
  },
  blog: {
    title: 'Blog & Recipes',
    description: 'Stories, recipes, and café culture from TZEL CAFÉ.',
    sections: [
      { title: 'Perfect Pour-Over at Home', body: 'Use freshly ground beans, water at 92–96°C, and a slow circular pour for a balanced cup.' },
      { title: 'TZEL Signature Latte', body: 'Double espresso, steamed milk, and a touch of bronze honey — our house favourite.' },
      { title: 'Seasonal Specials', body: 'Follow our promotions page and newsletter for limited-time recipes and chef features.' },
    ],
  },
  gallery: {
    title: 'Gallery',
    description: 'Moments from TZEL CAFÉ — food, ambience, and community.',
    sections: [
      { title: 'Ambience', body: 'Warm lighting, comfortable seating, and spaces designed for connection.' },
      { title: 'Food & Beverages', body: 'From artisan coffee to hearty meals and sweet delights.' },
      { title: 'Community Events', body: 'Impact days, fundraisers, and celebrations with our guests.' },
    ],
  },
  careers: {
    title: 'Careers',
    description: 'Join the TZEL CAFÉ team.',
    sections: [
      { title: 'Baristas & Kitchen', body: 'We hire passionate people who care about quality and guest experience.' },
      { title: 'How to Apply', body: 'Email careers@tzelcafe.co.ke with your CV and the role you are interested in.' },
    ],
  },
  franchise: {
    title: 'Franchise Opportunities',
    description: 'Partner with Africa\'s most loved café brand.',
    sections: [
      { title: 'The TZEL Model', body: 'Premium quality, affordable excellence, digital convenience, and community impact.' },
      { title: 'Enquiries', body: 'Contact franchise@tzelcafe.co.ke for partnership information and territory availability.' },
    ],
  },
  'gift-cards': {
    title: 'Gift Cards',
    description: 'Give the gift of TZEL CAFÉ.',
    sections: [
      { title: 'Digital & Physical Cards', body: 'Available in-store and online. Perfect for birthdays, thank-yous, and corporate gifting.' },
      { title: 'Corporate Gifting', body: 'Bulk orders and branded cards for teams and clients — see Corporate Services.' },
    ],
  },
  events: {
    title: 'Events & Private Bookings',
    description: 'Host your next event at TZEL CAFÉ.',
    sections: [
      { title: 'Private Functions', body: 'Birthdays, engagements, team celebrations, and intimate gatherings.' },
      { title: 'Corporate Events', body: 'Meetings, conferences, and catered events with full menu support.' },
      { title: 'Book', body: 'Email events@tzelcafe.co.ke with your date, guest count, and requirements.' },
    ],
  },
  faqs: {
    title: 'FAQs',
    description: 'Frequently asked questions about TZEL CAFÉ.',
    sections: [
      { title: 'Do you deliver?', body: 'Yes — order online and provide your drop-off location at checkout.' },
      { title: 'What are your hours?', body: 'Mon – Sun: 7:00 AM – 10:00 PM (may vary by location).' },
      { title: 'How do rewards work?', body: 'Earn 1 point for every KES 100 spent on paid orders. Redeem via upcoming member offers.' },
      { title: 'Payment methods?', body: 'We accept Paystack (card, mobile money, and more) for online orders.' },
    ],
  },
  reviews: {
    title: 'Customer Reviews',
    description: 'What our guests say about TZEL CAFÉ.',
    sections: [
      { title: 'Sarah M.', body: '"The TZEL Signature Latte is unmatched. Fast service and beautiful ambience."' },
      { title: 'James K.', body: '"Corporate lunch delivery was seamless — our team orders every Friday."' },
      { title: 'Amina W.', body: '"Family friendly, great breakfast, and the pastries are fresh daily."' },
    ],
  },
}
