import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: string;
  featured?: boolean;
  videoIcon?: boolean;
  gridSpan?: string;
}

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  color: 'green' | 'orange' | 'blue';
}

// ── New types for the redesigned system ───────────────────

export interface Capability {
  id: string;
  icon: string;           // Lucide icon name
  title: string;
  description: string;
  href: string;
  accent: 'brand' | 'cyan';
}

export interface CaseStudy {
  id: string;
  industry: string;
  service: string;
  headline: string;
  problem: string;
  result: string;
  metrics: Array<{ label: string; value: string }>;
  slug: string;
}

export interface Stat {
  value: string;
  numericEnd: number;
  suffix: string;
  prefix?: string;
  label: string;
}