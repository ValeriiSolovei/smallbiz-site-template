import type { PhotoEntry, SiteConfigV2 } from '@/lib/types';
import { photoSet } from '@/lib/photos';
import { telHref } from '@/lib/phone';
import photos from './photos.json';

const ph = photoSet('gym', photos as PhotoEntry[]);

const phone = '(416) 555-0167';
const freeWeek = { label: 'Claim a free week', href: '/contact/' };

const gym: SiteConfigV2 = {
  system: 'v2',
  id: 'gym',
  name: 'Ironline Athletic Club',
  tagline: 'Small-group strength and conditioning in the Junction',
  neighbourhood: 'The Junction',
  indexable: false,
  theme: {
    mode: 'light',
    surfaceBase: '#f2f0eb',
    surfaceCard: '#dcd7cc',
    surfaceBrand: '#d8cfc2',
    surfaceInverse: '#1b1916',
    borderDefault: '#c4bcae',
    textPrimary: '#1b1916',
    textSecondary: '#45413a',
    textMuted: '#524d46',
    accent: '#e8784a',
    accentHover: '#ef8d63',
    accentContrast: '#1b1916',
    accentText: '#8f3517',
    error: '#a3122a',
  },
  design: {
    rhythm: 'alternate',
    label: 'tag',
    button: 'pill',
    rule: 1,
    shadow: 'none',
    footerTone: 'brand',
    fonts: { h1: 'Rokkitt', body: 'Hanken Grotesk' },
    type: { case: 'none', displayWeight: 700, h1Weight: 300, tracking: '-0.01em', leading: 1.0, h1Size: 'clamp(2.75rem, 1.4rem + 5.8vw, 6rem)', voice: 'weight' },
    footer: 'line',
    gallery: 'mosaic',
  },
  wordmark: { main: 'Ironline', sub: 'Athletic Club' },
  callBar: { primary: { label: 'Free week', href: '/contact/' }, secondary: { label: 'Call', href: telHref(phone) } },
  cta: { primary: freeWeek, secondary: { label: `Call ${phone}`, href: telHref(phone) } },
  headerCta: { label: 'Free week', href: '/contact/' },
  contactLabel: 'First week free, no contract',
  contact: {
    phone,
    email: 'train@ironline.example',
    addressLine: 'Dundas St W near Keele, The Junction, Toronto',
    mapBbox: [-79.485, 43.66, -79.455, 43.672],
    hours: [
      { days: 'Mon–Fri', time: '6:00 am – 10:00 pm' },
      { days: 'Sat–Sun', time: '8:00 am – 6:00 pm' },
    ],
  },
  hero: {
    variant: 'split',
    tone: 'base',
    label: 'Mon–Fri 6 am–10 pm',
    headline: { text: 'Twelve to a class. First week free.', voice: 'First week free.' },
    subhead: 'Small-group strength and conditioning off Dundas West. Every workout scales, from first-timer to competitor.',
    cta: freeWeek,
    secondaryCta: { label: 'See this week’s classes', href: '/classes/' },
    photo: ph('hero.jpg'),
    photoSmall: ph('hero-sm.jpg'),
  },
  home: [
    { kind: 'week', tone: 'inverse', space: 'regular', title: { text: 'This week' }, more: { label: 'Full schedule & membership', href: '/classes/' } },
    {
      kind: 'coaches',
      tone: 'base',
      space: 'regular',
      title: { text: 'Coaches who learn your name', voice: 'learn your name' },
      points: ['Twelve to a class', 'Every workout scales', 'Open 6 am to 10 pm', 'No contract'],
    },
    { kind: 'reviews', tone: 'tint', space: 'tight', title: { text: 'From the 6 am class' }, variant: 'wall' },
    { kind: 'plans', tone: 'inverse', space: 'loose', title: { text: 'Membership' }, note: 'First week free for new members. No contract. Cancel any time.' },
  ],
  highlights: [
    { title: 'Twelve to a class', body: 'Small enough that the coach actually coaches you.' },
    { title: 'Every workout scales', body: 'First-timers and competitors train in the same class.' },
    { title: 'Open 6 am to 10 pm', body: 'On weekdays, with sessions on weekends too.' },
    { title: 'No contract', body: 'Month to month. Cancel any time.' },
  ],
  reviews: [
    { quote: 'I had never lifted before. Six months later I deadlift more than my body weight.', name: 'Member since spring (sample review)', context: '6 am class' },
    { quote: 'Small enough that the coach notices when you skip a week, in a good way.', name: 'Roncesvalles member (sample review)', context: 'Evening class' },
  ],
  about: {
    label: 'About Ironline',
    headline: 'A neighbourhood gym, not a factory',
    story: [
      'Ironline opened in a former print shop off Dundas West with one goal: make strength training feel welcoming.',
      'Our coaches keep classes small, track your progress, and adjust workouts so you keep showing up.',
    ],
    photo: ph('team.jpg'),
    values: [
      { title: 'Show up', body: 'Consistency beats intensity. We help you build the habit.' },
      { title: 'Lift each other', body: 'Members cheer the last finisher louder than the first.' },
      { title: 'Progress over perfection', body: 'Small wins every week add up to big changes.' },
    ],
  },
  gallery: ['gallery-1.jpg', 'gallery-2.jpg', 'gallery-3.jpg', 'gallery-4.jpg', 'gallery-5.jpg', 'gallery-6.jpg'].map(ph),
  primary: {
    kind: 'classes',
    slug: 'classes',
    title: 'Classes & membership',
    intro: 'Pick a few classes a week, or come in for open gym. Every class scales to your level.',
    schedule: [
      { day: 'Monday', classes: [
        { time: '6:00 am', name: 'Strength Foundations', coach: 'Maya' },
        { time: '12:15 pm', name: 'Lunch Express', coach: 'Dev' },
        { time: '6:30 pm', name: 'Conditioning', coach: 'Sam' },
      ] },
      { day: 'Tuesday', classes: [
        { time: '6:00 am', name: 'Conditioning', coach: 'Sam' },
        { time: '6:30 pm', name: 'Barbell Club', coach: 'Maya' },
      ] },
      { day: 'Wednesday', classes: [
        { time: '6:00 am', name: 'Strength Foundations', coach: 'Maya' },
        { time: '12:15 pm', name: 'Lunch Express', coach: 'Dev' },
        { time: '6:30 pm', name: 'Mobility & Core', coach: 'Dev' },
      ] },
      { day: 'Thursday', classes: [
        { time: '6:00 am', name: 'Conditioning', coach: 'Sam' },
        { time: '6:30 pm', name: 'Barbell Club', coach: 'Maya' },
      ] },
      { day: 'Saturday', classes: [
        { time: '9:00 am', name: 'Team Workout', coach: 'Sam' },
        { time: '10:30 am', name: 'Beginner Intro', coach: 'Dev' },
      ] },
    ],
    plans: [
      { name: 'Drop-in', price: '$25', period: 'per class', features: ['Any class', 'No commitment'] },
      { name: 'Unlimited', price: '$149', period: 'per month', features: ['All classes', 'Open gym', 'Monthly progress check-in'], featured: true },
      { name: '10-class pack', price: '$190', period: 'valid 3 months', features: ['Use any time', 'Share with a friend'] },
    ],
    trainers: [
      { name: 'Maya Chen', specialty: 'Strength and mobility', photo: ph('trainer-1.jpg') },
      { name: 'Dev Patel', specialty: 'Conditioning and nutrition basics', photo: ph('trainer-2.jpg') },
      { name: 'Sam Okafor', specialty: 'Beginners and technique', photo: ph('trainer-3.jpg') },
    ],
  },
  form: {
    title: 'Claim your free week',
    intro: 'Tell us a bit about you and we will set up your first class.',
    submitLabel: 'Request free week',
    fields: [
      { name: 'name', label: 'Your name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone (optional)', type: 'tel', required: false },
      { name: 'experience', label: 'Training experience', type: 'select', required: true, options: ['New to training', 'Some experience', 'Experienced'] },
      { name: 'preferredTime', label: 'Best time for you', type: 'select', required: true, options: ['Mornings', 'Lunch', 'Evenings', 'Weekends'] },
      { name: 'goal', label: 'Your main goal (optional)', type: 'textarea', required: false },
    ],
  },
};

export default gym;
