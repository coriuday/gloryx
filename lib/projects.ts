/**
 * BinaryScouts — Project Data Store
 *
 * Single source of truth for all portfolio/case study projects.
 * Admin UI writes to this structure; all showcase components read from it.
 *
 * To add a project: add an entry to PROJECTS below and set featured:true
 * if you want it shown on the homepage CaseStudiesSection.
 */

export type ProjectStatus = 'live' | 'in-progress' | 'coming-soon';

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  status: ProjectStatus;
  /** One-liner emotional narrative */
  hook: string;
  /** Full teaser paragraph */
  description: string;
  /** Long-form case study — problem, solution, results */
  caseStudy?: {
    problem: string;
    solution: string;
    results: string;
  };
  techStack: string[];
  tags: string[];
  metrics: ProjectMetric[];
  liveUrl?: string;
  githubUrl?: string;
  /** Paths relative to /public, or absolute URLs */
  images: string[];
  /** CSS gradient string for card accent */
  gradient: string;
  /** Whether to show on the homepage */
  featured: boolean;
  /** Sort order — lower is higher priority */
  order: number;
}

/* ─── Seeded Projects ──────────────────────────────────────── */
export const PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'ai-lead-pipeline',
    title: 'AI Lead Response Pipeline',
    category: 'AI Automation',
    status: 'live',
    hook: 'How we cut lead response time from hours to 45 seconds',
    description:
      'A SaaS startup was losing deals to faster competitors. We rebuilt their entire lead pipeline around AI — turning a manual 4-hour process into a 45-second automated system that qualifies, scores, and responds to leads instantly.',
    caseStudy: {
      problem:
        'The client\'s sales team was manually reviewing every inbound lead and crafting individual responses. With hundreds of leads weekly, response time averaged 4+ hours — and by then, competitors had already engaged.',
      solution:
        'We designed a multi-stage AI pipeline: (1) instant lead scoring via GPT-4 with custom qualification criteria, (2) automated personalized outreach via their CRM, (3) real-time Slack alerts with lead summaries for the human follow-up queue. The entire system was built on n8n + Supabase + OpenAI.',
      results:
        'Response time dropped from 4+ hours to under 45 seconds. Lead qualification accuracy exceeded manual review by 18%. The sales team now only touches pre-qualified, pre-warmed leads.',
    },
    techStack: ['GPT-4', 'n8n', 'Supabase', 'Next.js', 'Slack API', 'HubSpot'],
    tags: ['AI Systems', 'CRM', 'Automation'],
    metrics: [
      { value: '410%', label: 'ROI' },
      { value: '−91%', label: 'Response time' },
      { value: '3×', label: 'Close rate' },
    ],
    images: [],
    gradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
    featured: true,
    order: 1,
  },
  {
    id: '2',
    slug: 'enterprise-intelligence-dashboard',
    title: 'Enterprise Intelligence Dashboard',
    category: 'Enterprise Dashboard',
    status: 'live',
    hook: 'How we turned 6 disconnected databases into one intelligence layer',
    description:
      'A financial services firm was making decisions based on week-old CSV exports from 6 different systems. We unified their data infrastructure and gave their leadership team a real-time intelligence dashboard.',
    caseStudy: {
      problem:
        'Leadership was pulling data manually from 6 platforms — each with its own export format, schema, and update frequency. By the time data was consolidated, it was already stale. Critical decisions were made on outdated information.',
      solution:
        'Built a unified ETL pipeline that ingests from all 6 sources in real-time using PostgreSQL + Prisma. Designed a Next.js dashboard with live WebSocket updates, drill-down capabilities, and automated weekly executive digests via email.',
      results:
        'Eliminated 40+ hours per month of manual data work. Leadership now makes decisions on data that is under 60 seconds old. The automated digest replaced a 3-person weekly reporting cycle.',
    },
    techStack: ['Next.js', 'PostgreSQL', 'Prisma', 'WebSockets', 'Recharts', 'AWS Lambda'],
    tags: ['SaaS', 'Dashboards', 'Data Engineering'],
    metrics: [
      { value: '6→1', label: 'Data sources' },
      { value: '100%', label: 'Real-time' },
      { value: '−72%', label: 'Report time' },
    ],
    images: [],
    gradient: 'linear-gradient(135deg, #EC4899, #F97316)',
    featured: true,
    order: 2,
  },
  {
    id: '3',
    slug: 'organic-acquisition-engine',
    title: 'Organic Acquisition Engine',
    category: 'Growth Engineering',
    status: 'live',
    hook: 'How we generated $1.4M in revenue from a single acquisition engine',
    description:
      'An e-commerce brand was spending heavily on paid ads with diminishing returns. We built an organic acquisition system that turned their content into a compounding revenue machine.',
    caseStudy: {
      problem:
        'CAC was climbing 15% QoQ on paid channels. The brand had valuable content and expertise but no systematic way to capture organic search demand or nurture prospects through a long-form funnel.',
      solution:
        'Engineered a full content-to-conversion system: programmatic SEO for 2,000+ product permutations, AI-assisted content at scale, automated internal linking, and a smart email nurture sequence triggered by content engagement signals.',
      results:
        '$1.4M in attributable revenue in 8 months. CAC reduced by 42%. Payback period on the investment: 8 months. Organic now accounts for 61% of new customer acquisition.',
    },
    techStack: ['Next.js', 'OpenAI', 'Ahrefs API', 'Resend', 'Shopify', 'Google Search Console'],
    tags: ['SEO', 'Growth', 'Automation', 'Content'],
    metrics: [
      { value: '$1.4M', label: 'Revenue' },
      { value: '−42%', label: 'CAC' },
      { value: '8mo', label: 'Payback' },
    ],
    images: [],
    gradient: 'linear-gradient(135deg, #6EE7B7, #8B5CF6)',
    featured: true,
    order: 3,
  },
  {
    id: '4',
    slug: 'saas-platform-mvp',
    title: 'SaaS Platform MVP',
    category: 'SaaS Development',
    status: 'in-progress',
    hook: 'Building a full-stack SaaS platform from idea to launch-ready in 6 weeks',
    description:
      'A B2B startup needed a fully functional SaaS platform with auth, billing, multi-tenancy, and an AI-powered core feature — all launch-ready within 6 weeks.',
    techStack: ['Next.js 15', 'Supabase', 'Stripe', 'OpenAI', 'Resend', 'Vercel'],
    tags: ['SaaS', 'Full Stack', 'AI Integration'],
    metrics: [
      { value: '6wk', label: 'Time to launch' },
      { value: '100%', label: 'Feature parity' },
      { value: '0→1', label: 'Zero to product' },
    ],
    images: [],
    gradient: 'linear-gradient(135deg, #A78BFA, #34D399)',
    featured: false,
    order: 4,
  },
];

/* ─── Helpers ──────────────────────────────────────────────── */
export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured).sort((a, b) => a.order - b.order);
}

export function getAllProjects(): Project[] {
  return [...PROJECTS].sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === 'All') return getAllProjects();
  return PROJECTS.filter((p) => p.category === category || p.tags.includes(category)).sort(
    (a, b) => a.order - b.order
  );
}

export const PROJECT_CATEGORIES = [
  'All',
  'AI Automation',
  'SaaS Development',
  'Enterprise Dashboard',
  'Growth Engineering',
] as const;
