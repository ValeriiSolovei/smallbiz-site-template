import type { PhotoEntry, SiteConfig } from '@/lib/types';
import { photoSet } from '@/lib/photos';
import photos from './photos.json';

const ph = photoSet('gym', photos as PhotoEntry[]);

const gym: SiteConfig = {
  id: 'gym',
  name: 'Ironline Athletic Club',
  tagline: 'Small-group strength and conditioning in the Junction',
  neighbourhood: 'The Junction',
  indexable: false,
  theme: {
    mode: 'dark',
    surfaceBase: '#0b0c0a',
    surfaceCard: '#151712',
    surfaceHero: '#0f1805',
    borderDefault: '#262922',
    textPrimary: '#ffffff',
    textSecondary: '#b5b8b0',
    textMuted: '#8d9187',
    accent: '#b6ff2e',
    accentHover: '#c8ff5c',
    accentDim: 'rgba(182, 255, 46, 0.14)',
    accentGlow: 'rgba(182, 255, 46, 0.30)',
    accentContrast: '#0b0c0a',
  },
  contact: {
    phone: '(416) 555-0167',
    email: 'train@ironline.example',
    addressLine: 'Dundas St W near Keele, The Junction, Toronto',
    mapBbox: [-79.485, 43.66, -79.455, 43.672],
    hours: [
      { days: 'Mon–Fri', time: '6:00 am – 10:00 pm' },
      { days: 'Sat–Sun', time: '8:00 am – 6:00 pm' },
    ],
  },
  hero: {
    eyebrow: 'Strength & conditioning · The Junction',
    headline: 'Get strong. Stay consistent. Have fun doing it.',
    subhead: 'Small-group classes, open gym and coaching that fits around real life. Your first week is free.',
    cta: { label: 'Claim a free week', href: '/contact/' },
    secondaryCta: { label: 'See the schedule', href: '/classes/' },
    photo: ph('hero.jpg'),
  },
  highlights: [
    { title: 'Small classes', body: 'Twelve people at most, so the coach actually coaches you.' },
    { title: 'All levels', body: 'Every workout scales, from first-timer to competitor.' },
    { title: 'Open early and late', body: '6 am to 10 pm on weekdays, with weekend sessions too.' },
  ],
  whyUs: {
    title: 'Why members stay',
    points: [
      'Coaches who learn your name and your goals',
      'Programming that changes every month',
      'A community that shows up for each other',
      'No long contracts, cancel any time',
    ],
  },
  reviews: [
    { quote: 'I had never lifted before. Six months later I deadlift more than my body weight.', name: 'Member since spring (sample review)' },
    { quote: 'The 6 am class is the only reason I get to work in a good mood.', name: 'Junction resident (sample review)' },
    { quote: 'Small enough that coaches notice when you skip a week, in a good way.', name: 'Roncesvalles member (sample review)' },
  ],
  about: {
    eyebrow: 'About Ironline',
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
  ctaBand: {
    headline: 'Your first week is on us',
    body: 'No pressure and no contract. Try a few classes and see if it fits.',
    cta: { label: 'Claim a free week', href: '/contact/' },
  },
};

export default gym;
