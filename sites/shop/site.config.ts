import type { PhotoEntry, SiteConfigV2 } from '@/lib/types';
import { photoSet } from '@/lib/photos';
import { telHref } from '@/lib/phone';
import photos from './photos.json';

const ph = photoSet('shop', photos as PhotoEntry[]);

const phone = '(416) 555-0183';
const browse = { label: 'Browse plants', href: '/products/' };
const ask = { label: 'Ask about a plant', href: '/contact/' };

const shop: SiteConfigV2 = {
  system: 'v2',
  id: 'shop',
  name: 'Mossbank Plant Co.',
  tagline: 'Houseplants and pots on Ossington',
  neighbourhood: 'Ossington',
  indexable: false,
  theme: {
    mode: 'light',
    surfaceBase: '#eef1e9',
    surfaceCard: '#d3dcca',
    surfaceBrand: '#c4d4bd',
    surfaceInverse: '#16281e',
    borderDefault: '#aebba5',
    textPrimary: '#16281e',
    textSecondary: '#354a3c',
    textMuted: '#46594c',
    accent: '#f4a3b8',
    accentHover: '#f7b8c8',
    accentContrast: '#16281e',
    accentText: '#2b5c3f',
    error: '#9f2019',
  },
  design: {
    rhythm: 'alternate',
    label: 'italic',
    button: 'pill',
    rule: 1,
    shadow: 'tiles',
    footerTone: 'tint',
    fonts: { h1: 'Newsreader', body: 'Newsreader' },
    type: { case: 'none', displayWeight: 300, tracking: '-0.025em', leading: 1.04, h1Size: 'clamp(2.75rem, 1.4rem + 4.6vw, 5.25rem)', voice: 'italic', voiceWeight: 300 },
    footer: 'line',
    gallery: 'shelf',
  },
  wordmark: { main: 'Mossbank', sub: 'Plant Co.' },
  callBar: { primary: ask, secondary: { label: 'Call', href: telHref(phone) } },
  cta: { primary: browse, secondary: ask },
  headerCta: ask,
  contactLabel: 'Send us a photo of your window',
  contact: {
    phone,
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
    variant: 'specimen',
    tone: 'base',
    label: 'Plant shop on Ossington Ave',
    headline: { text: 'Plants for the light you actually have.', voice: 'you actually have.' },
    subhead: 'Houseplants, pots and care advice from people who keep plants alive in Toronto apartments.',
    cta: browse,
    secondaryCta: ask,
    photo: ph('hero.jpg'),
    photoSmall: ph('hero-sm.jpg'),
    chip: { latin: 'Monstera deliciosa', light: 'bright-indirect' },
  },
  home: [
    { kind: 'products', tone: 'brand', space: 'regular', title: { text: 'On the shelf this week' }, count: 4 },
    { kind: 'reviews', tone: 'base', space: 'tight', title: { text: 'Customer notes' }, variant: 'tiles' },
    { kind: 'light', tone: 'inverse', space: 'loose', title: { text: 'What’s your light?', voice: 'light?' }, note: 'Send us a photo of your window.' },
  ],
  lightGuide: [
    {
      light: 'low',
      name: 'Low',
      where: 'A north window, or 2–3 m back from any window.',
      plants: [
        { latin: 'Zamioculcas zamiifolia', common: 'ZZ plant' },
        { latin: 'Sansevieria trifasciata', common: 'snake plant' },
        { latin: 'Epipremnum aureum', common: 'pothos' },
      ],
      care: 'Water every 3 weeks.',
    },
    {
      light: 'medium',
      name: 'Medium',
      where: 'An east window, or a metre back from a south or west one.',
      plants: [
        { latin: 'Philodendron hederaceum', common: 'heartleaf philodendron' },
        { latin: 'Peperomia obtusifolia', common: 'baby rubber plant' },
        { latin: 'Calathea orbifolia', common: 'calathea' },
      ],
      care: 'Water when the top 2 cm of soil is dry.',
    },
    {
      light: 'bright',
      name: 'Bright',
      where: 'Right at a south or west window, with some direct sun.',
      plants: [
        { latin: 'Ficus elastica', common: 'rubber plant' },
        { latin: 'Strelitzia nicolai', common: 'bird of paradise' },
        { latin: 'Echeveria', common: 'echeveria' },
      ],
      care: 'Water when the soil is dry most of the way down.',
    },
  ],
  highlights: [
    { title: 'Matched to your light', body: 'Tell us about your window and we will suggest plants that will thrive.' },
    { title: 'Pots and soil on site', body: 'Pick a pot and we repot your plant while you wait.' },
    { title: 'Care advice for life', body: 'Send us a photo any time your plant looks unhappy.' },
  ],
  reviews: [
    { quote: 'They asked about my apartment before selling me anything. Everything I bought is still alive.', name: 'Trinity Bellwoods neighbour (sample review)', context: 'North-facing condo' },
    { quote: 'Best pot selection in the west end, and they repotted my monstera on the spot.', name: 'Ossington regular (sample review)', context: 'Repotting' },
    { quote: 'The propagation workshop was the most fun Saturday I have had in months.', name: 'Workshop guest (sample review)', context: 'Saturday workshop' },
  ],
  about: {
    label: 'About the shop',
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
    title: 'On the shelf',
    intro: 'A few favourites in store right now. Stock changes weekly, so send us a message to check availability.',
    products: [
      { name: 'Snake plant', latin: 'Sansevieria trifasciata', light: 'low', description: 'Handles low light and forgetful watering.', price: '$26', photo: ph('product-2.jpg') },
      { name: 'ZZ plant', latin: 'Zamioculcas zamiifolia', light: 'low', description: 'Glossy leaves that shrug off low light and missed waterings.', price: '$28', photo: ph('product-3.jpg') },
      { name: 'Fiddle leaf fig', latin: 'Ficus lyrata', light: 'bright', description: 'A statement plant for a bright corner.', price: '$54', photo: ph('product-4.jpg') },
      { name: 'Calathea', latin: 'Calathea zebrina', light: 'medium', description: 'Patterned leaves that fold up at night.', price: '$32', photo: ph('product-5.jpg') },
      { name: 'Monstera', latin: 'Monstera deliciosa', light: 'bright-indirect', description: 'Big split leaves, bright indirect light.', price: '$38', photo: ph('product-1.jpg') },
      { name: 'Terracotta pot set', description: 'Three terracotta pots with drainage holes.', price: '$24', photo: ph('product-6.jpg') },
    ],
  },
  form: {
    title: 'Ask about a plant',
    intro: 'Looking for something specific or want to check stock? Send us a message, with a photo of your window if you like.',
    submitLabel: 'Send message',
    fields: [
      { name: 'name', label: 'Your name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone (optional)', type: 'tel', required: false },
      { name: 'topic', label: 'What can we help with?', type: 'select', required: true, options: ['Checking stock', 'Plant recommendation', 'Repotting', 'Workshops', 'Something else'] },
      { name: 'message', label: 'Your message', type: 'textarea', required: true },
    ],
  },
};

export default shop;
