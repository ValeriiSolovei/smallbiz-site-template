import type { PhotoEntry, SiteConfig } from '@/lib/types';
import { photoSet } from '@/lib/photos';
import photos from './photos.json';

const ph = photoSet('shop', photos as PhotoEntry[]);

const shop: SiteConfig = {
  id: 'shop',
  name: 'Mossbank Plant Co.',
  tagline: 'Houseplants, pots and plant advice on Ossington',
  neighbourhood: 'Ossington',
  indexable: false,
  theme: {
    mode: 'light',
    surfaceBase: '#f5faf8',
    surfaceCard: '#ffffff',
    surfaceHero: '#e2f0eb',
    borderDefault: '#d3e5df',
    textPrimary: '#12302b',
    textSecondary: '#3d5b55',
    textMuted: '#557069',
    accent: '#0f6e64',
    accentHover: '#0b5a52',
    accentDim: 'rgba(15, 110, 100, 0.10)',
    accentGlow: 'rgba(15, 110, 100, 0.24)',
    accentContrast: '#ffffff',
  },
  contact: {
    phone: '(416) 555-0183',
    email: 'hello@mossbank.example',
    addressLine: 'Ossington Ave, Toronto',
    mapBbox: [-79.43, 43.645, -79.41, 43.655],
    hours: [
      { days: 'Tue–Fri', time: '11:00 am – 7:00 pm' },
      { days: 'Sat–Sun', time: '10:00 am – 6:00 pm' },
      { days: 'Mon', time: 'Closed' },
    ],
  },
  hero: {
    eyebrow: 'Plant shop · Ossington',
    headline: 'Plants that fit your light, your space and your schedule.',
    subhead: 'Houseplants, pots and care advice from people who actually keep plants alive.',
    cta: { label: 'Browse plants', href: '/products/' },
    secondaryCta: { label: 'Ask about a plant', href: '/contact/' },
    photo: ph('hero.jpg'),
  },
  highlights: [
    { title: 'Matched to your light', body: 'Tell us about your window and we will suggest plants that will thrive.' },
    { title: 'Pots and soil on site', body: 'Pick a pot and we repot your plant while you wait.' },
    { title: 'Care advice for life', body: 'Send us a photo any time your plant looks unhappy.' },
  ],
  whyUs: {
    title: 'Why plant people shop here',
    points: [
      'Small-batch plants from Ontario growers',
      'Pet-safe plants clearly labelled',
      'Free repotting with any pot purchase',
      'Workshops on propagation and care',
    ],
  },
  reviews: [
    { quote: 'They asked about my apartment before selling me anything. Everything I bought is still alive.', name: 'Trinity Bellwoods neighbour (sample review)' },
    { quote: 'Best pot selection in the west end, and they repotted my monstera on the spot.', name: 'Ossington regular (sample review)' },
    { quote: 'The propagation workshop was the most fun Saturday I have had in months.', name: 'Workshop guest (sample review)' },
  ],
  about: {
    eyebrow: 'About the shop',
    headline: 'A small shop for people who want their plants to live',
    story: [
      'Mossbank started as a weekend market stall and grew into a little shop on Ossington.',
      'We stock plants that suit Toronto apartments and spend as long as it takes to match you with the right one.',
    ],
    photo: ph('team.jpg'),
    values: [
      { title: 'Right plant, right place', body: 'We would rather sell you one plant that thrives than three that struggle.' },
      { title: 'Grown close to home', body: 'Most of our plants come from Ontario greenhouses.' },
      { title: 'Help after you leave', body: 'Questions are always free, even years later.' },
    ],
  },
  gallery: ['gallery-1.jpg', 'gallery-2.jpg', 'gallery-3.jpg', 'gallery-4.jpg', 'gallery-5.jpg', 'gallery-6.jpg'].map(ph),
  primary: {
    kind: 'products',
    slug: 'products',
    title: 'Featured plants',
    intro: 'A few favourites in store right now. Stock changes weekly, so send us a message to check availability.',
    products: [
      { name: 'Monstera deliciosa', description: 'Big split leaves, bright indirect light.', price: '$38', photo: ph('product-1.jpg'), tags: ['Easy care'] },
      { name: 'Snake plant', description: 'Handles low light and forgetful watering.', price: '$26', photo: ph('product-2.jpg'), tags: ['Low light'] },
      { name: 'ZZ plant', description: 'Glossy leaves that shrug off low light and missed waterings.', price: '$28', photo: ph('product-3.jpg'), tags: ['Beginner friendly'] },
      { name: 'Fiddle leaf fig', description: 'A statement plant for a bright corner.', price: '$54', photo: ph('product-4.jpg'), tags: ['Bright light'] },
      { name: 'Calathea', description: 'Patterned leaves that fold up at night.', price: '$32', photo: ph('product-5.jpg'), tags: ['Pet-safe'] },
      { name: 'Terracotta pot set', description: 'Three terracotta pots with drainage holes.', price: '$24', photo: ph('product-6.jpg'), tags: ['Pots'] },
    ],
  },
  form: {
    title: 'Ask about a plant',
    intro: 'Looking for something specific or want to check stock? Send us a message.',
    submitLabel: 'Send message',
    fields: [
      { name: 'name', label: 'Your name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone (optional)', type: 'tel', required: false },
      { name: 'topic', label: 'What can we help with?', type: 'select', required: true, options: ['Checking stock', 'Plant recommendation', 'Repotting', 'Workshops', 'Something else'] },
      { name: 'message', label: 'Your message', type: 'textarea', required: true },
    ],
  },
  ctaBand: {
    headline: 'Not sure what will survive your apartment?',
    body: 'Tell us about your light and we will pick a plant for you.',
    cta: { label: 'Get a recommendation', href: '/contact/' },
  },
};

export default shop;
