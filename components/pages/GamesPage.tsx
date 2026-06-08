'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/motion/PageTransition';
import { ArrowRight, Sparkles, TrendingUp, X, Star, Quote } from 'lucide-react';
import { ease, dur, viewport } from '@/lib/motion';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  imageUrl: string;
  stats: { label: string; value: string }[];
  overview: string;
  techStack: string[];
  outcomes: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  gradient: string;
  accentColor: string;
}

const PROJECTS: Project[] = [
  {
    id: 'growth-engine',
    title: 'Digital Growth Engine',
    subtitle: 'Scaling 5,000+ sales through intelligent PPC automation',
    category: 'Digital Marketing',
    description: 'We redesigned an entire paid acquisition system — from bid strategies to conversion tracking — to achieve scalable, consistent growth with dramatically reduced cost per lead.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    stats: [
      { label: 'Return on Ads',  value: '410% ROI' },
      { label: 'Revenue Scale',  value: '3.5×' },
      { label: 'Lead Cost Drop', value: '−42%' },
    ],
    overview: 'The client was overspending on broad keywords with poor targeting segmentation. We rebuilt the entire acquisition funnel — from keyword architecture to landing page optimisation — and deployed a custom real-time bid management system that continuously adjusts spend allocation.',
    techStack: ['Google Ads API', 'Custom Bid Manager', 'Next.js Analytics', 'Data Studio Dashboards'],
    outcomes: ['+$1.4M Generated Revenue', '5,800+ Verified Customer Signups', '−42% Reduction in Cost Per Acquisition'],
    testimonial: {
      quote: 'BinaryScouts came in, stripped down our ad account, rewrote our conversion flows, and put the scale on auto. Absolute game-changers.',
      author: 'Vikram Vance',
      role: 'VP Marketing, Nexus Corp',
    },
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.16), rgba(236,72,153,0.08))',
    accentColor: 'var(--accent)',
  },
  {
    id: 'crm-pipeline',
    title: 'Intelligent CRM Pipeline',
    subtitle: 'Automating 25,000 leads with zero manual intervention',
    category: 'CRM Automation',
    description: 'We replaced a chaotic manual lead management process with a fully automated, AI-assisted CRM pipeline that connects inbound leads to the right sales agent in under 2 minutes.',
    imageUrl: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=1200&auto=format&fit=crop',
    stats: [
      { label: 'Pipeline Errors', value: '−95%' },
      { label: 'Response Time',   value: '< 2 min' },
      { label: 'Conversion Lift', value: '+34%' },
    ],
    overview: 'The client had leads arriving from 6 disconnected social APIs, each requiring manual entry and follow-up. We designed a unified event-driven architecture with PostgreSQL as the central hub, WhatsApp API for outreach, and intelligent routing logic to prioritise high-intent prospects.',
    techStack: ['Node.js API Bridges', 'WhatsApp Business API', 'PostgreSQL Hub', 'Cron Webhooks', 'Redis Queues'],
    outcomes: ['25,000+ Automated Leads Managed', '95% Reduction in Database Sync Errors', 'Average Response < 120 Seconds'],
    testimonial: {
      quote: 'Our sales team used to spend hours sorting leads. Now the automation feeds them high-intent calls directly. The pipeline runs itself.',
      author: 'Clara Marston',
      role: 'Operations Director, Frontier Logistics',
    },
    gradient: 'linear-gradient(135deg, rgba(236,72,153,0.14), rgba(249,115,22,0.06))',
    accentColor: 'var(--rose)',
  },
  {
    id: 'seo-domination',
    title: 'Organic Search Domination',
    subtitle: 'Recovering and scaling from a 50% traffic drop',
    category: 'SEO Engineering',
    description: 'After an algorithmic update wiped out 50% of organic visibility, we performed a deep technical audit, rebuilt the site architecture, and executed a structured content strategy to reclaim and surpass original rankings.',
    imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop',
    stats: [
      { label: 'Organic Traffic', value: '+400%' },
      { label: 'Domain Authority', value: '+28 pts' },
      { label: 'Lead Value',       value: '+$340K' },
    ],
    overview: 'We audited the site\'s technical infrastructure, identified crawlability issues in the SSR setup, and rebuilt the content hierarchy around high-intent commercial terms. A structured syndication strategy accelerated authority growth across 45 target keywords.',
    techStack: ['Next.js SSR Tuning', 'Schema Markup Generator', 'Content Pipeline', 'Crawler Diagnostics', 'Google Search Console API'],
    outcomes: ['Top #3 Ranking on 45 Competitive Terms', 'Organic Traffic +400% in 4 months', 'Saving $30K/month in equivalent PPC spend'],
    testimonial: {
      quote: 'They diagnosed issues three previous SEO agencies missed. Within four months, our rankings skyrocketed. They know Google inside out.',
      author: 'Therese Phelps',
      role: 'CEO, CaseFinder SaaS',
    },
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.14), rgba(139,92,246,0.06))',
    accentColor: 'var(--sage)',
  },
  {
    id: 'brand-motion',
    title: 'Premium Brand Identity & Motion',
    subtitle: 'A cinematic visual identity that drove viral growth',
    category: 'Design & Motion',
    description: 'We rebuilt a generic corporate visual identity into a premium, editorial brand system with a flagship cinematic brand film that generated 4.2M views across platforms.',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    stats: [
      { label: 'Video Views',    value: '4.2M' },
      { label: 'CTR Growth',     value: '+85%' },
      { label: 'Brand Retention',value: '+70%' },
    ],
    overview: 'The brand lacked visual distinction in a competitive space. We designed a complete system — typography, color palette, motion language, and illustration style — and produced a hero brand film using Cinema 4D and After Effects to bring the new identity to life.',
    techStack: ['After Effects + Cinema 4D', 'Figma Design Systems', 'CSS Animation Library', 'Framer Motion', 'Lottie Animations'],
    outcomes: ['4.2M Cross-platform Views', '+85% Interactive CTA Clickthrough Rate', 'Brand Watch Duration Increased 70%'],
    testimonial: {
      quote: 'The video they produced went viral on Twitter. Our brand identity looks extremely premium now. They delivered exactly what we envisioned.',
      author: 'Mona Sax',
      role: 'Founder, Noir Studios',
    },
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.14), rgba(236,72,153,0.08))',
    accentColor: 'var(--accent)',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  'Digital Marketing': 'var(--accent)',
  'CRM Automation':    'var(--rose)',
  'SEO Engineering':   'var(--sage)',
  'Design & Motion':   'var(--accent)',
};

