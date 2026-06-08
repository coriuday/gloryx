'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CalendarCheck, Sparkles } from 'lucide-react';
import { ease, dur, viewport } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import AnimatedText from '@/components/motion/AnimatedText';

const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const orb1Y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-24, 24]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [24, -24]);
  const cardY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [12, -12]);

  return (
    <section
      ref={sectionRef}
      className="py-28 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      {/* Atmospheric background layers */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          style={{ y: orb1Y }}
          className="absolute w-[700px] h-[700px] rounded-full"
          aria-hidden="true"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(circle, var(--orb-violet) 0%, transparent 65%)',
              filter: 'blur(80px)',
              position: 'absolute',
              top: '-30%',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
        </motion.div>
        <motion.div
          style={{ y: orb2Y }}
          className="absolute bottom-0 right-0 w-80 h-80"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(circle, var(--orb-rose) 0%, transparent 65%)',
              filter: 'blur(70px)',
            }}
          />
        </motion.div>
        <div
          className="absolute top-10 left-10 w-48 h-48 rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--orb-sage) 0%, transparent 65%)',
            filter: 'blur(60px)',
            animation: 'atmosphericFloat 14s ease-in-out infinite',
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Giant cinematic CTA container */}
        <motion.div
          style={{ y: cardY }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden"
        >
          {/* Inner atmospheric gradient */}
          <div
            className="absolute inset-0 pointer-events-none rounded-[2.5rem]"
            style={{
              background: 'radial-gradient(ellipse 80% 70% at 50% 20%, rgba(139,92,246,0.08) 0%, transparent 70%)',
            }}
          />
          {/* Gradient top border highlight */}
          <div
            className="absolute inset-x-0 top-0 h-0.5 rounded-t-[2.5rem]"
            style={{ background: 'var(--gradient-dreamy)', opacity: 0.5 }}
          />

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={viewport()}
            transition={{ duration: dur.base, ease: ease.spring }}
            className="eyebrow-badge mb-8 mx-auto w-fit"
          >
            <CalendarCheck size={12} />
            <span>Free Strategy Session</span>
          </motion.div>

          {/* Headline */}
          <h2
            className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-6 relative z-10"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}
          >
            <AnimatedText text="Ready to build something" delay={0.05} stagger={0.07} />
            <span style={{ display: 'block', overflow: 'hidden' }}>
              <motion.span
                className="gradient-text font-display font-bold inline-block"
                initial={{ y: '110%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: dur.medium, ease: ease.out, delay: 0.52 }}
              >
                extraordinary?
              </motion.span>
            </span>
          </h2>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport()}
            transition={{ duration: dur.base, ease: ease.out, delay: 0.38 }}
            className="font-sans text-lg leading-relaxed mb-8 max-w-xl mx-auto relative z-10"
            style={{ color: 'var(--text-secondary)', letterSpacing: '-0.01em' }}
          >
            Let’s spend 30 minutes mapping what your business could become
            with the right systems behind it. No pitch. No pressure.
            Just an honest conversation about what’s possible.
          </motion.p>

          {/* Process steps */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport()}
            transition={{ duration: dur.base, ease: ease.out, delay: 0.48 }}
            className="flex items-center justify-center gap-4 sm:gap-6 mb-10 relative z-10 flex-wrap"
          >
            {[
              { step: '01', label: 'We talk' },
              { step: '02', label: 'We map' },
              { step: '03', label: 'We build' },
            ].map(({ step, label }, i) => (
              <React.Fragment key={step}>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport()}
                  transition={{ duration: dur.fast, ease: ease.out, delay: 0.48 + i * 0.12 }}
                  className="flex items-center gap-2"
                >
                  <span
                    className="font-mono text-[10px] font-bold"
                    style={{ color: 'var(--accent)', letterSpacing: '0.05em' }}
                  >
                    {step}
                  </span>
                  <span
                    className="font-sans text-sm font-semibold"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {label}
                  </span>
                </motion.div>
                {i < 2 && (
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={viewport()}
                    transition={{ duration: 0.4, delay: 0.54 + i * 0.12, ease: ease.out }}
                    className="hidden sm:block h-px w-8 origin-left"
                    style={{ background: 'var(--glass-border-2)' }}
                  />
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport()}
            transition={{ duration: dur.base, ease: ease.out, delay: 0.62 }}
            className="flex flex-wrap gap-4 justify-center relative z-10"
          >
            <Link href="/planner">
              <button className="btn-primary shimmer-sweep text-base px-10 py-4 gap-2">
                <CalendarCheck size={17} />
                Start the Conversation
              </button>
            </Link>
            <Link href="/services">
              <button className="btn-secondary text-base px-10 py-4 gap-2">
                View All Services
                <ArrowRight size={15} />
              </button>
            </Link>
          </motion.div>

          {/* Trust strip */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewport()}
            transition={{ duration: dur.medium, delay: 0.8 }}
            className="mt-8 font-sans text-sm relative z-10"
            style={{ color: 'var(--text-muted)' }}
          >
            30-minute call · No pitch · No commitment
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
