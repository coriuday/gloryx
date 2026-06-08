import { ServiceItem, NavItem, FeatureItem } from './types';
import { Zap, BarChart3, ShieldCheck, Layers } from 'lucide-react';

// ── Navigation (Games removed from public nav) ─────────────
export const NAV_ITEMS: NavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'Studio', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

// ── Legacy SERVICES array (kept for backward compat) ────────
export const SERVICES: ServiceItem[] = [
  {
    id: '0',
    title: 'AI Systems & Automation',
    description: 'Custom AI pipelines, intelligent agents, and model integrations built for real business outcomes.',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
    featured: true,
    gridSpan: 'md:col-span-2',
  },
  {
    id: '1',
    title: 'SaaS Development',
    description: 'Full-stack web platforms engineered for scale, performance, and user delight.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    gridSpan: 'md:col-span-1',
  },
  {
    id: '2',
    title: 'CRM Automation',
    description: 'Intelligent lead workflows, WhatsApp automation, and CRM integrations that run 24/7.',
    imageUrl: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=2070&auto=format&fit=crop',
    gridSpan: 'md:col-span-1',
  },
  {
    id: '3',
    title: 'Growth Engineering',
    description: 'Data-driven SEO, paid acquisition systems, and conversion optimisation at every funnel stage.',
    imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop',
    gridSpan: 'md:col-span-1',
  },
  {
    id: '4',
    title: 'Enterprise Dashboards',
    description: 'Real-time analytics platforms and internal tooling for data-driven decision making.',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
    gridSpan: 'md:col-span-1',
  },
  {
    id: '5',
    title: 'Infrastructure & DevOps',
    description: 'Scalable cloud architecture, CI/CD pipelines, and API gateway engineering at enterprise grade.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    videoIcon: true,
    gridSpan: 'md:col-span-1',
  },
];

// ── Features/Pillars (legacy) ───────────────────────────────
export const FEATURES: FeatureItem[] = [
  { icon: Zap,        title: 'AI-Powered',          color: 'blue' },
  { icon: BarChart3,  title: 'Performance Optimised',color: 'green' },
  { icon: ShieldCheck,title: 'Security-First',       color: 'orange' },
  { icon: Layers,     title: 'Built to Scale',       color: 'blue' },
];