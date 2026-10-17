import type { PhotoEntry, SiteConfigV2 } from '@/lib/types';
import { photoSet } from '@/lib/photos';
import { telHref } from '@/lib/phone';
import photos from './photos.json';

const ph = photoSet('cafe', photos as PhotoEntry[]);

const phone = '(416) 555-0118';
const menu = { label: 'See the menu', href: '/menu/' };
const call = { label: 'Call', href: telHref(phone) };

const cafe: SiteConfigV2 = {
  system: 'v2',
  id: 'cafe',
  name: 'Lantern & Crumb Café',
  tagline: 'Neighbourhood café and bakery on Queen East',
  neighbourhood: 'Leslieville',
  indexable: false,
  theme: {
    mode: 'dark',
    surfaceBase: '#1e1510',
    surfaceCard: '#291e17',
    surfaceBrand: '#4a2a1d',
    surfaceInverse: '#f2e7d5',
    borderDefault: '#3e2f24',
    textPrimary: '#f2e7d5',
    textSecondary: '#d2c0a8',
    textMuted: '#ad9a83',
    accent: '#8fb2ea',
    accentHover: '#a9c4f0',
    accentContrast: '#1e1510',
    accentText: '#9dbcef',
    error: '#ff9a8a',
  },
  design: {
    rhythm: 'single',
    label: 'rule',
    button: 'tab',
    rule: 1,
    shadow: 'none',
    footerTone: 'base',
    fonts: { h1: 'Libre Franklin', body: 'Libre Franklin' },
    type: { case: 'none', displayWeight: 500, tracking: '-0.015em', leading: 1.02, h1Size: 'clamp(2.125rem, 1rem + 5vw, 5rem)', voice: 'none' },
    footer: 'line',
    gallery: 'strip',
  },
  wordmark: { main: 'Lantern & Crumb', sub: 'Café · Bakery', voice: '&' },
  callBar: { primary: menu, secondary: call },
  cta: { primary: menu, secondary: { label: `Call ${phone}`, href: telHref(phone) } },
  headerCta: { label: 'Catering', href: '/contact/' },
  contactLabel: 'Catering across the east end',
  contact: {
    phone,
    email: 'hello@lanternandcrumb.example',
    addressLine: 'Queen St E, Leslieville, Toronto',
    mapBbox: [-79.345, 43.658, -79.325, 43.668],
    hours: [
      { days: 'Mon–Fri', time: '7:30 am – 5:00 pm' },
      { days: 'Sat–Sun', time: '8:30 am – 4:00 pm' },
    ],
  },
  hero: {
    variant: 'photo-block',
    tone: 'accent',
    label: 'Today',
    headline: { text: 'Oven on at 6. Doors open 7:30. on Queen East', voice: 'on Queen East' },
    subhead: 'Neighbourhood café and bakery in Leslieville. Baked here every morning, with coffee from small Ontario roasters.',
    place: 'Queen St E, Leslieville',
    cta: menu,
    photo: ph('hero.jpg'),
    photoSmall: ph('hero-sm.jpg'),
  },
  home: [
    { kind: 'menu', tone: 'base', space: 'regular', title: { text: 'From the counter' }, sections: 2 },
    {
      kind: 'room',
      tone: 'base',
      space: 'loose',
      title: { text: 'Room for a long coffee' },
      story: [
        'We opened on Queen East with one oven and six stools at the counter. The stools are still there; the oven has company now.',
        'Bring a book, bring the laptop, bring the dog to the patio. Nobody hurries you out.',
      ],
      points: ['Wi-Fi and an outlet at every table', 'Sunny back patio, dogs welcome'],
      photos: [ph('room-1.jpg'), ph('room-2.jpg')],
    },
    { kind: 'reviews', tone: 'base', space: 'regular', title: { text: 'Overheard at the counter' }, variant: 'overheard' },
    { kind: 'visit', tone: 'base', space: 'tight', title: { text: 'Visit' }, note: 'Catering for 10 to 60 people: ask at the counter or call.' },
  ],
  highlights: [
    { title: 'Baked in-house', body: 'Croissants, loaves and cookies made here before we open.' },
    { title: 'Local roasters', body: 'Rotating beans from small Ontario roasters.' },
    { title: 'Room to stay', body: 'Wi-Fi, outlets and a sunny back patio.' },
  ],
  reviews: [
    { quote: 'The cardamom bun is worth the walk from anywhere in the east end.', name: 'Leslieville regular (sample review)', context: 'Weekday mornings' },
    { quote: 'Quiet enough to work, friendly enough that they know my order.', name: 'Remote worker (sample review)', context: 'Most afternoons' },
    { quote: 'Breakfast catering for twenty arrived warm and on time.', name: 'Office manager (sample review)', context: 'Catering' },
    { quote: 'Best patio on Queen East for a dog and a flat white.', name: 'Dog owner (sample review)', context: 'Weekends', rating: 4 },
  ],
  about: {
    label: 'Our story',
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
};

export default cafe;
