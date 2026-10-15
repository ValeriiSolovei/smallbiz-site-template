import type { PhotoEntry, SiteConfigV1 } from '@/lib/types';
import { photoSet } from '@/lib/photos';
import photos from './photos.json';

const ph = photoSet('cafe', photos as PhotoEntry[]);

const cafe: SiteConfigV1 = {
  system: 'v1',
  id: 'cafe',
  name: 'Lantern & Crumb Café',
  tagline: 'Neighbourhood café and bakery on Queen East',
  neighbourhood: 'Leslieville',
  indexable: false,
  theme: {
    mode: 'light',
    surfaceBase: '#faf6f0',
    surfaceCard: '#ffffff',
    surfaceHero: '#f1e6d8',
    borderDefault: '#e7dccd',
    textPrimary: '#2b1d14',
    textSecondary: '#5c4a3d',
    textMuted: '#7a6656',
    accent: '#6b3f26',
    accentHover: '#55311d',
    accentDim: 'rgba(107, 63, 38, 0.10)',
    accentGlow: 'rgba(107, 63, 38, 0.22)',
    accentContrast: '#ffffff',
    error: '#b42318',
  },
  contact: {
    phone: '(416) 555-0118',
    email: 'hello@lanternandcrumb.example',
    addressLine: 'Queen St E, Leslieville, Toronto',
    mapBbox: [-79.345, 43.658, -79.325, 43.668],
    hours: [
      { days: 'Mon–Fri', time: '7:30 am – 5:00 pm' },
      { days: 'Sat–Sun', time: '8:30 am – 4:00 pm' },
    ],
  },
  hero: {
    eyebrow: 'Café & bakery · Leslieville',
    headline: 'Slow coffee, warm pastries, a table by the window.',
    subhead: 'Baked fresh every morning, with coffee from small Ontario roasters.',
    cta: { label: 'See the menu', href: '/menu/' },
    secondaryCta: { label: 'Catering for your event', href: '/contact/' },
    photo: ph('hero.jpg'),
  },
  headerCta: { label: 'Catering', href: '/contact/' },
  highlights: [
    { title: 'Baked in-house', body: 'Croissants, loaves and cookies made here before we open.' },
    { title: 'Local roasters', body: 'Rotating beans from small Ontario roasters.' },
    { title: 'Room to stay', body: 'Wi-Fi, outlets and a sunny back patio.' },
  ],
  whyUs: {
    title: 'Why people keep coming back',
    points: [
      'Everything baked the same morning',
      'Dairy-free and gluten-free options every day',
      'Dog-friendly patio',
      'Catering for offices and small events',
    ],
  },
  reviews: [
    { quote: 'The cardamom bun is worth the walk from anywhere in the east end.', name: 'Leslieville regular (sample review)' },
    { quote: 'Quiet enough to work, friendly enough that they know my order.', name: 'Remote worker (sample review)' },
    { quote: 'Ordered breakfast catering for our team. Everything arrived warm and on time.', name: 'Office manager (sample review)' },
  ],
  about: {
    eyebrow: 'Our story',
    headline: 'It started with one oven and a lot of early mornings',
    story: [
      'Lantern & Crumb opened on Queen East as a tiny counter with a single oven and a handful of regulars.',
      'We still bake everything here each morning, and we still learn every regular’s name.',
    ],
    photo: ph('team.jpg'),
    values: [
      { title: 'Fresh daily', body: 'If it was not baked today, it is not on the counter.' },
      { title: 'Neighbours first', body: 'Local suppliers, local staff, local art on the walls.' },
      { title: 'Waste less', body: 'Day-old bread goes to a nearby community kitchen.' },
    ],
  },
  gallery: ['gallery-1.jpg', 'gallery-2.jpg', 'gallery-3.jpg', 'gallery-4.jpg', 'gallery-5.jpg', 'gallery-6.jpg'].map(ph),
  primary: {
    kind: 'menu',
    slug: 'menu',
    title: 'Menu',
    intro: 'Prices before tax. Ask about today’s specials and gluten-free bakes.',
    sections: [
      { name: 'Coffee', items: [
        { name: 'Espresso', price: '$3.25' },
        { name: 'Cappuccino', price: '$4.75' },
        { name: 'Oat flat white', price: '$5.25' },
        { name: 'Pour-over', description: 'Rotating single origin', price: '$5.00' },
      ] },
      { name: 'Bakery', items: [
        { name: 'Butter croissant', price: '$4.25' },
        { name: 'Cardamom bun', price: '$4.75' },
        { name: 'Sourdough toast with jam', price: '$5.00' },
        { name: 'Brown butter cookie', price: '$3.50' },
      ] },
      { name: 'Lunch', items: [
        { name: 'Roasted vegetable sandwich', description: 'Focaccia, romesco, greens', price: '$12.50' },
        { name: 'Soup of the day', description: 'With sourdough', price: '$8.00' },
        { name: 'Lantern breakfast plate', description: 'Eggs, toast, greens, house jam', price: '$14.00' },
      ] },
      { name: 'Cold drinks', items: [
        { name: 'Iced latte', price: '$5.50' },
        { name: 'House lemonade', price: '$4.50' },
        { name: 'Kombucha', price: '$5.25' },
      ] },
    ],
  },
  form: {
    title: 'Catering request',
    intro: 'Office breakfast, a birthday or a small event? Tell us what you need and we will send a quote within two days.',
    submitLabel: 'Request a catering quote',
    fields: [
      { name: 'name', label: 'Your name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone (optional)', type: 'tel', required: false },
      { name: 'eventDate', label: 'Event date', type: 'text', required: true },
      { name: 'guests', label: 'Number of guests', type: 'select', required: true, options: ['Under 15', '15–30', '30–60', 'More than 60'] },
      { name: 'details', label: 'What do you need?', type: 'textarea', required: true },
    ],
  },
  ctaBand: {
    headline: 'Hosting something?',
    body: 'We cater office breakfasts, birthdays and small events across the east end.',
    cta: { label: 'Request catering', href: '/contact/' },
  },
};

export default cafe;