export default function GamesPage() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <PageTransition>
      <Navbar />

      <main className="flex-grow pt-36 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div
            className="mb-16 max-w-2xl"
            initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="eyebrow-badge mb-6">
              <TrendingUp size={11} />
              <span>Case Studies</span>
            </div>
            <h1
              className="font-display font-bold text-5xl md:text-7xl tracking-tight mb-5"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.05em' }}
            >
              Work that{' '}
              <span className="gradient-text">delivers.</span>
            </h1>
            <p
              className="font-sans text-xl leading-relaxed"
              style={{ color: 'var(--text-secondary)', letterSpacing: '-0.01em' }}
            >
              Real systems built for real businesses. Each engagement is precision-engineered to produce measurable outcomes.
            </p>
          </motion.div>

          {/* Featured project */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-[2rem] overflow-hidden mb-10 cursor-pointer group"
            onClick={() => setActiveProject(PROJECTS[0])}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[320px]">
              {/* Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={PROJECTS[0].imageUrl}
                  alt={PROJECTS[0].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: 'saturate(0.85)' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to right, transparent, var(--bg-glass))' }}
                />
                {/* Category badge */}
                <div className="absolute top-5 left-5">
                  <span
                    className="px-3 py-1 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      background: 'var(--glass-2)',
                      border: '1px solid var(--glass-border-2)',
                      color: 'var(--accent)',
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    {PROJECTS[0].category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: 'var(--text-muted)' }}>
                    Featured Case Study
                  </span>
                  <h2
                    className="font-display font-bold text-3xl md:text-4xl mb-3 leading-tight"
                    style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}
                  >
                    {PROJECTS[0].title}
                  </h2>
                  <p className="font-sans text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                    {PROJECTS[0].description}
                  </p>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {PROJECTS[0].stats.map((stat) => (
                      <div key={stat.label}>
                        <p
                          className="font-display font-bold text-xl mb-0.5"
                          style={{
                            background: 'var(--gradient-primary)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-0.04em',
                          }}
                        >
                          {stat.value}
                        </p>
                        <p className="font-sans text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2" style={{ color: 'var(--accent)' }}>
                  <span className="font-sans font-semibold text-sm">Read Full Case Study</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.slice(1).map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.65, delay: 0.25 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card rounded-3xl overflow-hidden cursor-pointer group"
                onClick={() => setActiveProject(project)}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: 'saturate(0.8)' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, var(--bg-glass) 0%, transparent 60%)' }}
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-2.5 py-1 rounded-full font-sans text-[9px] font-bold uppercase tracking-wider"
                      style={{
                        background: 'var(--glass-2)',
                        border: '1px solid var(--glass-border-2)',
                        color: CATEGORY_COLORS[project.category] || 'var(--accent)',
                        backdropFilter: 'blur(12px)',
                      }}
                    >
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className="font-display font-bold text-lg mb-2 leading-tight"
                    style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
                  >
                    {project.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
                    {project.subtitle}
                  </p>

                  {/* Mini stats */}
                  <div
                    className="grid grid-cols-3 gap-3 pt-4"
                    style={{ borderTop: '1px solid var(--glass-border-1)' }}
                  >
                    {project.stats.map((stat) => (
                      <div key={stat.label}>
                        <p
                          className="font-display font-bold text-base mb-0.5"
                          style={{ color: project.accentColor, letterSpacing: '-0.03em' }}
                        >
                          {stat.value}
                        </p>
                        <p className="font-sans text-[9px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div
                    className="flex items-center gap-1.5 mt-5 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-250 translate-y-1 group-hover:translate-y-0"
                    style={{ color: 'var(--accent)' }}
                  >
                    <span>View Case Study</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Case Study Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0"
              style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(12px)' }}
              onClick={() => setActiveProject(null)}
            />

            {/* Modal */}
            <motion.div
              className="relative glass-card rounded-[2rem] w-full max-w-2xl max-h-[88vh] overflow-y-auto"
              initial={{ scale: 0.92, opacity: 0, filter: 'blur(8px)', y: 24 }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Gradient top bar */}
              <div
                className="h-1 w-full rounded-t-[2rem]"
                style={{ background: activeProject.gradient.replace('rgba', 'rgb').replace('0.16', '1').replace('0.14', '1') }}
              />
              <div className="h-1 rounded-t-[2rem]" style={{ background: 'var(--gradient-primary)' }} />

              {/* Close button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-xl flex items-center justify-center glass-chip transition-all duration-200"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
              >
                <X size={16} />
              </button>

              <div className="p-8 md:p-10">
                {/* Header */}
                <div className="mb-6">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-wider mb-2 block" style={{ color: CATEGORY_COLORS[activeProject.category] || 'var(--accent)' }}>
                    {activeProject.category}
                  </span>
                  <h2
                    className="font-display font-bold text-2xl md:text-3xl mb-2"
                    style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}
                  >
                    {activeProject.title}
                  </h2>
                  <p className="font-sans text-sm" style={{ color: 'var(--text-muted)' }}>
                    {activeProject.subtitle}
                  </p>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {activeProject.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="glass-chip rounded-2xl p-4 text-center"
                    >
                      <p
                        className="font-display font-bold text-xl mb-1"
                        style={{
                          background: 'var(--gradient-primary)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          letterSpacing: '-0.04em',
                        }}
                      >
                        {stat.value}
                      </p>
                      <p className="font-sans text-[9px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Overview */}
                <div className="mb-5">
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                    Project Overview
                  </h4>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {activeProject.overview}
                  </p>
                </div>

                {/* Tech stack + Outcomes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                  <div>
                    <h4 className="font-sans text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                      Tech Stack
                    </h4>
                    <ul className="space-y-1.5">
                      {activeProject.techStack.map((tech) => (
                        <li key={tech} className="flex items-center gap-2 font-sans text-sm" style={{ color: 'var(--text-secondary)' }}>
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: activeProject.accentColor }} />
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                      Key Outcomes
                    </h4>
                    <ul className="space-y-1.5">
                      {activeProject.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-center gap-2 font-sans text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--gradient-primary)' }} />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Testimonial */}
                <div
                  className="rounded-2xl p-5 relative overflow-hidden"
                  style={{
                    background: 'var(--accent-light)',
                    border: '1px solid var(--glass-border-2)',
                  }}
                >
                  <Quote size={20} className="absolute top-4 right-4 opacity-10" style={{ color: 'var(--accent)' }} />
                  <p className="font-sans text-sm leading-relaxed italic mb-3" style={{ color: 'var(--text-secondary)' }}>
                    &ldquo;{activeProject.testimonial.quote}&rdquo;
                  </p>
                  <p className="font-sans text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                    {activeProject.testimonial.author}
                  </p>
                  <p className="font-sans text-[10px]" style={{ color: 'var(--text-muted)' }}>
                    {activeProject.testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </PageTransition>
  );
}
