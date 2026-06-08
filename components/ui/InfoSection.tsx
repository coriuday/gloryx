'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap, ShieldCheck, Globe, CheckCircle, Sparkles } from 'lucide-react';
import { ease, dur, viewport } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import AnimatedText from '@/components/motion/AnimatedText';

const PILLARS = [
  {
    icon: Zap,
    label: 'AI-Powered',
    desc: 'Intelligent automation at the core of every system we build.',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.14), rgba(167,139,250,0.05))',
    iconColor: 'var(--accent)',
    border: 'rgba(139,92,246,0.22)',
  },
  {
    icon: ShieldCheck,
    label: 'Security-First',
    desc: 'Enterprise-grade security standards in architecture and deployment.',
    gradient: 'linear-gradient(135deg, rgba(236,72,153,0.12), rgba(244,114,182,0.05))',
    iconColor: 'var(--rose)',
    border: 'rgba(236,72,153,0.20)',
  },
  {
    icon: Globe,
    label: 'Built to Scale',
    desc: 'Designed for growth — from startup to enterprise-level traffic.',
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(110,231,183,0.05))',
    iconColor: 'var(--sage)',
    border: 'rgba(16,185,129,0.20)',
  },
  {
    icon: CheckCircle,
    label: 'ROI-Focused',
    desc: 'Every decision tied back to measurable business outcomes.',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.14), rgba(236,72,153,0.06))',
    iconColor: 'var(--accent)',
    border: 'rgba(139,92,246,0.22)',
  },
];

const InfoSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const leftY  = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [24, -24]);
  const rightY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-16, 16]);

  return (
    <section
      ref={sectionRef}
      id="studio"
      className="py-28 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Ambient orb */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--orb-violet) 0%, transparent 65%)',
            bottom: '-12%', left: '-8%',
            filter: 'blur(90px)',
            animation: 'atmosphericFloat 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--orb-rose) 0%, transparent 65%)',
            top: '10%', right: '-10%',
            filter: 'blur(80px)',
            animation: 'atmosphericFloat 16s ease-in-out infinite reverse',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Pillar cards ────────────────────────── */}
          <motion.div style={{ y: leftY }} className="order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport('-40px')}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                  className="glass-card rounded-3xl p-6 group"
                  whileHover={reduced ? {} : { y: -4, transition: { duration: 0.3, ease: ease.out } }}
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: p.gradient, border: `1px solid ${p.border}` }}
                  >
                    <p.icon size={17} style={{ color: p.iconColor }} />
                  </div>

                  <h4
                    className="font-display font-bold text-base mb-1.5"
                    style={{ color: 'var(--text-primary)', letterSpacing: '-0.025em' }}
                  >
                    {p.label}
                  </h4>
                  <p
                    className="font-sans text-xs leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {p.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Large stat card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport('-40px')}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.36 }}
              className="mt-4 glass-card rounded-3xl p-6 flex items-center gap-5"
            >
              {/* Gradient stat badge */}
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                style={{
                  background: 'var(--gradient-primary)',
                  boxShadow: 'var(--shadow-brand)',
                }}
              >
                <span className="font-display font-bold text-2xl text-white relative z-10" style={{ letterSpacing: '-0.04em' }}>
                  98%
                </span>
                {/* Inner shimmer */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)',
                  }}
                />
              </div>
              <div>
                <p
                  className="font-display font-bold text-lg mb-1"
                  style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
                >
                  Client Retention Rate
                </p>
                <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Not because we lock clients in — because the systems we build keep earning their place.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Copy ───────────────────────────────── */}
          <motion.div style={{ y: rightY }} className="order-1 lg:order-2">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewport()}
              transition={{ duration: dur.base, ease: ease.spring }}
              className="eyebrow-badge mb-6"
            >
              <Sparkles size={11} />
              <span>Who We Are</span>
            </motion.div>

            {/* Headline */}
            <h2
              className="font-display font-bold text-4xl md:text-5xl leading-tight tracking-tight mb-6"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}
            >
              <AnimatedText text="We build infrastructure for" delay={0.05} stagger={0.055} />
              <span style={{ display: 'block', overflow: 'hidden' }}>
                <motion.span
                  className="gradient-text font-display font-bold inline-block"
                  initial={{ y: '110%', opacity: 0 }}
                  whileInView={{ y: '0%', opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: dur.medium, ease: ease.out, delay: 0.52 }}
                >
                  tomorrow&apos;s businesses.
                </motion.span>
              </span>
            </h2>

            {/* Body */}
            {[
              'We\'re a focused team of engineers and strategists who believe that great software should feel inevitable — like it was always meant to exist. No bloat. No guesswork. Just systems built with precision and purpose.',
              'We operate at the intersection of AI intelligence, precise engineering, and growth strategy. When you bring us a problem, we don\'t just solve it — we architect a system that keeps delivering long after we\'re done.',
            ].map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport()}
                transition={{ duration: dur.base, ease: ease.out, delay: 0.4 + i * 0.12 }}
                className={`font-sans ${i === 0 ? 'text-lg' : 'text-base'} leading-relaxed ${i === 0 ? 'mb-5' : 'mb-10'}`}
                style={{ color: 'var(--text-secondary)', letterSpacing: '-0.01em' }}
              >
                {para}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport()}
              transition={{ duration: dur.base, ease: ease.out, delay: 0.65 }}
            >
              <Link href="/about">
                <button className="btn-secondary px-7 py-3.5 text-sm gap-2">
                  Learn About Our Studio
                  <ArrowRight size={15} />
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;