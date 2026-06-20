export interface ProcedureFaq {
  q: string;
  a: string;
}

export interface Procedure {
  id: string;
  problemLabel: string;
  tileImage: string;
  procedureName: string;
  whatItIs: string;
  whoItsFor: string;
  beforeImg: string;
  afterImg: string;
  costRange: string;
  recovery: string;
  faq: ProcedureFaq[];
}

export interface Doctor {
  name: string;
  creds: string;
  bio: string;
  photo: string;
}

export interface BrandTokens {
  colorAccent: string;
  colorAction: string;
  colorCanvas: string;
  colorInk: string;
  fontDisplay: string;
  fontBody: string;
  logoUrl: string;
}

export interface ClinicBrand {
  name: string;
  tagline: string;
  phone: string;
  address: string;
  mapsEmbedUrl: string;
  hours: string;
  googleReviewCount: number;
  googleRating: number;
}

export interface TrustPoint {
  icon: string;
  title: string;
  line: string;
}

export interface FaqEntry {
  q: string;
  a: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  procedure: string;
  rating: number;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ClinicConfig {
  brand: ClinicBrand;
  tokens: BrandTokens;
  stats: StatItem[];
  trust: TrustPoint[];
  doctors: Doctor[];
  procedures: Procedure[];
  testimonials: Testimonial[];
  faq: FaqEntry[];
}
