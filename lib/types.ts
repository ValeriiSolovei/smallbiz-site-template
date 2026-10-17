export type SiteId = 'trades' | 'gym' | 'cafe' | 'shop';

/** The design system a site renders with. Sites without `system` render with v1. */
export type SystemId = 'v1' | 'v2';

/** Colour tokens of the v1 design system. */
export type ThemeV1 = {
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
export type ThemeTokens = ThemeV1;

/** Colour tokens of the v2 design system: still 13 colours, every value #rrggbb. */
export type ThemeV2 = {
  mode: 'light' | 'dark';
  surfaceBase: string;
  surfaceCard: string;
  surfaceBrand: string;
  /** Opposite-mode band: ink on light sites, paper on dark ones. */
  surfaceInverse: string;
  borderDefault: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentHover: string;
  accentContrast: string;
  /** Accent used for links on base, card and brand grounds. */
  accentText: string;
  error: string;
};

export type Photo = { src: string; alt: string; caption?: string };
/** One row of sites/<id>/photos.json: a public-domain photo found through Openverse. */
export type PhotoEntry = {
  file: string;
  alt: string;
  imageUrl: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  creator: string;
  /** [x, y, width, height] in source pixels, applied before resizing. */
  crop?: [number, number, number, number];
  /** Bake the photo in black and white. */
  mono?: boolean;
  /** Output width in px; defaults to 1200 for hero/team and 800 otherwise. */
  width?: number;
  /** File size budget in bytes; defaults to 160 000. */
  maxBytes?: number;
};
export type NavItem = { label: string; href: string };
export type Card = { title: string; body: string };
/** `rating` is the stars shown on the review (1 to 5, default 5). There is no overall average: sample reviews never add up to a score. */
export type Review = { quote: string; name: string; context?: string; rating?: 1 | 2 | 3 | 4 | 5 };
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
export type Service = { name: string; description: string; tags?: string[]; time?: string };
export type ScheduleDay = { day: string; classes: { time: string; name: string; coach: string }[] };
export type Plan = { name: string; price: string; period: string; features: string[]; featured?: boolean };
export type Trainer = { name: string; specialty: string; photo: Photo };
export type Product = { name: string; description: string; price: string; photo: Photo; tags?: string[]; latin?: string };

export type PrimaryPage =
  | { kind: 'menu'; slug: 'menu'; title: string; intro: string; sections: MenuSection[] }
  | { kind: 'services'; slug: 'services'; title: string; intro: string; services: Service[]; areas: string[] }
  | { kind: 'classes'; slug: 'classes'; title: string; intro: string; schedule: ScheduleDay[]; plans: Plan[]; trainers: Trainer[] }
  | { kind: 'products'; slug: 'products'; title: string; intro: string; products: Product[] };

type Contact = { phone: string; email: string; addressLine: string; mapBbox: Bbox; hours: { days: string; time: string }[] };

export type SiteConfigV1 = {
  system?: 'v1';
  id: SiteId;
  name: string;
  tagline: string;
  neighbourhood: string;
  indexable: boolean;
  theme: ThemeV1;
  contact: Contact;
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

// ---- v2 design system ----

/** Background family of a section. Neighbouring sections never share a tone. */
export type Tone = 'base' | 'tint' | 'brand' | 'inverse' | 'accent';
/** Vertical padding step of a section. */
export type Space = 'tight' | 'regular' | 'loose';
/** A heading with an optional second voice; `voice` must be a substring of `text`. */
export type Voice = { text: string; voice?: string };
export type Stat = { value: string; unit?: string; label: string };

export type TypeSpec = {
  case: 'uppercase' | 'none';
  displayWeight: number;
  h1Weight?: number;
  tracking: string;
  leading: number;
  h1Size: string;
  voice: 'none' | 'italic' | 'weight';
  voiceWeight?: number;
};

export type Design = {
  /** 'alternate': neighbouring sections change tone. 'single': one ground, sections split by space and a hairline. */
  rhythm: 'alternate' | 'single';
  label: 'numbered' | 'tag' | 'rule' | 'italic';
  /** One committed button shape per site. */
  button: 'plate' | 'pill' | 'tab';
  /** Structural rule weight in px. */
  rule: 1 | 2;
  shadow: 'tiles' | 'none';
  footerTone: Tone;
  /** Family names the site's fonts module loads (checked by unit and e2e tests). */
  fonts: { h1: string; body: string };
  type: TypeSpec;
  /** 'infobar': four columns split by hairlines (default). 'line': wordmark, one line of address and hours. */
  footer?: 'infobar' | 'line';
  /** 'contact': square contact sheet (default). 'strip': 3-up edge to edge, one column on a phone. */
  gallery?: 'contact' | 'strip';
};

export type HomeBlock = { tone: Tone; space: Space } & (
  | { kind: 'strip'; items: { photo: Photo; caption: string }[] }
  | { kind: 'services'; title: Voice; count: number; label?: string }
  | { kind: 'workorder'; title: Voice; label?: string; body: string }
  | { kind: 'symptoms'; title: Voice; note?: string }
  | { kind: 'faq'; title: Voice }
  | { kind: 'reviews'; title: Voice; variant: 'stack' | 'overheard' }
  | { kind: 'slab'; label: string; body: string }
  /** The first `sections` sections of the menu page, on a cream card. */
  | { kind: 'menu'; title: Voice; sections: number }
  /** A short story with a drop cap beside two black-and-white snapshots of the room. */
  | { kind: 'room'; title: Voice; story: string[]; points: string[]; photos: [Photo, Photo] }
  /** Hours, address and phone; the page ends here. */
  | { kind: 'visit'; title: Voice; note: string }
);

type HeroCommon = {
  tone: Tone;
  label: string;
  headline: Voice;
  subhead: string;
  cta: NavItem;
  secondaryCta?: NavItem;
  /** Used for og:image, so it is required even when the hero shows no photo. */
  photo: Photo;
};

export type HeroV2 =
  | (HeroCommon & { variant: 'signboard' })
  | (HeroCommon & {
      /**
       * A full-width photo over a colour block that holds the H1. Each sentence of `headline` is one line,
       * set heavy, light, then in the italic voice; `label` heads today's hours beside it.
       */
      variant: 'photo-block';
      /** Where the hours apply, under them. */
      place: string;
      /** An 800 px version of `photo` for phones (the page's largest image there). */
      photoSmall: Photo;
    });

export type SiteConfigV2 = {
  system: 'v2';
  id: SiteId;
  name: string;
  tagline: string;
  neighbourhood: string;
  indexable: boolean;
  theme: ThemeV2;
  contact: Contact;
  design: Design;
  /** `voice` is a part of `main` set in the italic voice, like the "&" in a name. */
  wordmark: { main: string; sub?: string; voice?: string };
  /** Desktop strip above the header. */
  utilityBar?: { left: string; right: string };
  /** Fixed bar on phones; the primary cell is the accent one. One of the two cells must be a call. */
  callBar: { primary: NavItem; secondary?: NavItem };
  /** The primary action repeated word for word at the end of home blocks. */
  cta: { primary: NavItem; secondary?: NavItem };
  hero: HeroV2;
  headerCta?: NavItem;
  home: HomeBlock[];
  highlights: Card[];
  reviews: Review[];
  about: { label: string; headline: string; story: string[]; photo: Photo; values: Card[] };
  gallery: Photo[];
  primary: PrimaryPage;
  form: FormSpec;
  stats?: Stat[];
  symptoms?: string[];
  faq?: { q: string; a: string }[];
  workOrder?: WorkOrder;
  /** Label over the contact page title; defaults to the tagline. */
  contactLabel?: string;
  /** One line on licensing and insurance, shown in the footer and on the contact page. */
  credentials?: string;
};

/** A filled-in sample work order, shown as one paper sheet. */
export type WorkOrder = {
  number: string;
  fields: { label: string; value: string }[];
  checkedTitle: string;
  checked: string[];
  price: { label: string; amount: string; note: string };
  permits: { label: string; status: string }[];
  signoff: string;
  signatures: [string, string];
};

export type SiteConfig = SiteConfigV1 | SiteConfigV2;
