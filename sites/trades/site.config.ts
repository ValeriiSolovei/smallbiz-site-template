import type { PhotoEntry, SiteConfig } from '@/lib/types';
import { photoSet } from '@/lib/photos';
import photos from './photos.json';

const ph = photoSet('trades', photos as PhotoEntry[]);

const trades: SiteConfig = {
  id: 'trades',
  name: 'Volt Ridge Electric',
  tagline: 'Residential and small-commercial electrical work across the GTA',
  neighbourhood: 'Greater Toronto Area',
  indexable: false,
  theme: {
    mode: 'dark',
    surfaceBase: '#0e0e0e',
    surfaceCard: '#181818',
    surfaceHero: '#1c1106',
    borderDefault: '#2a2a2a',
    textPrimary: '#ffffff',
    textSecondary: '#b3b3b3',
    textMuted: '#8c8c8c',
    accent: '#ff7a1a',
    accentHover: '#ff9142',
    accentDim: 'rgba(255, 122, 26, 0.16)',
    accentGlow: 'rgba(255, 122, 26, 0.35)',
    accentContrast: '#111111',
    error: '#ff6b81',
  },
  contact: {
    phone: '(416) 555-0142',
    email: 'hello@voltridge.example',
    addressLine: 'Serving Toronto, East York, North York, Scarborough and Etobicoke',
    mapBbox: [-79.64, 43.58, -79.12, 43.86],
    hours: [
      { days: 'Mon–Fri', time: '7:00 am – 6:00 pm' },
      { days: 'Sat', time: '8:00 am – 2:00 pm' },
      { days: 'Emergencies', time: '24/7' },
    ],
  },
  hero: {
    eyebrow: 'Electrical contractors · GTA',
    headline: 'Power done right, the first time.',
    subhead: 'Panel upgrades, EV chargers, renovations and same-day repairs. Upfront quotes, tidy work, no surprises.',
    cta: { label: 'Get a free quote', href: '/contact/' },
    secondaryCta: { label: 'Emergency? Call now', href: 'tel:+14165550142' },
    photo: ph('hero.jpg'),
  },
  highlights: [
    { title: 'Upfront quotes', body: 'A clear, written price before any work starts.' },
    { title: 'Same-week scheduling', body: 'Most jobs booked within a few days, emergencies the same day.' },
    { title: 'Clean job sites', body: 'We protect your floors, clean up, and walk you through the finished work.' },
  ],
  whyUs: {
    title: 'Why homeowners call us back',
    points: [
      'Permits and inspections handled for you',
      'Warranty on parts and labour',
      'A text when we are on the way',
      'Straight answers, no upselling',
    ],
  },
  reviews: [
    { quote: 'They swapped our old panel in one day and left the basement cleaner than they found it.', name: 'Danforth homeowner (sample review)' },
    { quote: 'Clear quote, showed up on time, and the EV charger worked the same afternoon.', name: 'Etobicoke client (sample review)' },
    { quote: 'Fixed a tripping breaker on a Sunday night. Calm, quick and a fair price.', name: 'Leslieville tenant (sample review)' },
  ],
  about: {
    eyebrow: 'About us',
    headline: 'A small crew that treats your home like ours',
    story: [
      'Volt Ridge Electric started with one van and a simple rule: explain the work before doing it.',
      'Today we are a small team covering the GTA, doing everything from a single outlet to full renovation rewires.',
    ],
    photo: ph('team.jpg'),
    values: [
      { title: 'Safety first', body: 'Every job is done to code and tested before we leave.' },
      { title: 'Respect your time', body: 'Arrival windows we keep, and an update if anything changes.' },
      { title: 'Honest pricing', body: 'Written quotes and no hidden fees.' },
    ],
  },
  gallery: ['gallery-1.jpg', 'gallery-2.jpg', 'gallery-3.jpg', 'gallery-4.jpg', 'gallery-5.jpg', 'gallery-6.jpg'].map(ph),
  primary: {
    kind: 'services',
    slug: 'services',
    title: 'Services',
    intro: 'From small fixes to full rewires. Not sure what you need? Send a quote request and we will call you back.',
    services: [
      { name: 'Panel upgrades', description: 'Replace old fuse boxes and 60–100 A panels with a modern 200 A panel.', tags: ['Older homes', 'Renovations'] },
      { name: 'EV charger installation', description: 'Level 2 home chargers installed and ready to use.', tags: ['Garage', 'Driveway'] },
      { name: 'Lighting and pot lights', description: 'Indoor and outdoor lighting, dimmers and pot light layouts.', tags: ['Kitchens', 'Basements'] },
      { name: 'Renovation wiring', description: 'Rough-in and finish wiring for kitchens, basements and additions.', tags: ['Permits handled'] },
      { name: 'Troubleshooting and repairs', description: 'Tripping breakers, dead outlets and flickering lights.', tags: ['Same day'] },
      { name: 'Small commercial', description: 'Retail and office fit-outs and lighting retrofits.', tags: ['After hours'] },
    ],
    areas: ['Downtown Toronto', 'East York', 'North York', 'Scarborough', 'Etobicoke', 'York'],
  },
  form: {
    title: 'Request a free quote',
    intro: 'Tell us about the job and we will get back to you within one business day.',
    submitLabel: 'Send request',
    fields: [
      { name: 'name', label: 'Your name', type: 'text', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'jobType', label: 'Type of job', type: 'select', required: true, options: ['Panel upgrade', 'EV charger', 'Lighting', 'Renovation wiring', 'Repair or troubleshooting', 'Other'] },
      { name: 'area', label: 'Neighbourhood or city', type: 'text', required: true },
      { name: 'details', label: 'Describe the job', type: 'textarea', required: true },
    ],
  },
  ctaBand: {
    headline: 'Need it done this week?',
    body: 'Send a quote request or call us. Emergencies answered 24/7.',
    cta: { label: 'Get a free quote', href: '/contact/' },
  },
};

export default trades;
