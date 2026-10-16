import type { PhotoEntry, SiteConfigV2 } from '@/lib/types';
import { photoSet } from '@/lib/photos';
import trades from '@/sites/trades/site.config';
import photos from '@/sites/trades/photos.json';

// A minimal fictional site on the v2 system, so every v2 rule is tested before a real site moves over.
// It reuses the electrician's content and photos; only the v2-specific fields are new.
const ph = photoSet('trades', photos as PhotoEntry[]);
const call = { label: 'Call (416) 555-0142', href: 'tel:+14165550142' };
const quote = { label: 'Get a written quote', href: '/contact/' };

const siteV2: SiteConfigV2 = {
  system: 'v2',
  id: 'trades',
  name: trades.name,
  tagline: trades.tagline,
  neighbourhood: trades.neighbourhood,
  indexable: false,
  theme: {
    mode: 'light',
    surfaceBase: '#edeff0',
    surfaceCard: '#d4d9dd',
    surfaceBrand: '#c3ccd4',
    surfaceInverse: '#121a24',
    borderDefault: '#a9b1b8',
    textPrimary: '#121a24',
    textSecondary: '#39424c',
    textMuted: '#4a535d',
    accent: '#ffde21',
    accentHover: '#ffe760',
    accentContrast: '#121a24',
    accentText: '#1f4a7c',
    error: '#a8231c',
  },
  contact: trades.contact,
  design: {
    rhythm: 'alternate',
    label: 'numbered',
    button: 'plate',
    rule: 2,
    shadow: 'none',
    footerTone: 'inverse',
    fonts: { h1: 'Barlow Condensed', body: 'Public Sans' },
    type: { case: 'uppercase', displayWeight: 800, tracking: '0.01em', leading: 0.9, h1Size: 'clamp(3.25rem, 1.2rem + 7.4vw, 7rem)', voice: 'none' },
  },
  wordmark: { main: 'Volt Ridge', sub: 'Electric' },
  utilityBar: { left: 'Licensed electrical contractor · Fully insured · Toronto and the GTA', right: '24/7 emergencies' },
  callBar: { primary: call },
  cta: { primary: call, secondary: quote },
  headerCta: quote,
  hero: {
    variant: 'signboard',
    tone: 'inverse',
    label: 'Licensed electrical contractor',
    headline: { text: 'Electricians. On site this week.' },
    subhead: 'Panel upgrades, EV chargers, renovation wiring and repairs across Toronto and the GTA.',
    cta: call,
    secondaryCta: quote,
    photo: ph('hero.jpg'),
  },
  stats: [
    { value: '24/7', label: 'Emergency line, a person answers' },
    { value: '1', unit: 'day', label: 'Most panel upgrades, start to finish' },
    { value: '2', unit: 'yr', label: 'Warranty on our workmanship' },
    { value: '$0', label: 'Quote visits in the GTA' },
  ],
  home: [
    {
      kind: 'strip',
      tone: 'base',
      space: 'tight',
      items: [
        { photo: ph('hero.jpg'), caption: 'Panel work' },
        { photo: ph('team.jpg'), caption: 'Meter bases' },
        { photo: ph('crew.jpg'), caption: 'Service mast' },
      ],
    },
    { kind: 'services', tone: 'tint', space: 'regular', title: { text: 'Services' }, label: 'Booked within the week', count: 4 },
    { kind: 'symptoms', tone: 'inverse', space: 'tight', title: { text: 'Sound familiar?' }, note: 'Any of these is worth a ten-minute call.' },
    { kind: 'reviews', tone: 'brand', space: 'regular', title: { text: 'From recent jobs' }, variant: 'stack' },
    { kind: 'faq', tone: 'base', space: 'tight', title: { text: 'Before you call' } },
    { kind: 'slab', tone: 'accent', space: 'loose', label: '24/7 emergency line', body: 'Weekdays 7–6 · Saturday 8–2 · Emergencies any hour' },
  ],
  highlights: trades.highlights,
  reviews: trades.reviews,
  about: trades.about,
  gallery: trades.gallery,
  primary: trades.primary,
  form: trades.form,
  symptoms: [
    'Breaker trips when the dryer and kettle run',
    'Lights dim when the fridge kicks in',
    'Two-prong outlets in an older house',
    'Planning a basement or kitchen reno',
  ],
  faq: [
    { q: 'How much will it cost?', a: 'We look first, then write the price down before any work starts.' },
    { q: 'Do you pull the permit?', a: 'Yes. We file the notification and book the inspection.' },
    { q: 'How soon can you come?', a: 'Most jobs are booked within the week.' },
    { q: 'Is the work guaranteed?', a: 'Two years on our workmanship.' },
  ],
};

export default siteV2;
