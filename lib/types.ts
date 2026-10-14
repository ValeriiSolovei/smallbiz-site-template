export type SiteId = 'trades' | 'gym' | 'cafe' | 'shop';

export type ThemeTokens = {
  mode: 'light' | 'dark';
  surfaceBase: string;
  surfaceCard: string;
  surfaceHero: string;
  borderDefault: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentHover: string;
  accentDim: string;
  accentGlow: string;
  accentContrast: string;
  error: string;
};

export type Photo = { src: string; alt: string };
/** One row of sites/<id>/photos.json: a public-domain photo found through Openverse. */
export type PhotoEntry = {
  file: string;
  alt: string;
  imageUrl: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  creator: string;
};
export type NavItem = { label: string; href: string };
export type Card = { title: string; body: string };
export type Review = { quote: string; name: string };
export type Bbox = [minLon: number, minLat: number, maxLon: number, maxLat: number];

export type FieldSpec = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  required: boolean;
  options?: string[];
};
export type FormSpec = { title: string; intro: string; submitLabel: string; fields: FieldSpec[] };

export type MenuSection = { name: string; items: { name: string; description?: string; price: string }[] };
export type Service = { name: string; description: string; tags?: string[] };
export type ScheduleDay = { day: string; classes: { time: string; name: string; coach: string }[] };
export type Plan = { name: string; price: string; period: string; features: string[]; featured?: boolean };
export type Trainer = { name: string; specialty: string; photo: Photo };
export type Product = { name: string; description: string; price: string; photo: Photo; tags?: string[] };

export type PrimaryPage =
  | { kind: 'menu'; slug: 'menu'; title: string; intro: string; sections: MenuSection[] }
  | { kind: 'services'; slug: 'services'; title: string; intro: string; services: Service[]; areas: string[] }
  | { kind: 'classes'; slug: 'classes'; title: string; intro: string; schedule: ScheduleDay[]; plans: Plan[]; trainers: Trainer[] }
  | { kind: 'products'; slug: 'products'; title: string; intro: string; products: Product[] };

export type SiteConfig = {
  id: SiteId;
  name: string;
  tagline: string;
  neighbourhood: string;
  indexable: boolean;
  theme: ThemeTokens;
  contact: { phone: string; email: string; addressLine: string; mapBbox: Bbox; hours: { days: string; time: string }[] };
  hero: { eyebrow: string; headline: string; subhead: string; cta: NavItem; secondaryCta?: NavItem; photo: Photo };
  /** Header button; defaults to the hero's main button. Point it at /contact/. */
  headerCta?: NavItem;
  highlights: Card[];
  whyUs: { title: string; points: string[] };
  reviews: Review[];
  about: { eyebrow: string; headline: string; story: string[]; photo: Photo; values: Card[] };
  gallery: Photo[];
  primary: PrimaryPage;
  form: FormSpec;
  ctaBand: { headline: string; body: string; cta: NavItem };
};
