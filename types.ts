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
  gridSpan?: string; // Tailwind class for grid span
}

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  color: 'green' | 'orange' | 'blue';
}