import type { PhotoEntry, SiteConfigV2 } from '@/lib/types';
import { photoSet } from '@/lib/photos';
import { telHref } from '@/lib/phone';
import photos from './photos.json';

const ph = photoSet('trades', photos as PhotoEntry[]);

const phone = '(416) 555-0142';
const call = { label: `Call ${phone}`, href: telHref(phone) };
const quote = { label: 'Get a free written quote', href: '/contact/' };
const licence = 'Licensed electrical contractor, ECRA/ESA · Licence # DEMO';
const areas = ['Toronto', 'East York', 'North York', 'Scarborough', 'Etobicoke', 'Mississauga', 'Vaughan', 'Markham'];

const trades: SiteConfigV2 = {
  system: 'v2',
  id: 'trades',
  name: 'Volt Ridge Electric',
  tagline: 'Residential and small-commercial electrical work across the GTA',
  neighbourhood: 'Greater Toronto Area',
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
  design: {
    rhythm: 'alternate',
    label: 'numbered',
    button: 'plate',
    rule: 2,
    shadow: 'none',
    footerTone: 'inverse',
    fonts: { h1: 'Barlow Condensed', body: 'Public Sans' },
    type: { case: 'uppercase', displayWeight: 800, tracking: '0.01em', leading: 0.9, h1Size: 'clamp(3.25rem, 1.2rem + 8.6vw, 9rem)', voice: 'none' },
  },
  wordmark: { main: 'Volt Ridge', sub: 'Electric' },
  utilityBar: { left: 'Fully insured · Free written quotes · Toronto, Mississauga, Vaughan and Markham', right: '24/7 emergencies' },
  callBar: { primary: call },
  cta: { primary: call, secondary: quote },
  headerCta: quote,
  credentials: `${licence}. Fully insured.`,
  contact: {
    phone,
    email: 'hello@voltridge.example',
    addressLine: `Serving ${areas.slice(0, -1).join(', ')} and ${areas[areas.length - 1]}`,
    mapBbox: [-79.78, 43.55, -79.17, 43.92],
    hours: [
      { days: 'Mon–Fri', time: '7:00 am – 6:00 pm' },
      { days: 'Sat', time: '8:00 am – 2:00 pm' },
      { days: 'Emergencies', time: '24/7' },
    ],
  },
  hero: {
    variant: 'signboard',
    tone: 'inverse',
    label: licence,
    headline: { text: 'Electricians. On site this week.' },
    subhead: 'Panel upgrades, EV chargers, renovation wiring and repairs across Toronto, Mississauga, Vaughan and Markham.',
    cta: call,
    secondaryCta: quote,
    photo: ph('hero.jpg'),
  },
  stats: [
    { value: '24/7', label: 'Emergency line, a person answers' },
    { value: '1', unit: 'day', label: 'Most panel upgrades, start to finish' },
    { value: '2', unit: 'yr', label: 'Warranty on our workmanship' },
    { value: '2', unit: 'hr', label: 'Arrival windows we keep' },
  ],
  home: [
    {
      kind: 'strip',
      tone: 'base',
      space: 'tight',
      items: [
        { photo: ph('hero.jpg'), caption: 'Meter base and panel work' },
        { photo: ph('ev.jpg'), caption: 'EV charger on a post' },
        { photo: ph('lights.jpg'), caption: 'Pot lights and pendants' },
      ],
    },
    { kind: 'services', tone: 'tint', space: 'regular', title: { text: 'Services' }, count: 4 },
    {
      kind: 'workorder',
      tone: 'inverse',
      space: 'regular',
      label: 'Before any work starts',
      title: { text: 'You see the price before we start.' },
      body: 'Every job starts on a written work order. The price on it is the price you pay, unless you sign for a change.',
    },
    { kind: 'symptoms', tone: 'base', space: 'tight', title: { text: 'Sound familiar?' }, note: "Any of these is worth a ten-minute call. We'll tell you straight if it can wait." },
    { kind: 'reviews', tone: 'brand', space: 'regular', title: { text: 'From recent jobs' }, variant: 'stack' },
    { kind: 'faq', tone: 'base', space: 'tight', title: { text: 'Before you call' } },
    { kind: 'slab', tone: 'accent', space: 'loose', label: '24/7 emergency line', body: 'Weekdays 7–6 · Saturday 8–2 · Emergencies any hour' },
  ],
  highlights: [
    { title: 'Upfront quotes', body: 'A clear, written price before any work starts.' },
    { title: 'Same-week scheduling', body: 'Most jobs booked within a few days, emergencies the same day.' },
    { title: 'Clean job sites', body: 'We protect your floors, clean up, and walk you through the finished work.' },
  ],
  workOrder: {
    number: 'Sample · No. 0142',
    fields: [
      { label: 'Customer', value: 'Danforth homeowner (sample)' },
      { label: 'Address', value: 'Danforth Ave, Toronto' },
      { label: 'Job', value: 'Replace a 100 A fuse panel and meter base with a 200 A breaker panel' },
      { label: 'Visit', value: 'Tuesday, 8–10 am window' },
    ],
    checkedTitle: 'What we checked',
    checked: [
      'Service entrance and meter base',
      'Grounding and bonding',
      'Every circuit traced and labelled',
      'No aluminum or knob-and-tube wiring found',
      'Smoke and CO alarms tested',
    ],
    price: {
      label: 'Price, written before work',
      amount: '$4,600 + HST',
      note: 'Includes the panel, breakers, meter base, the Toronto Hydro disconnect and reconnect, the permit and the ESA inspection.',
    },
    permits: [
      { label: 'ESA notification', status: 'Filed' },
      { label: 'Inspection', status: 'Booked' },
    ],
    signoff: 'The price changes only with your signature.',
    signatures: ['Customer', 'Electrician'],
  },
  symptoms: [
    'Breaker trips when the dryer and kettle run',
    'Lights dim when the fridge kicks in',
    'Two-prong outlets in an older house',
    'Insurance asked about your panel or wiring',
    'Planning a basement or kitchen reno',
    'Getting an EV this year',
  ],
  faq: [
    { q: 'How much will it cost?', a: "We look first, then write the price on the work order. It doesn't change unless you sign off on the change." },
    { q: 'Do you pull the permit?', a: 'Yes. We file with the Electrical Safety Authority and book the inspection.' },
    { q: 'How soon can you come?', a: 'Most jobs are booked within the week. Emergencies get a person on the phone any hour.' },
    { q: 'Will you need to open walls?', a: 'Sometimes, for rewires. We show you where before we start and patch the access holes.' },
    { q: 'Can you install a charger for any EV?', a: 'Yes, Level 2 chargers for any make. We check your panel can carry it first.' },
    { q: 'Is the work guaranteed?', a: "Two years on our workmanship, plus the maker's warranty on parts." },
  ],
  reviews: [
    { quote: 'They swapped our old panel in one day and left the basement cleaner than they found it.', name: 'Danforth homeowner (sample review)', context: 'Panel upgrade · Danforth' },
    { quote: 'Clear quote, showed up on time, and the EV charger worked the same afternoon.', name: 'Etobicoke client (sample review)', context: 'EV charger · Etobicoke' },
    { quote: 'Fixed a tripping breaker on a Sunday night. Calm, quick and a fair price.', name: 'Leslieville tenant (sample review)', context: 'Breaker repair · Leslieville' },
  ],
  about: {
    label: 'Started with one van',
    headline: 'Four electricians. Two vans. One written price.',
    story: [
      'Volt Ridge Electric started with one van and a simple rule: explain the work before doing it.',
      'Today we are four licensed electricians with two vans, covering Toronto, Mississauga, Vaughan and Markham, from a single outlet to full renovation rewires.',
    ],
    photo: ph('team.jpg'),
    values: [
      { title: 'Every circuit tested', body: 'We test every circuit we touch and write the readings on your work order.' },
      { title: 'Two-hour arrival window', body: 'You get a two-hour window, and a text if we are running late.' },
      { title: 'The price on the sheet', body: 'The price on the work order is the price you pay. Changes need your signature.' },
    ],
  },
  gallery: [
    { ...ph('panel.jpg'), caption: 'Panel wiring · East York' },
    { ...ph('ev.jpg'), caption: 'EV charger · Etobicoke' },
    { ...ph('lights.jpg'), caption: 'Pot lights · North York' },
    { ...ph('hero.jpg'), caption: 'Meter base · Danforth' },
    { ...ph('crew.jpg'), caption: 'Service mast · Scarborough' },
    { ...ph('team.jpg'), caption: 'Outlet install · Mississauga' },
  ],
  primary: {
    kind: 'services',
    slug: 'services',
    title: 'Services',
    intro: 'From small fixes to full rewires. Not sure what you need? Ask for a free written quote and we will call you back.',
    services: [
      { name: 'Panel upgrades', description: 'Replace old fuse boxes and 60–100 A panels with a modern 200 A panel.', tags: ['Older homes', 'Renovations'], time: 'Usually 1 day' },
      { name: 'EV charger installation', description: 'Level 2 home chargers installed and ready to use.', tags: ['Garage', 'Driveway'], time: 'Usually half a day' },
      { name: 'Lighting and pot lights', description: 'Indoor and outdoor lighting, dimmers and pot light layouts.', tags: ['Kitchens', 'Basements'], time: 'Usually 1 day' },
      { name: 'Renovation wiring', description: 'Rough-in and finish wiring for kitchens, basements and additions.', tags: ['Permits handled'], time: 'Two visits, weeks apart' },
      { name: 'Troubleshooting and repairs', description: 'Tripping breakers, dead outlets and flickering lights.', tags: ['Breakers', 'Outlets', 'Lighting'], time: 'Often same day' },
      { name: 'Small commercial', description: 'Retail and office fit-outs and lighting retrofits.', tags: ['Retail', 'Offices'], time: 'Evenings and weekends' },
    ],
    areas,
  },
  form: {
    title: 'Get a free written quote',
    intro: 'Tell us about the job and we will get back to you within one business day.',
    submitLabel: 'Send request',
    fields: [
      { name: 'name', label: 'Your name', type: 'text', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', required: true },
      { name: 'email', label: 'Email (optional)', type: 'email', required: false },
      { name: 'jobType', label: 'Type of job', type: 'select', required: true, options: ['Panel upgrade', 'EV charger', 'Lighting', 'Renovation wiring', 'Repair or troubleshooting', 'Other'] },
      { name: 'area', label: 'Neighbourhood or city', type: 'text', required: true },
      { name: 'details', label: 'Describe the job', type: 'textarea', required: true },
    ],
  },
};

export default trades;
