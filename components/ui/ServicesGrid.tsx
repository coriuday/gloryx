'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Cpu, GitMerge, TrendingUp, BarChart3, Server, Layers, ArrowRight, Sparkles } from 'lucide-react';
import TiltCard from '@/components/motion/TiltCard';
import { ease, viewport } from '@/lib/motion';

const ICON_MAP: Record<string, React.ElementType> = {
  Cpu, GitMerge, TrendingUp, BarChart3, Server, Layers,
};

const CAPABILITIES = [
  {
    id: 'ai-systems',
    icon: 'Cpu',
    title: 'AI Systems',
    description: 'Custom AI pipelines, intelligent agents, and deep integrations built on state-of-the-art models like Gemini and GPT-4.',
    href: '/services#ai-systems',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(167,139,250,0.06))',
    iconColor: 'var(--accent)',
    accentBorder: 'rgba(139,92,246,0.25)',
  },
  {
    id: 'saas-dev',
    icon: 'Layers',
    title: 'SaaS Development',
    description: 'Full-stack web platforms engineered for performance and scale — from design systems to Rust API gateways.',
    href: '/services#saas-dev',
    gradient: 'linear-gradient(135deg, rgba(236,72,153,0.12), rgba(244,114,182,0.05))',
    iconColor: 'var(--rose)',
    accentBorder: 'rgba(236,72,153,0.20)',
  },
  {
    id: 'crm',
    icon: 'GitMerge',
    title: 'CRM Automation',
    description: 'Intelligent lead workflows, WhatsApp automation, email sequences, and CRM integrations that run 24/7.',
    href: '/services#crm',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(167,139,250,0.06))',
    iconColor: 'var(--accent)',
    accentBorder: 'rgba(139,92,246,0.25)',
  },
  {
    id: 'growth',
    icon: 'TrendingUp',
    title: 'Growth Engineering',
    description: 'Data-driven SEO infrastructure, paid acquisition systems, and conversion optimization at every funnel stage.',
    href: '/services#growth',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(110,231,183,0.05))',
    iconColor: 'var(--sage)',
    accentBorder: 'rgba(16,185,129,0.20)',
  },
  {
    id: 'dashboards',
    icon: 'BarChart3',
    title: 'Enterprise Dashboards',
    description: 'Real-time analytics platforms and internal tooling that turn raw data into actionable business intelligence.',
    href: '/services#dashboards',
    gradient: 'linear-gradient(135deg, rgba(236,72,153,0.12), rgba(244,114,182,0.05))',
    iconColor: 'var(--rose)',
    accentBorder: 'rgba(236,72,153,0.20)',
  },
  {
    id: 'infrastructure',
    icon: 'Server',
    title: 'Infrastructure & DevOps',
    description: 'Scalable cloud architectures, CI/CD pipelines, containerized deployments, and API gateway engineering.',
    href: '/services#infrastructure',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(167,139,250,0.06))',
    iconColor: 'var(--accent)',
    accentBorder: 'rgba(139,92,246,0.25)',
  },
];

const ServicesGrid: React.FC = () => {
  return (
    <section
      id="capabilities"
      className="py-32 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--orb-rose) 0%, transparent 65%)',
            top: '10%', right: '-15%',
            filter: 'blur(90px)',
            animation: 'atmosphericFloat 16s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--orb-violet) 0%, transparent 65%)',
            bottom: '5%', left: '-10%',
            filter: 'blur(80px)',
            animation: 'atmosphericFloat 20s ease-in-out infinite reverse',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section header */}
        <motion.div
          className="max-w-2xl mb-20"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="eyebrow-badge mb-6">
            <Sparkles size={11} />
            <span>Our Arsenal</span>
          </div>

          <h2
            className="font-display font-bold text-4xl md:text-5xl leading-tight tracking-tight mb-4"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}
          >
            Six disciplines.{' '}
            <span className="gradient-text">One studio.</span>
          </h2>

          <p
            className="font-sans text-lg leading-relaxed"
            style={{ color: 'var(--text-secondary)', letterSpacing: '-0.01em' }}
          >
            We&apos;ve mastered the six systems every growing business needs — and we deploy
            them as a single, integrated architecture built around your goals.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAPABILITIES.map((cap, i) => {
            const Icon = ICON_MAP[cap.icon];
            return (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
              >
                <Link href={cap.href} className="block h-full" data-cursor="pointer">
                  <TiltCard
                    className="glass-card rounded-3xl h-full cursor-pointer group"
                    intensity={7}
                    scale={1.015}
                  >
                    <div className="p-7 flex flex-col h-full" style={{ minHeight: 240 }}>

                      {/* Icon */}
                      <div className="relative mb-6 w-fit">
                        <motion.div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center"
                          style={{
                            background: cap.gradient,
                            border: `1px solid ${cap.accentBorder}`,
                          }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.25, ease: [0.34, 1.4, 0.64, 1] }}
                        >
                          <Icon size={22} style={{ color: cap.iconColor }} />
                        </motion.div>
                      </div>

                      {/* Title */}
                      <h3
                        className="font-display font-bold text-xl mb-3 group-hover:translate-x-0.5 transition-transform duration-200"
                        style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
                      >
                        {cap.title}
                      </h3>

                      {/* Description */}
                      <p
                        className="font-sans text-sm leading-relaxed flex-1"
                        style={{ color: 'var(--text-secondary)', letterSpacing: '-0.005em' }}
                      >
                        {cap.description}
                      </p>

                      {/* Learn more */}
                      <div
                        className="flex items-center gap-1.5 mt-6 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-250 translate-y-1 group-hover:translate-y-0"
                        style={{ color: cap.iconColor }}
                      >
                        <span>Explore</span>
                        <ArrowRight size={13} />
                      </div>

                      {/* Spotlight overlay */}
                      <div className="card-spotlight" />
                    </div>
                  </TiltCard>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-14"
        >
          <Link href="/services">
            <button className="btn-secondary px-8 py-3.5 text-sm gap-2">
              Explore All Services
              <ArrowRight size={15} />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;